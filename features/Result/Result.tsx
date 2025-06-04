import Link from "next/link";
import React from 'react';

type RankingEntry = {
  id: number;
  userId: number;
  userName: string;
  score: number;
  rank: number;
};

type ResultProps = {
  grade: string;
  score: number;
  ranking: RankingEntry[];
};

export const Result: React.FC<ResultProps> = ({ grade, score, ranking }) => {
  return (
    <div className="bg-cyan-600 min-h-screen flex flex-col items-center justify-center relative font-sans">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-[350px] text-center">
        {/* 🏠 ホームボタン */}
        <Link href="/">
          <button className="bg-cyan-700 hover:bg-cyan-500 transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-white text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
          </button>
        </Link>

        {/* 📄 メインカード */}
        <div className="mt-4">
            <div className=" border-3 border-cyan-400 rounded-xl ">
                <p className="mt-4 text-gray-700 text-sm mb-2">あなたの結果は…</p>
                    <div className="text-6xl font-bold  w-24 h-24 flex items-center justify-center mx-auto my-4 text-black">
                        {grade}
                    </div>
            </div>
            <p className="text-lg text-black mt-6">
                やらかし度：<span className="font-semibold text-4xl">{score}点</span>
            </p>
                
                <div className="bg-lime-200 rounded-md mt-6 py-2 px-4 space-y-1 text-left text-black text-sm">
                {ranking.map((entry) => (
                    <div key={entry.id}>
                    {entry.rank}位 {entry.userName} {entry.score}点
                    </div>
                ))}
                </div>
        </div>
    </div>
        {/* 🏆 ランキングボタン */}
        <Link href="/ranking">
        <button className="hover:bg-zinc-700 transition-colors duration-200 mt-5 bg-black text-lime-400 font-bold py-3 px-15 shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z"/></svg>
            ランキングを見る
        </button>
        </Link>
    </div>
    
  );
};

export default Result;