export function GreenTips({ tips }: { tips: string[] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
      <h3 className="text-[#2D6A4F] font-bold text-lg mb-4 flex items-center">
        <span className="text-2xl mr-2">🌱</span>
        Climate-Smart Farming Tips
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex text-emerald-900 leading-snug items-start">
            <span className="text-emerald-500 mr-2 shrink-0">✔</span>
            {tip}
          </li>
        ))}
      </ul>
      <p className="text-xs text-emerald-700 mt-4 italic">
        Adopting these practices may increase your yield and improve your future credit score.
      </p>
    </div>
  );
}
