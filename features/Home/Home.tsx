import "../Home/CSS/Home.css";
import TextInput from "./Textinput";
import Ranking from "./Ranking";
import Headline from "./Headline";
import Scoring from "./Scoring";
import HeadlineInput from "./HeadlineInput";

export default function Home() {
  return (
    <div className="home-container">
      <Ranking />
      <HeadlineInput />
      <Scoring />
    </div>
  );
}
