import TextInput from "./Textinput";
import Headline from "./Headline";
import "./CSS/HeadlineInput.css";

function HeadlineInput() {
  return (
    <div className="headline-input-container">
      <Headline />
      <TextInput />
    </div>
  );
}
export default HeadlineInput;
// このコンポーネントは、HeadlineとTextInputを組み合わせて表示するためのものです。
