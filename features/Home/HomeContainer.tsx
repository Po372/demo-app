"use client";

import "../Home/CSS/Home.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/features/Home/Loading";
import Home from "@/features/Home/Home";

export default function HomeContainer() {
  const [inputFailureText, setInputFailureText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleScoringClick() {
    try {
      if (!inputFailureText.trim()) {
        setError("失敗の内容を入力してください。");
        return;
      }

      setLoading(true);

      // ローカルストレージからユーザー名を取得
      const userName = localStorage.getItem("userName");

      // /api/scoringエンドポイントにPOSTリクエストを送信 (LLMに採点をリクエスト)
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName || null,
          failureText: inputFailureText,
        }),
      });

      // HTTPレスポンスのチェック
      if (!response.ok) {
        const responseContent = await response.json();
        console.error("通信エラー: ", responseContent);
        setError("通信エラー: " + responseContent.error);
        setLoading(false);
        return;
      }

      // レスポンスの内容が正しいかチェック
      const responseContent = await response.json();
      if (!responseContent.resultId || typeof responseContent.resultId !== "string") {
        console.error("結果IDが取得できませんでした。");
        setError("結果IDが取得できませんでした。");
        setLoading(false);
        return;
      }

      // 受け取った結果IDを使用して、結果ページにリダイレクト
      router.push(`/result/${responseContent.resultId}`);
    } catch (err) {
      console.error("エラーが発生しました: ", err);
      setError("エラーが発生しました: " + err);
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Home
            error={error}
            inputFailureText={inputFailureText}
            setInputFailureText={setInputFailureText}
            onScoringClick={handleScoringClick}
          />
        </>
      )}
    </>
  );
}
