import "../Home/CSS/Home.css";
import TextInput from "./Textinput";
import Ranking from "./Ranking";
import Headline from "./Headline";

export default function Home() {
  return (
    <div className="home-container">
      <Headline />
      <TextInput />
      <Ranking />
    </div>
  );
}
