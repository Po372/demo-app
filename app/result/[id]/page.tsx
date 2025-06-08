"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Result from "@/features/Result/Result";
import Loading from "@/features/Result/Loading";
import { scoreToGrade } from "@/logics/scoreToRank";

type RankingEntry = {
  id: string;
  userName: string;
  score: number;
  comment: string;
  summary: string;
  rank: number;
};

export default function HomeResultPage() {
  const params = useParams();
  const resultId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<{
    grade: string;
    score: number;
    ranking: RankingEntry[];
    comment: string;
    failuer: string;
  } | null>(null);

  useEffect(() => {
    const fetchResultAndRanking = async () => {
      try {
        // 自分の結果を取得
        const { data: result, error: resultError } = await supabase
          .from("results")
          .select("*")
          .eq("id", resultId)
          .maybeSingle();

        if (resultError || !result) {
          console.error("結果の取得に失敗しました", resultError);
          setLoading(false);
          return;
        }

        // 全ての結果をスコア降順で取得
        const { data: allResults, error: allError } = await supabase
          .from("results")
          .select("id, user_name, score, comment, failure_text")
          .order("score", { ascending: false });

        if (allError || !allResults) {
          console.error("ランキングの取得に失敗しました", allError);
          setLoading(false);
          return;
        }

        // ランキング付け
        const ranked = allResults.map((entry, index) => ({
          id: entry.id,
          userName: entry.user_name ?? "匿名",
          score: entry.score,
          comment: entry.comment,
          summary: entry.failure_text,
          rank: index + 1,
        }));

        // 自分のインデックスを探す
        const currentIndex = ranked.findIndex((r) => r.id === result.id);
        if (currentIndex === -1) {
          console.error("自分の順位が見つかりませんでした");
          setLoading(false);
          return;
        }

        // 自分の前後1件ずつを取得(1位や最下位の時は上か下かの一件だけ取得)
        const start = Math.max(currentIndex - 1, 0);
        const end = Math.min(currentIndex + 2, ranked.length);
        const surroundingEntries = ranked.slice(start, end);

        setResultData({
          grade: result.grade,
          score: result.score,
          ranking: surroundingEntries,
          comment: result.comment,
          failuer: result.failure_text,
        });
      } catch (err) {
        console.error("エラーが発生しました", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultAndRanking();
  }, [resultId]);

  //読込中画面
  if (loading) return (
      //<div className="p-4 text-center">読み込み中...</div>
      <Loading />
    );
  if (!resultData) return <div className="p-4 text-center">結果が見つかりませんでした。</div>;
  

  resultData.grade=scoreToGrade(resultData.score);

  return (
    
    <Result
      grade={resultData.grade}
      score={resultData.score}
      ranking={resultData.ranking}
      comment={resultData.comment}
      failue_text={resultData.failuer}
    />
    
  );
}



/*過去の遺物
const testRanking = [
  { id: '1', userId: 1, userName: 'ゆかぽ',comment: 'なし', score: 97, rank: 172 },
  { id: '2', userId: 2, userName: 'ミサイル',comment: 'なし', score: 127, rank: 173 },
  { id: '3', userId: 3, userName: 'さいれん',comment: 'なし', score: 110, rank: 174 },
];

export default function Home() {
  return (
    <div className="bg-white">
      <Result grade="SS" score={127} ranking={testRanking}/>
    </div>
  );
}
*/