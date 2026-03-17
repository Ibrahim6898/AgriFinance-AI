'use client';

import React, { useState } from 'react';

export function SavingsTracker() {
  const [savings, setSavings] = useState([
    { week: 'Week 1', amount: 500, date: '2026-03-01' },
    { week: 'Week 2', amount: 800, date: '2026-03-08' },
    { week: 'Week 3', amount: 1200, date: '2026-03-15' },
  ]);

  const total = savings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#2D6A4F]">Community Savings Wallet</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Active</span>
      </div>
      
      <div className="text-3xl font-black text-slate-800 mb-6 flex items-baseline">
        ₦{total.toLocaleString()}
        <span className="text-sm font-normal text-gray-500 ml-2">Total Balance</span>
      </div>

      <div className="space-y-3">
        {savings.map((entry, i) => (
          <div key={i} className="flex justify-between items-center text-sm border-l-4 border-green-500 pl-3 py-1 bg-green-50/50">
            <div>
              <p className="font-semibold text-slate-700">{entry.week}</p>
              <p className="text-gray-400 text-[10px]">{entry.date}</p>
            </div>
            <p className="font-bold text-green-700">+₦{entry.amount}</p>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 px-4 border-2 border-[#2D6A4F] text-[#2D6A4F] font-bold rounded-lg hover:bg-[#2D6A4F] hover:text-white transition-all text-sm">
        Add Small Savings (₦200 min)
      </button>
      
      <p className="mt-4 text-[10px] text-gray-400 italic text-center leading-tight">
        Consistent saving builds your &quot;Repayment Proof&quot; profile and increases your credit limit.
      </p>
    </div>
  );
}
