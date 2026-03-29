'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImprovementSimulatorProps {
  currentScore: number;
  hasIrrigation: boolean;
  hasPriorLoan: boolean;
}

export default function ImprovementSimulator({ currentScore, hasIrrigation, hasPriorLoan }: ImprovementSimulatorProps) {
  const { t } = useLanguage();
  const irrigationPotential = !hasIrrigation ? 15 : 0;
  const loanPotential = !hasPriorLoan ? 10 : 0;

  if (irrigationPotential === 0 && loanPotential === 0) return null;

  return (
    <div className="mt-8 bg-[#2D6A4F]/5 rounded-xl p-6 border border-[#2D6A4F]/20">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">📈</span>
        <h3 className="text-lg font-bold text-[#2D6A4F]">{t('improve_title')}</h3>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {t('improve_desc').replace('{score}', String(currentScore))}
      </p>

      <div className="space-y-4">
        {!hasIrrigation && (
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-4">💧</div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{t('improve_irrigation_title')}</p>
              <p className="text-gray-500 text-xs mt-1">{t('improve_irrigation_desc')}</p>
              <div className="mt-2 text-[#2D6A4F] font-bold text-xs">
                {t('improve_potential').replace('{n}', String(irrigationPotential))}
              </div>
            </div>
          </div>
        )}

        {!hasPriorLoan && (
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-full mr-4">🤝</div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{t('improve_loan_title')}</p>
              <p className="text-gray-500 text-xs mt-1">{t('improve_loan_desc')}</p>
              <div className="mt-2 text-[#2D6A4F] font-bold text-xs">
                {t('improve_potential').replace('{n}', String(loanPotential))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-xs">
          {t('improve_estimated')} <span className="font-bold text-[#2D6A4F] text-lg">{Math.min(100, currentScore + irrigationPotential + loanPotential)}</span>
        </p>
      </div>
    </div>
  );
}
