'use client';

import { useState } from 'react';

export function SMSSimulator({ score, loanAmt }: { score: number, loanAmt: string }) {
  const [phoneFrame, setPhoneFrame] = useState('ussd');
  const [ussdInput, setUssdInput] = useState('');
  const [ussdScreen, setUssdScreen] = useState('main');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ussdInput.trim()) return;
    const val = ussdInput.trim();
    setUssdInput('');

    if (val === '0') {
      setUssdScreen('main');
      return;
    }

    if (ussdScreen === 'main') {
      if (val === '1') setUssdScreen('loan');
      else if (val === '2') setUssdScreen('score');
      else if (val === '3') setUssdScreen('tips');
      else if (val === '4') setUssdScreen('lang');
    } else if (ussdScreen === 'loan' && val === '1') {
      setUssdScreen('loan_success');
    }
  };

  const renderUssdScreen = () => {
    switch(ussdScreen) {
      case 'score':
        return (
          <>
            AgriFinance Score<br/>
            ---<br/>
            Your current rating is:<br/>
            Score: {score}/100<br/><br/>
            0. Go Back
          </>
        );
      case 'loan':
        return (
          <>
            Loan Application<br/>
            ---<br/>
            You pre-qualify for:<br/>
            {loanAmt}<br/><br/>
            1. Accept Offer<br/>
            0. Go Back
          </>
        );
      case 'loan_success':
        return (
          <>
            Success!<br/>
            ---<br/>
            Your loan application for {loanAmt} has been submitted to Babban Gona.<br/><br/>
            0. Main Menu
          </>
        );
      case 'tips':
        return (
          <>
            Green Farming Tips<br/>
            ---<br/>
            Tip 1: Retain crop residue after harvest to keep soil moisture high.<br/><br/>
            0. Go Back
          </>
        );
      case 'lang':
        return (
          <>
            Language / Harshe<br/>
            ---<br/>
            Language setting updated successfully.<br/><br/>
            0. Main Menu
          </>
        );
      case 'main':
      default:
        return (
          <>
            &gt; *822*1#<br/>
            ---<br/>
            Welcome to AgriFinance<br/><br/>
            1. Apply for Loan<br/>
            2. Check My Score<br/>
            3. Green Farming Tips<br/>
            4. Language (Hausa/ENG)<br/>
          </>
        );
    }
  };

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
            <div className="flex flex-col h-full">
              <div>{renderUssdScreen()}</div>
              
              <form onSubmit={handleSend} className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center">
                  <span>Reply:</span>
                  <input 
                    type="text" 
                    value={ussdInput}
                    onChange={(e) => setUssdInput(e.target.value)}
                    className="bg-transparent border-none outline-none w-20 ml-2 text-green-400 font-mono focus:ring-0 p-0 shadow-none"
                    autoFocus
                    autoComplete="off"
                    maxLength={2}
                  />
                </div>
                <div className="text-[10px] text-gray-500 mt-2 italic">(Type a number and press Enter)</div>
              </form>
            </div>
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
