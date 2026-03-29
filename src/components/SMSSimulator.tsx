'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function SMSSimulator({ score, loanAmt }: { score: number, loanAmt: string }) {
  const { t } = useLanguage();
  const [phoneFrame, setPhoneFrame] = useState('ussd');
  const [ussdInput, setUssdInput] = useState('');
  const [ussdScreen, setUssdScreen] = useState('main');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ussdInput.trim()) return;
    const val = ussdInput.trim();
    setUssdInput('');

    if (val === '0') { setUssdScreen('main'); return; }

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
            {t('sms_score_title')}<br/>
            ---<br/>
            {t('sms_score_text')}<br/>
            {t('sms_score_line').replace('{score}', String(score))}<br/><br/>
            {t('sms_go_back')}
          </>
        );
      case 'loan':
        return (
          <>
            {t('sms_loan_title')}<br/>
            ---<br/>
            {t('sms_loan_qualify')}<br/>
            {loanAmt}<br/><br/>
            {t('sms_accept')}<br/>
            {t('sms_go_back')}
          </>
        );
      case 'loan_success':
        return (
          <>
            {t('sms_success_title')}<br/>
            ---<br/>
            {t('sms_success_text').replace('{amt}', loanAmt)}<br/><br/>
            {t('sms_main_menu')}
          </>
        );
      case 'tips':
        return (
          <>
            {t('sms_tips_title')}<br/>
            ---<br/>
            {t('sms_tip_1')}<br/><br/>
            {t('sms_go_back')}
          </>
        );
      case 'lang':
        return (
          <>
            {t('sms_lang_title')}<br/>
            ---<br/>
            {t('sms_lang_updated')}<br/><br/>
            {t('sms_main_menu')}
          </>
        );
      case 'main':
      default:
        return (
          <>
            &gt; *822*1#<br/>
            ---<br/>
            {t('sms_welcome')}<br/><br/>
            {t('sms_menu_1')}<br/>
            {t('sms_menu_2')}<br/>
            {t('sms_menu_3')}<br/>
            {t('sms_menu_4')}<br/>
          </>
        );
    }
  };

  return (
    <div className="relative mx-auto mt-8 border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>

      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-900 border border-slate-700 flex flex-col font-mono text-sm leading-tight p-4">
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
                  <span>{t('sms_reply')}</span>
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
                <div className="text-[10px] text-gray-500 mt-2 italic">{t('sms_hint')}</div>
              </form>
            </div>
          ) : (
            <>
              {t('sms_new_msg')}<br/>
              ---<br/>
              {t('sms_alert')}<br/><br/>
              {t('sms_score_line').replace('{score}', String(score))}<br/>
              {t('sms_qualify_line').replace('{amt}', loanAmt)}<br/><br/>
              {t('sms_reply_tips')}
            </>
          )}
        </div>

        <div className="flex justify-between border-t border-slate-700 pt-4 mt-auto">
          <button
            onClick={() => setPhoneFrame('ussd')}
            className={`px-3 py-1 rounded text-xs ${phoneFrame === 'ussd' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            {t('sms_ussd_demo')}
          </button>
          <button
            onClick={() => setPhoneFrame('sms')}
            className={`px-3 py-1 rounded text-xs ${phoneFrame === 'sms' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            {t('sms_sms_demo')}
          </button>
        </div>
      </div>
    </div>
  );
}
