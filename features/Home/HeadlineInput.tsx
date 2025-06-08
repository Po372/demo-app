import TextInput from "./Textinput";
import Headline from "./Headline";
import "./CSS/HeadlineInput.css";

function HeadlineInput({
  inputFailureText,
  setInputFailureText,
}: {
  inputFailureText: string;
  setInputFailureText: (text: string) => void;
}) {
  return (
    <div className="headline-input-container">
      <Headline />
      <TextInput inputFailureText={inputFailureText} setInputFailureText={setInputFailureText}/>
    </div>
  );
}
export default HeadlineInput;
// このコンポーネントは、HeadlineとTextInputを組み合わせて表示するためのものです。
