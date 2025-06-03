"use client";

import Link from "next/link";

export default function Ranking() {
  return (
    <div className="flex flex-col items-center gap-12 text-xl">
      {/* ランキングボタン */}
      <div className="flex items-center px-8 py-4 justify-between w-full bg-cyan-600 rounded-b-3xl font-bold text-white">
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </Link>
        <div>ランキング</div>
      </div>
      {/* レア失敗ランキング */}
      <div className="w-9/10 border-2 border-lime-600 rounded-2xl px-4 py-12">
        <div className="text-center font-bold text-2xl">レア失敗ランキング</div>
        <div className="mt-12">1位</div>
        <div className="flex items-center justify-between">
          <div>ハチマキ</div>
          <div>SSS</div>
        </div>
        <div className="mt-12">全社員に退職通知を送付してしまった。</div>
      </div>
      {/* 普遍失敗ランキング */}
      <div className="w-9/10 border-2 border-cyan-600 rounded-2xl px-4 py-12">
        <div className="text-center font-bold text-2xl">普遍失敗ランキング</div>
        <div className="mt-12">1位</div>
        <div className="flex items-center justify-between">
          <div>羽根つき餃子</div>
          <div>SSS</div>
        </div>
        <div className="mt-12">電車に乗り遅れて5分ほど遅刻してしまった。</div>
      </div>
    </div>
  );
}
