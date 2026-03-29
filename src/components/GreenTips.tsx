import { useLanguage } from '@/contexts/LanguageContext';

export function GreenTips({ tips }: { tips: string[] }) {
  const { t } = useLanguage();
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
      <h3 className="text-[#2D6A4F] font-black text-lg mb-4 flex items-center uppercase tracking-tight">
        {t('green_tips_title')}
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex text-emerald-900 leading-snug items-start font-bold text-xs">
            <span className="text-emerald-500 mr-2 shrink-0">✔</span>
            {tip}
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-emerald-700 mt-4 italic font-medium">
        {t('green_tips_footer')}
      </p>
    </div>
  );
}
