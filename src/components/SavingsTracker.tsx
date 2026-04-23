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

  const [savings, setSavings] = useState([
    { weekKey: 'savings_week1', amount: 500, date: getRelativeDate(14) },
    { weekKey: 'savings_week2', amount: 800, date: getRelativeDate(7) },
    { weekKey: 'savings_week3', amount: 1200, date: getRelativeDate(1) },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savingsInput, setSavingsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const total = savings.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSave = () => {
    const amountNum = parseFloat(savingsInput);
    if (isNaN(amountNum) || amountNum < 200) {
      setErrorMsg(t('savings_modal_min_error'));
      return;
    }
    setErrorMsg('');
    
    setSavings([
      ...savings,
      {
        weekKey: `Week ${savings.length + 1}`,
        amount: amountNum,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsModalOpen(false);
      setSavingsInput('');
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
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

      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-6 py-2 px-4 border-2 border-[#2D6A4F] text-[#2D6A4F] font-bold rounded-lg hover:bg-[#2D6A4F] hover:text-white transition-all text-sm"
      >
        {t('savings_add_btn')}
      </button>

      <p className="mt-4 text-[10px] text-gray-400 italic text-center leading-tight">
        {t('savings_footer')}
      </p>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {showSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h4 className="font-bold text-lg text-slate-800">{t('savings_modal_success_title')}</h4>
                <p className="text-sm text-gray-500 mt-2">{t('savings_modal_success_desc')}</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg text-[#2D6A4F]">{t('savings_modal_title')}</h4>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('savings_modal_amount_label')}</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    placeholder="Enter amount..."
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#2D6A4F] focus:outline-none"
                    value={savingsInput}
                    onChange={(e) => setSavingsInput(e.target.value)}
                  />
                  {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-[#2D6A4F] text-white font-bold py-2 rounded-lg hover:bg-[#1B4332] transition-colors"
                >
                  {t('savings_modal_confirm')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
