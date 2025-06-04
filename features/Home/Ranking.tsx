"use client";

import Link from "next/link";
import { FaCrown } from "react-icons/fa";
{
  /*リンク先のここあんまり自信ないので確認お願いします*/
}

function Ranking() {
  return (
    <Link href="/ranking" className="ranking-button">
      <FaCrown />
      <p>ランキング</p>
    </Link>
  );
}

export default Ranking;
