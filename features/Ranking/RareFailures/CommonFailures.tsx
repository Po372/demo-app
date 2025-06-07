"use client";

import FailureCard from "@/features/Ranking/RareFailures/FailureCard";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CommonFailures() {
  const [rankingResults, setRankingResults] = useState<
    {
      score: number;
      userName: string;
      failureText: string;
      comment: string;
      createdAt: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchRankingDatas = async () => {
      try {
        // ランキングデータ(下位10)をSupabaseから取得
        const { data, error } = await supabase
          .from("results")
          .select("score, user_name, failure_text, comment, created_at")
          .order("score", { ascending: true })
          .limit(10);

        // エラーハンドリング
        if (error) {
          throw new Error("ランキングデータの取得に失敗: " + error.message);
        }
        if (!data || data.length === 0) {
          throw new Error("ランキングデータが見つかりません。");
        }

        // ランキング結果を表示
        setRankingResults(
          data.map((item) => ({
            score: item.score,
            userName: item.user_name,
            failureText: item.failure_text,
            comment: item.comment,
            createdAt: item.created_at,
          }))
        );
      } catch (error) {
        console.error("ランキングデータの取得中にエラー:", error);
      }
    };
    fetchRankingDatas();
  }, []);

  return (
    <div className="bg-cyan-600 min-h-screen py-16 px-4 md:px-24 outline-8 -outline-offset-8 outline-cyan-200/70 md:outline-16 md:-outline-offset-16">
      <div>
        <Link href="/ranking" className="text-white text-lg hover:underline">
          ランキング一覧へ戻る
        </Link>
      </div>
      <div className="text-4xl font-bold text-white flex items-center gap-4 mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#8ae1f3"
          className="w-16 h-16"
        >
          <path d="M200-160v-80h560v80H200Zm0-140-51-321q-2 0-4.5.5t-4.5.5q-25 0-42.5-17.5T80-680q0-25 17.5-42.5T140-740q25 0 42.5 17.5T200-680q0 7-1.5 13t-3.5 11l125 56 125-171q-11-8-18-21t-7-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820q0 15-7 28t-18 21l125 171 125-56q-2-5-3.5-11t-1.5-13q0-25 17.5-42.5T820-740q25 0 42.5 17.5T880-680q0 25-17.5 42.5T820-620q-2 0-4.5-.5t-4.5-.5l-51 321H200Zm68-80h424l26-167-105 46-133-183-133 183-105-46 26 167Zm212 0Z" />
        </svg>
        <div>普遍やらかしランキング</div>
      </div>
      {rankingResults.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-16 lg:grid-cols-2 lg:gap-12">
          {rankingResults.map((result, index) => (
            <FailureCard
              order={index + 1}
              score={result.score}
              userName={result.userName}
              comment={result.comment}
              failureText={result.failureText}
              createdAt={result.createdAt}
            />
          ))}
        </div>
      ) : (
        <p className="text-white">読み込み中</p>
      )}
    </div>
  );
}
