"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Result from "@/features/Result/Result";

type RankingEntry = {
  id: string;
  userName: string;
  score: number;
  comment: string;
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
  } | null>(null);

  useEffect(() => {
    const fetchResultAndRanking = async () => {
      try {
        // 対象ユーザーの結果を取得
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

        // 全ユーザーのスコア取得（降順）
        const { data: allResults, error: allError } = await supabase
          .from("results")
          .select("id,  user_name, score, comment")
          .order("score", { ascending: false });

        if (allError || !allResults) {
          console.error("ランキングの取得に失敗しました", allError);
          setLoading(false);
          return;
        }

        // 順位を付ける
        const ranked = allResults.map((entry, index) => ({
          id: entry.id,
          userName: entry.user_name,
          score: entry.score,
          comment: entry.comment,
          rank: index + 1,
        }));

        // 自分の順位を取得
        const myEntry = ranked.find((r) => r.id === result.id);

        if (!myEntry) {
          console.error("自分のエントリが見つかりませんでした");
          setLoading(false);
          return;
        }

        setResultData({
          grade: result.grade,
          score: result.score,
          ranking: [myEntry], // 🔸 自分の順位だけを渡す
        });
      } catch (err) {
        console.error("エラーが発生しました", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultAndRanking();
  }, [resultId]);

  
  if (loading) return <div className="p-4 text-center">読み込み中...</div>;
  if (!resultData) return <div className="p-4 text-center">結果が見つかりませんでした。</div>;
  

  return (
    <Result
      grade={resultData.grade}
      score={resultData.score}
      ranking={resultData.ranking}
    />
  );
}


/*動く部分
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