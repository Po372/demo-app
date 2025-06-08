import Link from "next/link";
import React from "react";

type RankingEntry = {
  id: string;
  userName: string;
  score: number;
  comment: string;
  rank: number;
};

type ResultProps = {
  grade: string;
  score: number;
  ranking: RankingEntry[];
  comment: string;
  failue_text: string;
};

export const Result: React.FC<ResultProps> = ({
  grade,
  score,
  ranking,
  comment,
  failue_text,
}) => {
  return (
    <div className="bg-cyan-600 min-h-screen flex flex-col items-center justify-center font-sans px-4 py-6 sm:py-12">
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl w-full max-w-xl mx-auto text-center relative">
        {/* 🏠 ホームボタン */}
        <Link href="/">
          <button className="absolute top-4 left-4 bg-cyan-700 hover:bg-cyan-500 transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-white text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </button>
        </Link>

        {/* 本体レイアウト */}
        <div className="flex flex-col gap-6 mt-10">
          {/* 結果部分 */}
          <div className="flex flex-col justify-center items-center bg-cyan-100 rounded-xl p-6 shadow-inner">
            <div className="border-4 border-cyan-500 rounded-xl px-6 py-4 bg-white w-full text-center break-words">
              <p className="text-gray-600 text-base mb-2">あなたの結果は…</p>
              <div className="text-7xl font-bold text-black my-6">{grade}</div>
              <p className="text-lg sm:text-xl text-black break-words whitespace-nowrap">
                やらかし度：
                <span className="font-semibold text-3xl sm:text-5xl">{score}点</span>
              </p>
            </div>
          </div>

          {/* やらかし内容 */}
          <div className="bg-red-50 border border-red-300 text-red-900 rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-md mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-11.707a1 1 0 00-1.414 0L7 9.586 8.414 11l1.293-1.293a1 1 0 000-1.414zm1.293 4.707H8v2h4v-2h-1z"
                  clipRule="evenodd"
                />
              </svg>
              やらかし内容
            </h3>
            <p className="text-sm whitespace-pre-wrap">{failue_text}</p>
          </div>

          {/* コメント */}
          <div className="bg-blue-50 border border-blue-300 text-blue-900 rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-md mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 10c0-3.866-3.582-7-8-7S2 6.134 2 10c0 1.386.473 2.667 1.269 3.706C3.097 15.313 2 16.417 2 16.417c.845-.282 1.851-.527 2.707-.686A7.976 7.976 0 0010 17c4.418 0 8-3.134 8-7z" />
              </svg>
              AIからのコメント
            </h3>
            <p className="text-sm whitespace-pre-wrap">{comment}</p>
          </div>

          {/* ランキング */}
          <div className="bg-lime-200 rounded-md p-3 shadow-sm text-black font-bold">
            <h3 className="text-sm mb-2">あなたの近くの順位</h3>
            <div className="space-y-1">
              {ranking.map((entry) => (
                <div
                  key={entry.id}
                  className="text-sm font-mono flex justify-between border-b border-lime-300 pb-1"
                >
                  <span>
                    {entry.rank}位 {entry.userName}
                  </span>
                  <span>{entry.score}点</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🏆 ランキングボタン */}
        <Link href="/ranking">
          <button className="hover:bg-zinc-700 transition-colors duration-200 mt-6 bg-black text-lime-400 font-bold py-3 px-6 shadow-md flex items-center gap-2 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z" />
            </svg>
            ランキングを見る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Result;