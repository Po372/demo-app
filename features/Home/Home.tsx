import "../Home/CSS/Home.css";
import TextInput from "./Textinput";
import Ranking from "./Ranking";
import Headline from "./Headline";
import Scoring from "./Scoring";

export default function Home() {
  return (
    <div className="home-container">
      <Ranking />
      <Headline />
      <TextInput />
      <Scoring />
    </div>
  );
}
