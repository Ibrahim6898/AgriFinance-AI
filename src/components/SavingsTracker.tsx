'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function SavingsTracker() {
  const { t } = useLanguage();

  const getRelativeDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  const [savings] = useState([
    { weekKey: 'savings_week1', amount: 500, date: getRelativeDate(14) },
    { weekKey: 'savings_week2', amount: 800, date: getRelativeDate(7) },
    { weekKey: 'savings_week3', amount: 1200, date: getRelativeDate(1) },
  ]);

  const total = savings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#2D6A4F]">{t('savings_title')}</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">{t('savings_active')}</span>
      </div>

      <div className="text-3xl font-black text-slate-800 mb-6 flex items-baseline">
        ₦{total.toLocaleString()}
        <span className="text-sm font-normal text-gray-500 ml-2">{t('savings_total_label')}</span>
      </div>

      <div className="space-y-3">
        {savings.map((entry, i) => (
          <div key={i} className="flex justify-between items-center text-sm border-l-4 border-green-500 pl-3 py-1 bg-green-50/50">
            <div>
              <p className="font-semibold text-slate-700">{t(entry.weekKey)}</p>
              <p className="text-gray-400 text-[10px]">{entry.date}</p>
            </div>
            <p className="font-bold text-green-700">+₦{entry.amount}</p>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 px-4 border-2 border-[#2D6A4F] text-[#2D6A4F] font-bold rounded-lg hover:bg-[#2D6A4F] hover:text-white transition-all text-sm">
        {t('savings_add_btn')}
      </button>

      <p className="mt-4 text-[10px] text-gray-400 italic text-center leading-tight">
        {t('savings_footer')}
      </p>
    </div>
  );
}
