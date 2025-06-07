export function scoreToRank(score: number): string {
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
  } else if (score >= -100) {
    return "-SS";
  } else {
    return "-SSS";
  }
}
