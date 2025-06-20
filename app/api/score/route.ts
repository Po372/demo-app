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
    You are an expert at rating "yarakashi" (mistakes or blunders in Japanese culture).
    
    FIRST, validate if the input text describes an actual failure/mistake:
    - It must describe a specific action or event that could be considered a mistake
    - Single nouns, random characters, or meaningless text are NOT valid inputs
    - Marketing content, spam, or offensive content with no mistake context are NOT valid
    
    If the input is NOT a valid failure description, respond with ONLY this JSON:
    {
      "error": <string>  // A brief error message in Japanese explaining why the input is invalid
    }
    
    ONLY if the input IS valid, rate it on a scale from -100 to 100:
    Rate the following incident on a scale from -100 to 100:
    - 100: Extremely rare mistake (historic)
    - 75: Very rare mistake (newsworthy)
    - 50: Rare mistake (uncommon but happens)
    - 25: Somewhat unusual mistake
    - 0: Average mistake
    - -25: Somewhat common mistake
    - -50: Common mistake (many experience)
    - -75: Very common mistake (most experience)
    - -100: Universal mistake (nearly everyone experiences)
    
    Consider:
    1. Frequency
    2. Percentage of people who experience it
    3. Uniqueness of circumstances
    4. Social recognition
    
    Examples:
    - 「スーパーでお釣りをもらい忘れた」→約-80 (very common)
    - 「会議中に寝落ちした」→約-50 (common)
    - 「重要な会議の日付を1日間違えた」→約0 (average)
    - 「会社のサーバーを誤って全削除した」→約50 (rare)
    - 「国際放送で生放送中に不適切な発言をした」→約80 (very rare)
  
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

    const parsedResponse = JSON.parse(rawResponse.content[0].text);

    // AIが不正な入力を報告した場合のエラーハンドリング
    if (parsedResponse.error) {
      return new NextResponse(JSON.stringify({ error: parsedResponse.error }), {
        status: 500,
      });
    }

    // AIの応答テキストのJSON形式を検証
    if (!isValidAIResponse(parsedResponse)) {
      console.error("AIからの応答が不正なフォーマットです", parsedResponse);
      return new NextResponse(JSON.stringify({ error: "AIの応答形式に問題が発生しました。しばらくしてから再度お試しください。" }), {
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
      console.error("Supabaseへの挿入エラー: ", error?.message, "詳細:", error, "入力値:", {
        userName,
        failureText,
        score: parsedResponse.score,
        comment: parsedResponse.comment,
      });
      return new NextResponse(JSON.stringify({ error: "データの保存中に問題が発生しました。しばらく時間をおいて再度お試しください。" }), {
        status: 500,
      });
    }

    // 挿入されたResultのResultId
    const id = data[0].id;

    return new NextResponse(JSON.stringify({ resultId: id }), { status: 200 });
  } catch (error) {
    // AIの出力したJSONの構文が不正な場合
    if (error instanceof SyntaxError) {
      console.error("\n\nAI応答のJSONパースエラー: ", error, "\n\nリクエストボディ:", request.body);
      return new NextResponse(JSON.stringify({ error: "AIからの応答データ形式に問題があります。" }), {
        status: 500,
      });
    }

    // その他のエラー
    console.error("サーバー内部エラー: ", error, "リクエスト情報:", {
      headers: Object.fromEntries(request.headers.entries()),
      method: request.method,
      url: request.url,
    });
    return new NextResponse(JSON.stringify({ error: "サーバー内部で予期しないエラーが発生しました。時間をおいて再度お試しください。" }), {
      status: 500,
    });
  }
}
