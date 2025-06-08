import "./CSS/Headline.css";

function Headline() {
  return (
    <span
      className="headline"
      style={{
        display: "inline-block",
        padding: "1.25rem 1.5rem",
        border: "2px solid #d9f99d",
        borderRadius: "0.5rem",
      }}
    >
      やらかしを入力して究極のやらかし度を目指せ！
    </span>
  );
}
export default Headline;
