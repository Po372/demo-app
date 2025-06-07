"use client";

import { scoreToRank } from "@/logics/scoreToRank";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [rankingResults, setRankingResults] = useState<{
    top: { score: number; userName: string; failureText: string };
    bottom: { score: number; userName: string; failureText: string };
  }>({
    top: { score: 0, userName: "", failureText: "" },
    bottom: { score: 0, userName: "", failureText: "" },
  });

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        // 最高スコア（1位）をSupabaseから取得
        const { data: topData, error: topError } = await supabase
          .from("results")
          .select("score, user_name, failure_text")
          .order("score", { ascending: false })
          .limit(1);

        // 最低スコア（最下位）をSupabaseから取得
        const { data: bottomData, error: bottomError } = await supabase
          .from("results")
          .select("score, user_name, failure_text")
          .order("score", { ascending: true })
          .limit(1);

        if (topError || bottomError) {
          console.error("データの読み込みに失敗しました: ", topError, bottomError);
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
    <div className="flex flex-col items-center gap-8 mb-8 bg-white min-h-screen">
      {/* ランキングヘッダー */}
      <div className="flex items-center px-8 py-4 justify-between w-full bg-cyan-600 rounded-b-3xl font-bold text-white shadow-lg">
        <Link href="/" className="p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </Link>
        <div className="flex items-center gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#f5e76b"
            className="w-10 h-10"
          >
            <path d="M480-160q75 0 127.5-52.5T660-340q0-75-52.5-127.5T480-520q-75 0-127.5 52.5T300-340q0 75 52.5 127.5T480-160ZM363-572q20-11 42.5-17.5T451-598L350-800H250l113 228Zm234 0 114-228H610l-85 170 19 38q14 4 27 8.5t26 11.5ZM256-208q-17-29-26.5-62.5T220-340q0-36 9.5-69.5T256-472q-42 14-69 49.5T160-340q0 47 27 82.5t69 49.5Zm448 0q42-14 69-49.5t27-82.5q0-47-27-82.5T704-472q17 29 26.5 62.5T740-340q0 36-9.5 69.5T704-208ZM480-80q-40 0-76.5-11.5T336-123q-9 2-18 2.5t-19 .5q-91 0-155-64T80-339q0-87 58-149t143-69L120-880h280l80 160 80-160h280L680-559q85 8 142.5 70T880-340q0 92-64 156t-156 64q-9 0-18.5-.5T623-123q-31 20-67 31.5T480-80Zm0-260ZM363-572 250-800l113 228Zm234 0 114-228-114 228ZM406-230l28-91-74-53h91l29-96 29 96h91l-74 53 28 91-74-56-74 56Z" />
          </svg>
          <span className="text-2xl">ランキング</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#f5e76b"
            className="w-10 h-10"
          >
            <path d="M480-160q75 0 127.5-52.5T660-340q0-75-52.5-127.5T480-520q-75 0-127.5 52.5T300-340q0 75 52.5 127.5T480-160ZM363-572q20-11 42.5-17.5T451-598L350-800H250l113 228Zm234 0 114-228H610l-85 170 19 38q14 4 27 8.5t26 11.5ZM256-208q-17-29-26.5-62.5T220-340q0-36 9.5-69.5T256-472q-42 14-69 49.5T160-340q0 47 27 82.5t69 49.5Zm448 0q42-14 69-49.5t27-82.5q0-47-27-82.5T704-472q17 29 26.5 62.5T740-340q0 36-9.5 69.5T704-208ZM480-80q-40 0-76.5-11.5T336-123q-9 2-18 2.5t-19 .5q-91 0-155-64T80-339q0-87 58-149t143-69L120-880h280l80 160 80-160h280L680-559q85 8 142.5 70T880-340q0 92-64 156t-156 64q-9 0-18.5-.5T623-123q-31 20-67 31.5T480-80Zm0-260ZM363-572 250-800l113 228Zm234 0 114-228-114 228ZM406-230l28-91-74-53h91l29-96 29 96h91l-74 53 28 91-74-56-74 56Z" />
          </svg>
        </div>
        <div className="w-12"></div>
      </div>
      {/* タイトルとサブテキスト */}
      <div className="text-center px-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">失敗ランキング</h1>
        <p className="text-gray-600 text-lg">みんなの失敗から学ぼう</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 px-4 md:px-8">
        {/* レア失敗ランキング */}
        <div className="">
          <div className="border-2 border-lime-600 rounded-2xl px-6 py-8 bg-lime-200">
            <div className="text-center font-bold text-2xl text-lime-900 mb-6 flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#35530e"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              レア失敗ランキング
            </div>
            <div className="bg-white px-8 py-8 rounded-2xl border-2 border-lime-600 mt-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-lg font-bold shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#eee"
                    >
                      <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                    </svg>
                    <div>1位</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">レアスコア</div>
              </div>
              <div className="flex items-end justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-lime-500 border-2 border-lime-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {(rankingResults.top.userName || "匿名").charAt(0)}
                  </div>
                  <div className="font-semibold text-gray-800 text-xl">{rankingResults.top.userName || "匿名"}</div>
                </div>
                <div className="text-4xl font-bold text-lime-600 flex items-center gap-2">
                  {scoreToRank(rankingResults.top.score)}
                  <span className="text-sm text-gray-500 font-normal">ランク</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-lime-500 pl-8">
                <div className="text-gray-700 leading-relaxed text-xl">{rankingResults.top.failureText}</div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div>スコア: {rankingResults.top.score}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Link
                href="/ranking/rare-failures"
                className="text-lime-900 font-semibold py-2 px-4 rounded-lg hover:bg-black/10 transition"
              >
                さらに見る →
              </Link>
            </div>
          </div>
        </div>

        {/* 普遍失敗ランキング */}
        <div className="">
          <div className="border-2 border-cyan-900 rounded-2xl px-6 py-8 bg-cyan-600">
            <div className="text-center font-bold text-2xl text-cyan-100 mb-6 flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#cefafe"
              >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T616-776h-16q-33 0-56.5 23.5T520-696v56q0 50-35 85t-85 35h-40v40q0 33-23.5 56.5T280-400h-3l126 126q27 27 42.5 62.5T461-145q0 17-2 33.5t-7 32.5l66-66Z" />
              </svg>
              普遍失敗ランキング
            </div>
            <div className="bg-white px-8 py-8 rounded-2xl border-2 border-cyan-900 mt-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-3 py-1 rounded-full text-lg font-bold shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#eee"
                    >
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
                    </svg>
                    <div>1位</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">普遍スコア</div>
              </div>
              <div className="flex items-end justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-cyan-500 border-2 border-cyan-600  rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {(rankingResults.bottom.userName || "匿名").charAt(0)}
                  </div>
                  <div className="font-semibold text-gray-800 text-xl">{rankingResults.bottom.userName || "匿名"}</div>
                </div>
                <div className="text-4xl font-bold text-cyan-600 flex items-center gap-2">
                  {scoreToRank(rankingResults.bottom.score)}
                  <span className="text-sm text-gray-500 font-normal">ランク</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-cyan-500 pl-8">
                <div className="text-gray-700 leading-relaxed text-xl">{rankingResults.bottom.failureText}</div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <div>スコア: {rankingResults.bottom.score}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Link
                href="/ranking/common-failures"
                className="text-cyan-100 font-semibold py-2 px-4 rounded-lg hover:bg-black/10 transition"
              >
                さらに見る →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
