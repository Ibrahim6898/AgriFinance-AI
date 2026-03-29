'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function FinanceLiteracy() {
  const { t } = useLanguage();

  const LITERACY_TIPS = [
    {
      titleKey: 'fin_tip1_title',
      contentKey: 'fin_tip1_content',
      categoryKey: 'fin_borrowing',
    },
    {
      titleKey: 'fin_tip2_title',
      contentKey: 'fin_tip2_content',
      categoryKey: 'fin_resilience',
    },
    {
      titleKey: 'fin_tip3_title',
      contentKey: 'fin_tip3_content',
      categoryKey: 'fin_credit',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">{t('fin_empowerment')}</h3>
      <div className="grid grid-cols-1 gap-4">
        {LITERACY_TIPS.map((tip, i) => (
          <div key={i} className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-amber-900 text-sm">{t(tip.titleKey)}</h4>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600 opacity-60">
                {t(tip.categoryKey)}
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {t(tip.contentKey)}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#2D6A4F] text-white p-4 rounded-xl mt-6">
        <div className="flex items-center mb-2">
          <h4 className="font-bold text-sm text-green-50">{t('fin_northern_alert')}</h4>
        </div>
        <p className="text-[11px] text-green-100 opacity-90 leading-snug">
          {t('fin_northern_text')}
        </p>
      </div>
    </div>
  );
}
