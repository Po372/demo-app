/**
 * 数値スコアを対応するランク文字列に変換します。
 *
 * スコア（-100から100の範囲）をランク（SSS, SS, S, A, ...）に変換します。
 *
 * @param score - 変換するスコア。-100から100までの値である必要があります。
 * @returns 指定されたスコアに対応するランク文字列。
 * @throws {Error} スコアが-100から100の範囲外の場合にスローされます。
 */
export function scoreToGrade(score: number): string {
  if (score > 100 || score < -100) {
    throw new Error("スコアは-100から100の範囲でなければなりません。");
  }

  if (score === 100) {
    return "SSS";
  } else if (score >= 95) {
    return "SS";
  } else if (score >= 90) {
    return "S";
  } else if (score >= 80) {
    return "A";
  } else if (score >= 60) {
    return "B";
  } else if (score >= 30) {
    return "C";
  } else if (score >= 0) {
    return "D";
  } else if (score >= -30) {
    return "-D";
  } else if (score >= -60) {
    return "-C";
  } else if (score >= -80) {
    return "-B";
  } else if (score >= -90) {
    return "-A";
  } else if (score >= -95) {
    return "-S";
  } else if (score >= -99) {
    return "-SS";
  } else {
    return "-SSS";
  }
}
