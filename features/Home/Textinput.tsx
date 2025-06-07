import "./CSS/TextInput.css";
function TextInput() {
  // テキスト入力+入力されてないときに例を表示するコンポーネント
  return (
    <textarea
      className="text-input"
      placeholder="例：カップ焼きそばに”かやく”を入れずにお湯を注いでしまった"
    ></textarea>
  );
}
//ステイト必須かも？

export default TextInput;
