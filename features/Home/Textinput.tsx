import "./CSS/TextInput.css";

function TextInput({
  inputFailureText,
  setInputFailureText,
}: {
  inputFailureText: string;
  setInputFailureText: (text: string) => void;
}) {

  // テキスト入力+入力されてないときに例を表示するコンポーネント
  return (
    <textarea
      className="text-input"
      placeholder="例：カップ焼きそばに”かやく”を入れずにお湯を注いでしまった"
      value={inputFailureText}
      onChange={(e) => setInputFailureText(e.target.value)}
    ></textarea>
  );
}
//ステイト必須かも？

export default TextInput;
