export function ScoreCard({ score, grade }: { score: number, grade: string }) {
  const isGood = score >= 70;
  return (
    <div className={`p-6 rounded-xl border-l-4 shadow-sm bg-white ${isGood ? 'border-[#2D6A4F]' : 'border-amber-500'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 font-medium text-sm">Credit Score</h3>
          <div className="text-4xl font-extrabold mt-1 text-slate-800">{score}</div>
          <p className="text-sm mt-1 text-gray-500">out of 100</p>
        </div>
        <div className={`text-6xl font-bold ${isGood ? 'text-green-600' : 'text-amber-500'}`}>
          {grade}
        </div>
      </div>
    </div>
  );
}
