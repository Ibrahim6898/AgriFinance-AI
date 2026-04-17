'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Offer {
  lender: string;
  rate: string;
  type: string;
  amount: string;
  ussd?: string;
  phone?: string;
}

export function LoanOffers({ recommendation }: { recommendation: string }) {
  const { t } = useLanguage();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  if (!recommendation) return null;

  const mockOffers = [
    { 
      lender: 'Babban Gona', 
      rate: '2.5%', 
      type: 'Fertilizer Input Loan', 
      amount: recommendation,
      ussd: '*665#',
      phone: '0800-226-226'
    },
    { 
      lender: 'Sterling Bank (Sabadi)', 
      rate: '3.0%', 
      type: 'Cash Micro-loan', 
      amount: recommendation,
      ussd: '*822#',
      phone: '0700-822-0000'
    },
  ];

  const handleApplyClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowSuccess(false);
  };

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  const closeModal = () => {
    setSelectedOffer(null);
    setShowSuccess(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="bg-[#2D6A4F] text-white p-4">
        <h3 className="font-bold">{t('loan_matched_title')}</h3>
        <p className="text-sm text-green-100">{t('loan_matched_subtitle')}</p>
      </div>
      <div className="divide-y divide-gray-100">
        {mockOffers.map((offer, i) => (
          <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div>
              <p className="font-bold text-gray-800">{offer.lender}</p>
              <p className="text-sm text-gray-500">{offer.type} &bull; {offer.rate} {t('loan_interest')}</p>
            </div>
            <button 
              onClick={() => handleApplyClick(offer)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors shadow-sm"
            >
              {t('loan_apply')}
            </button>
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h4 className="font-bold text-[#2D6A4F]">Application Details</h4>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>
            
            <div className="p-6">
              {showSuccess ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                  <h4 className="font-bold text-lg text-slate-800 mb-2">Application Initiated</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    To complete your application with <strong>{selectedOffer.lender}</strong>, please follow these steps:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg text-left text-sm space-y-3">
                    <div>
                      <span className="block text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Option 1: Dial USSD</span>
                      <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200 text-lg font-bold text-slate-800">{selectedOffer.ussd}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Option 2: Call Helpline</span>
                      <span className="font-semibold text-slate-800">{selectedOffer.phone}</span>
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="mt-6 w-full bg-gray-100 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Lender</p>
                    <p className="font-bold text-lg text-slate-800">{selectedOffer.lender}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Loan Type</p>
                      <p className="font-medium text-slate-800">{selectedOffer.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Interest Rate</p>
                      <p className="font-medium text-slate-800">{selectedOffer.rate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Recommended Amt.</p>
                    <p className="font-bold text-xl text-green-700">{selectedOffer.amount}</p>
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button 
                      onClick={closeModal}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleConfirm}
                      className="flex-1 bg-amber-500 text-white font-bold py-2 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                    >
                      Confirm & Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
