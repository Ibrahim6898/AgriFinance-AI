'use client';

import React from 'react';

const LITERACY_TIPS = [
  {
    title: "Understanding Interest",
    content: "If you borrow ₦10,000 at 5%, you pay back ₦10,500. Always check the total repayment amount before signing.",
    category: "Borrowing"
  },
  {
    title: "Crop Insurance",
    content: "Pula and NAIC offer index-based insurance. If your location (Zamfara) has no rain for 21 days, you get paid automatically.",
    category: "Resilience"
  },
  {
    title: "Building History",
    content: "Paying back 1 day early increases your score more than paying exactly on time. This earns lower rates later.",
    category: "Credit"
  }
];

export function FinanceLiteracy() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">Financial Empowerment</h3>
      <div className="grid grid-cols-1 gap-4">
        {LITERACY_TIPS.map((tip: { title: string, content: string, category: string }, i: number) => (
          <div key={i} className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-amber-900 text-sm">{tip.title}</h4>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600 opacity-60">
                {tip.category}
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {tip.content}
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-[#2D6A4F] text-white p-4 rounded-xl mt-6">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">💡</span>
          <h4 className="font-bold text-sm text-green-50">Northern Region Alert</h4>
        </div>
        <p className="text-[11px] text-green-100 opacity-90 leading-snug">
          The rainy season for Zamfara usually starts in June. Ensure your primary crop inputs (Sorghum/Maize) are secured by mid-May to avoid price hikes.
        </p>
      </div>
    </div>
  );
}
