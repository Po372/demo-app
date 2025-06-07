"use client";
import "./CSS/Ranking.css";

import Link from "next/link";
import { FaCrown } from "react-icons/fa";
{
  /*リンク先のここあんまり自信ないので確認お願いします*/
}

function Ranking() {
  return (
    <div className="ranking-container">
      <Link href="/ranking" className="ranking-button">
        <FaCrown style={{ color: "gold" }} />
        <span>ランキング</span>
      </Link>
    </div>
  );
}

export default Ranking;
