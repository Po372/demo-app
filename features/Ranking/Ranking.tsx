"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [rankingResults, setRankingResults] = useState<{
    top: { score: number; userName: string; failureText: string };
    bottom: { score: number; userName: string; failureText: string };
  }>();
  useEffect(() => {
    fetch("/api/ranking")
      .then(async (rawResponse) => {
        if (!rawResponse.ok) {
          throw new Error("ネットワークエラー: " + rawResponse.statusText);
        }
        const response = await rawResponse.json();
        setRankingResults(response.rankingResults);
        return;
      })
      .catch((error) => {
        console.error("ランキングデータの取得に失敗しました", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 text-xl mb-8 bg-white">
      {/* ランキングボタン */}
      <div className="flex items-center px-8 py-2 justify-between w-full bg-cyan-600 rounded-b-3xl font-bold text-white">
        <Link href="/" className="p-2 rounded-full transition hover:bg-cyan-700">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </Link>
        <div>ランキング</div>
      </div>
      {/* レア失敗ランキング */}
      <div className="w-9/10 border-2 border-lime-600 rounded-2xl px-4 py-12 md:w-3/10">
        <div className="text-center font-bold text-2xl">レア失敗ランキング</div>
        <div className="mt-12">1位</div>
        <div className="flex items-center justify-between">
          <div>{rankingResults?.top.userName}</div>
          <div>SSS</div>
        </div>
        <div className="mt-12">{rankingResults?.top.failureText}</div>
      </div>
      {/* 普遍失敗ランキング */}
      <div className="w-9/10 border-2 border-cyan-600 rounded-2xl px-4 py-12 md:w-3/10">
        <div className="text-center font-bold text-2xl">普遍失敗ランキング</div>
        <div className="mt-12">1位</div>
        <div className="flex items-center justify-between">
          <div>{rankingResults?.bottom.userName}</div>
          <div>SSS</div>
        </div>
        <div className="mt-12">{rankingResults?.bottom.failureText}</div>
      </div>
    </div>
  );
}
