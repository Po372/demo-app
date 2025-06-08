import "./CSS/Scoring.css";
function Scoring({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="scoring">
      採点する！
    </button>
  );
}
export default Scoring;
