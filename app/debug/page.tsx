"use client";

// ボタンを押すとLLMにやらかしを採点させてDBに保存
// デバッグ/テスト用のページ
export default function Page() {
  return (
    <div>
      <h1>Debug Page</h1>
      <button
        onClick={async () => {
          const response = await fetch("/api/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: "",
              failureText: "焼きそばを作ろうとしたが、麺が焦げてしまった。",
            })
          });
          console.log("Response from /api/score:", await response.json());
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Debug
      </button>
    </div>
  );
}
