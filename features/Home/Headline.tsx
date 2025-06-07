import "./CSS/Headline.css";

function Headline() {
  return (
    <span
      className="headline"
      style={{
        display: "inline-block",
        padding: "0.25rem 0.5rem",
        border: "1px solid rgb(61, 248, 14)",
        borderRadius: "0.5rem",
      }}
    >
      やらかしを入力して究極のやらかし度を目指せ！
    </span>
  );
}
export default Headline;
