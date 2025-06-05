import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const rankingResponseSample = {
    top: {
      userName: "ハチマキ",
      failureText: "全社員に退職通知を送付してしまった。",
      score: 1000,
    },
    bottom: {
      userName: "羽根つき餃子",
      failureText: "電車に乗り遅れて5分ほど遅刻してしまった。",
      score: 500,
    },
  };

  return NextResponse.json(
    { rankingResults: rankingResponseSample },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
