"use client";

import { scoreToRank } from "@/logics/scoreToRank";

export default function FailureCard({
  order,
  userName,
  failureText,
  comment,
  score,
  createdAt,
}: {
  order: number;
  userName: string;
  failureText: string;
  comment: string;
  score: number;
  createdAt: string;
}) {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md flex">
      <div className="absolute top-0 left-2">
        <div
          style={{
            backgroundColor: order === 1 ? "#e1cc57" : order === 2 ? "#679dd2" : order === 3 ? "#db9f63" : "#6e6e6e",
          }}
          className="px-3 py-2 text-white font-bold"
        >
          {order}
        </div>
      </div>
      <div className="mr-6 mt-4 flex flex-col items-end">
        <div className="text-6xl font-bold text-slate-500 mb-2">{scoreToRank(score)}</div>
        <div className="text-lg font-semibold text-slate-800">{score}点</div>
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-semibold">{failureText}</h3>
        <hr className="mt-4" />
        <div className="px-4 py-2 bg-lime-200 border-2 border-lime-700 w-fit rounded-lg mt-6">{comment}</div>
        <p className="text-sm text-gray-500 mt-3">{userName || "匿名"}</p>
        <p className="text-xs text-gray-400 mt-1">投稿日: {createdAt}</p>
      </div>
    </div>
  );
}
