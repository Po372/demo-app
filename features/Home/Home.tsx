import "../Home/CSS/Home.css";
import Ranking from "./Ranking";
import Scoring from "./Scoring";
import HeadlineInput from "./HeadlineInput";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({
  error,
  inputFailureText,
  setInputFailureText,
  onScoringClick,
}: {
  error: string | null;
  inputFailureText: string;
  setInputFailureText: (text: string) => void;
  onScoringClick: () => void;
}) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // ローカルストレージからユーザー名を取得
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="home-container">
      <Link
        href="/user-name"
        className="flex absolute top-4 left-4 text-white text-l gap-2 justify-center items-center p-4 rounded-full bg-cyan-600 hover:bg-cyan-700 transition"
      >
        <div className="flex justify-center items-center text-cyan-800 font-bold text-xl rounded-full w-12 h-12 bg-white">
          {userName?.charAt(0)}
        </div>
        <div className="flex flex-col">
          <div className="text-sm">{userName ? `${userName}さん` : "ユーザー名を設定"}</div>
          <div className="text-white/60 text-xs">クリックしてユーザ名を変更</div>
        </div>
      </Link>
      <Ranking />
      <HeadlineInput inputFailureText={inputFailureText} setInputFailureText={setInputFailureText} />
      {error && (
        <div className="bg-rose-300/20 border-2 border-rose-600 px-6 py-2 rounded-xl text-white">⚠️ {error}</div>
      )}
      <Scoring onClick={onScoringClick} />
    </div>
  );
}
