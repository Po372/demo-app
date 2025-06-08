import { checkRateLimit } from "@/logics/rateLimiter";
import { supabase } from "@/utils/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// AI応答の型定義
interface AIResponse {
  score: number;
  comment: string;
}

// AI応答の型ガード関数
function isValidAIResponse(obj: unknown): obj is AIResponse {
  if (!obj || typeof obj !== "object" || obj === null) {
    return false;
  }
  
  const candidate = obj as Record<string, unknown>;
  
  return (
    typeof candidate.score === "number" &&
    candidate.score >= -100 &&
    candidate.score <= 100 &&
    typeof candidate.comment === "string" &&
    candidate.comment.length > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    // "x-forwarded-for" ヘッダーを使用してクライアントのIPアドレスを取得
    const forwardedFor = request.headers.get("x-forwarded-for");
    const rawIp = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
    const ip = rawIp ?? "IP not found";

    // レート制限チェックの実行
    const { success, limit, remaining } = await checkRateLimit(supabase, ip);

    // 制限を超えている場合はエラーを返す
    if (!success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
        },
      });
    }

    // リクエストボディをJSONとして解析
    const { userName, failureText } = await request.json();

    const anthropic = new Anthropic();

    const assessmentPrompt = `
    Score the following failure text based on its speciality or universality.

      Failure Text:
      <failureText>${failureText}</failureText>

    Respond with ONLY a JSON object, using the format below:
      <format>
    {
      "score": <number>, // A score between -100 and 100 in decimal, where 100 is the most rare and special, and -100 is the most common and universal.
        "comment": <string> // A brief and humorous comment IN JAPANESE about the speciality or universality of the text. (length: about 20 catracters)
    }
    </format>
    `;

    // AIにメッセージを送信
    const rawResponse = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1000,
      temperature: 1,
      system: `
      You are an AI that scores a user's failure text based on its speciality or universality.
        `,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: assessmentPrompt,
            },
          ],
        },
      ],
    });

    // AIの応答が空でないことを確認
    if (rawResponse.content.length === 0 || rawResponse.content[0].type !== "text") {
      return new NextResponse(JSON.stringify({ error: "AIからの応答が不正です" }), {
        status: 500,
      });
    }

    // AIの応答テキストのJSON形式を検証
    const parsedResponse = JSON.parse(rawResponse.content[0].text);
    if (!isValidAIResponse(parsedResponse)) {
      return new NextResponse(JSON.stringify({ error: "AIからの応答が不正なフォーマットです" }), {
        status: 500,
      });
    }

    // データをSupabaseに挿入
    const { data, error } = await supabase
      .from("results")
      .insert([
        {
          user_name: userName === "" ? null : userName,
          failure_text: failureText,
          score: parsedResponse.score,
          comment: parsedResponse.comment,
        },
      ])
      .select("id");

    // Supabaseへの挿入に失敗した場合のエラーハンドリング
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // 挿入されたResultのResultId
    const id = data[0].id;

    return new NextResponse(JSON.stringify({ resultId: id }), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    // AIの出力したJSONの構文が不正な場合
    if (error instanceof SyntaxError) {
      return new NextResponse(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 500,
      });
    }

    // その他のエラー
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
