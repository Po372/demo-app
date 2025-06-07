import { Result } from "@/features/Result/Result";

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