"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [rankingResults, setRankingResults] = useState<{
    top: { score: number; userName: string; failureText: string };
    bottom: { score: number; userName: string; failureText: string };
  }>();

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        // 最高スコア（1位）を取得
        const { data: topData, error: topError } = await supabase
          .from("results")
          .select("score, user_name, failure_text")
          .order("score", { ascending: false })
          .limit(1);

        // 最低スコア（最下位）を取得
        const { data: bottomData, error: bottomError } = await supabase
          .from("results")
          .select("score, user_name, failure_text")
          .order("score", { ascending: true })
          .limit(1);

        if (topError || bottomError) {
          console.error("データの読み込みに失敗しました: ", topError , bottomError);
          return;
        }
        if (!topData || !bottomData || topData.length === 0 || bottomData.length === 0) {
          console.error("ランキングデータが見つかりません。");
          return;
        }

        // ランキング結果を設定
        setRankingResults({
          top: {
            score: topData[0].score,
            userName: topData[0].user_name,
            failureText: topData[0].failure_text,
          },
          bottom: {
            score: bottomData[0].score,
            userName: bottomData[0].user_name,
            failureText: bottomData[0].failure_text,
          },
        });
      } catch (error) {
        console.error("ランキングデータの取得中にエラー: ", error);
      }
    };

    fetchRankingData();
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
