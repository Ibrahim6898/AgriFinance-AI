/** 
 * A simplified SVG Donut Chart representing a breakdown of the credit score 
 * based on Experience, Farm Data, and Climate factors.
 */
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function ScoreBreakdownChart({ score }: { score: number }) {
  const { t } = useLanguage();
  // Mock ratios for visual demonstration
  const experienceRatio = 0.4;
  const farmDataRatio = 0.45;
  const climateRatio = 0.15;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const expOffset = circumference * experienceRatio;
  const farmOffset = circumference * farmDataRatio;
  const climOffset = circumference * climateRatio;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-600 font-semibold mb-4 w-full text-left">{t('score_breakdown_title')}</h3>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
          
          {/* Experience piece */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F4A261" strokeWidth="16" 
                  strokeDasharray={`${expOffset} ${circumference}`} />
          {/* Farm piece */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2D6A4F" strokeWidth="16" 
                  strokeDasharray={`${farmOffset} ${circumference}`}
                  strokeDashoffset={-expOffset} />
          {/* Climate piece */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#84CC16" strokeWidth="16" 
                  strokeDasharray={`${climOffset} ${circumference}`}
                  strokeDashoffset={-(expOffset + farmOffset)} />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-800">{score}</span>
        </div>
      </div>

      <div className="mt-6 w-full space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center"><span className="w-3 h-3 bg-[#F4A261] rounded-full mr-2"></span>{t('score_breakdown_experience')}</span>
          <span className="font-semibold">{Math.round(score * experienceRatio)} pts</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center"><span className="w-3 h-3 bg-[#2D6A4F] rounded-full mr-2"></span>{t('score_breakdown_farm_data')}</span>
          <span className="font-semibold">{Math.round(score * farmDataRatio)} pts</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center"><span className="w-3 h-3 bg-[#84CC16] rounded-full mr-2"></span>{t('score_breakdown_climate')}</span>
          <span className="font-semibold">{Math.round(score * climateRatio)} pts</span>
        </div>
      </div>
    </div>
  );
}
