import "../Home/CSS/Home.css";
import Ranking from "./Ranking";
import Scoring from "./Scoring";
import HeadlineInput from "./HeadlineInput";

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
  return (
    <div className="home-container">
      <Ranking />
      <HeadlineInput inputFailureText={inputFailureText} setInputFailureText={setInputFailureText} />
      {error && (
        <div className="bg-rose-300/20 border-2 border-rose-600 px-6 py-2 rounded-xl text-white">⚠️ {error}</div>
      )}
      <Scoring onClick={onScoringClick} />
    </div>
  );
}
