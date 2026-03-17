'use client';

import { useState } from 'react';

export function SMSSimulator({ score, loanAmt }: { score: number, loanAmt: string }) {
  const [phoneFrame, setPhoneFrame] = useState('ussd');

  return (
    <div className="relative mx-auto mt-8 border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-900 border border-slate-700 flex flex-col font-mono text-sm leading-tight p-4">
        {/* Status bar mock */}
        <div className="flex justify-between text-slate-300 text-xs mt-1 mb-8 opacity-70">
          <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          <div className="flex space-x-1">
            <span>▤</span>
            <span>2G</span>
          </div>
        </div>

        <div className="flex-grow text-green-400 mt-4 space-y-4 whitespace-pre-line tracking-wide">
          {phoneFrame === 'ussd' ? (
            <>
              &gt; *822*1#<br/>
              ---<br/>
              Welcome to AgriFinance<br/><br/>
              1. Apply for Loan<br/>
              2. Check My Score<br/>
              3. Green Farming Tips<br/>
              4. Language (Hausa/ENG)<br/>
              <br/>
              Reply: 
              <span className="inline-block w-2 ml-1 h-4 bg-green-500 animate-pulse"></span>
            </>
          ) : (
            <>
              💬 NEW TEXT MESSAGE<br/>
              ---<br/>
              AgriFinance Alert: Your farm analysis is ready!<br/><br/>
              Score: {score}/100<br/>
              You qualify for a loan estimate of {loanAmt}.<br/><br/>
              Reply &apos;TIPS&apos; for local weather advice.
            </>
          )}
        </div>

        <div className="flex justify-between border-t border-slate-700 pt-4 mt-auto">
          <button 
            onClick={() => setPhoneFrame('ussd')}
            className={`px-3 py-1 rounded text-xs ${phoneFrame === 'ussd' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            USSD Demo
          </button>
          <button 
            onClick={() => setPhoneFrame('sms')}
            className={`px-3 py-1 rounded text-xs ${phoneFrame === 'sms' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            SMS Demo
          </button>
        </div>
      </div>
    </div>
  );
}
