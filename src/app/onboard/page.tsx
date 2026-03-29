'use client';

import React, { useState } from 'react';
import FarmerForm from '@/components/FarmerForm';
import { ScoreCard } from '@/components/ScoreCard';
import { ScoreBreakdownChart } from '@/components/ScoreBreakdownChart';
import { LoanOffers } from '@/components/LoanOffers';
import { GreenTips } from '@/components/GreenTips';
import { SMSSimulator } from '@/components/SMSSimulator';
import ImprovementSimulator from '@/components/ImprovementSimulator';
import { FarmerProfile, FarmerScoreResponse } from '@/types/farmer';
import { useLanguage } from '@/contexts/LanguageContext';
import { SavingsTracker } from '@/components/SavingsTracker';
import { FinanceLiteracy } from '@/components/FinanceLiteracy';

export default function OnboardPage() {
  const [scoreData, setScoreData] = useState<FarmerScoreResponse['data'] | null>(null);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const { t } = useLanguage();

  // Once the form successfully submits, we swap the view to the Score Card
  const handleScoreSuccess = (data: FarmerScoreResponse['data'], farmerProfile: FarmerProfile) => {
    setScoreData(data);
    setProfile(farmerProfile);
  };

  const handleReset = () => {
    setScoreData(null);
    setProfile(null);
  };

  const handleShare = () => {
    if (!scoreData) return;
    const message = `Hi! My AgriFinance credit grade is ${scoreData.grade} (Score: ${scoreData.credit_score}/100). I'm eligible for a $${scoreData.loan_recommendation} micro-loan upgrade! 🌿`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  const handleDownload = () => {
    if (!scoreData || !profile) return;
    const gradeColor = scoreData.grade === 'A' ? '#2D6A4F' : ['B', 'C'].includes(scoreData.grade) ? '#b45309' : '#dc2626';
    const riskDots = Array.from({ length: 10 }, (_, i) =>
      `<span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${i < scoreData.climate_risk_score ? '#f59e0b' : '#e5e7eb'};margin:0 2px;"></span>`
    ).join('');
    const positiveList = scoreData.positive_factors.map((f: string) => `<li style="margin-bottom:6px;">✅ ${f}</li>`).join('');
    const riskList = scoreData.risk_factors.map((f: string) => `<li style="margin-bottom:6px;">⚠️ ${f}</li>`).join('');
    const tipsList = scoreData.green_tips.map((tip: string) => `<li style="margin-bottom:8px;">🌱 ${tip}</li>`).join('');
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AgriFinance AI Credit Report – ${profile.name}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0fdf4; margin: 0; padding: 40px 20px; color: #1e293b; }
    .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,.08); max-width: 700px; margin: 0 auto; overflow: hidden; }
    .header { background: #2D6A4F; color: #fff; padding: 32px 40px; }
    .header h1 { margin: 0 0 4px; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; }
    .header p { margin: 0; opacity: .8; font-size: 14px; }
    .grade-row { display: flex; align-items: center; gap: 24px; padding: 28px 40px; border-bottom: 1px solid #e5e7eb; }
    .grade-badge { font-size: 72px; font-weight: 900; color: ${gradeColor}; line-height: 1; }
    .grade-info h2 { margin: 0 0 4px; font-size: 16px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }
    .grade-info .score { font-size: 36px; font-weight: 800; color: #1e293b; }
    .section { padding: 24px 40px; border-bottom: 1px solid #e5e7eb; }
    .section h3 { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280; margin: 0 0 12px; }
    .section p { margin: 0; line-height: 1.7; font-size: 15px; color: #374151; }
    .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    ul { margin: 0; padding-left: 0; list-style: none; font-size: 14px; color: #374151; }
    .loan-box { background: #ecfdf5; border: 2px solid #6ee7b7; border-radius: 12px; padding: 20px 24px; margin-top: 8px; }
    .loan-box .amount { font-size: 28px; font-weight: 900; color: #2D6A4F; }
    .risk-dots { margin-top: 8px; }
    .footer { padding: 20px 40px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>AgriFinance AI – Credit Report</h1>
      <p>Farmer: ${profile.name} &nbsp;|&nbsp; ${profile.location} &nbsp;|&nbsp; ${profile.phoneNumber}</p>
      <p>Generated: ${new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</p>
    </div>
    <div class="grade-row">
      <div class="grade-badge">${scoreData.grade}</div>
      <div class="grade-info">
        <h2>Credit Grade</h2>
        <div class="score">${scoreData.credit_score}<span style="font-size:20px;color:#9ca3af">/100</span></div>
        <div style="margin-top:8px;"><span style="font-size:13px;color:#92400e;font-weight:700;">Climate Risk:</span> <span class="risk-dots">${riskDots}</span> ${scoreData.climate_risk_score}/10</div>
      </div>
    </div>
    <div class="section">
      <h3>AI Analysis</h3>
      <p>${scoreData.explanation}</p>
    </div>
    <div class="section cols">
      <div>
        <h3>Positive Factors</h3>
        <ul>${positiveList}</ul>
      </div>
      <div>
        <h3>Risk Factors</h3>
        <ul>${riskList}</ul>
      </div>
    </div>
    <div class="section">
      <h3>Loan Recommendation</h3>
      <div class="loan-box"><div class="amount">${scoreData.loan_recommendation}</div><p style="margin-top:4px;font-size:13px;color:#065f46;">Recommended micro-loan amount based on your credit profile</p></div>
    </div>
    <div class="section">
      <h3>Green Farming Tips</h3>
      <ul>${tipsList}</ul>
    </div>
    <div class="footer">AgriFinance AI &mdash; Empowering smallholder farmers with fair access to credit &mdash; agri-finance-ai.vercel.app</div>
  </div>
</body>
</html>`;
    const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `AgriFinance-Report-${profile.name.replace(/\s+/g, '-')}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#2D6A4F] tracking-tight sm:text-5xl">
            {scoreData ? t('analysis_title') : t('join_title')}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {scoreData ? t('analysis_desc') : t('join_desc')}
          </p>
        </div>

        {/* Content Area */}
        {!scoreData ? (
          <div className="max-w-3xl mx-auto">
            <FarmerForm onScoreSuccess={handleScoreSuccess} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden text-slate-800 p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black text-[#2D6A4F] uppercase tracking-tight">
                    {t('credit_grade')}: <span className="text-5xl ml-2 font-black">{scoreData.grade}</span>
                  </h2>
                  <p className="text-gray-500 font-bold">{t('score')}: {scoreData.credit_score} / 100</p>
                </div>
                <div className="mt-6 md:mt-0 text-right bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="font-bold text-amber-900 text-sm mb-2">{t('climate_risk')}</p>
                  <div className="flex space-x-1 justify-end">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-3 w-3 rounded-full ${i < scoreData.climate_risk_score ? 'bg-amber-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-black text-amber-700 mt-2">{scoreData.climate_risk_score}/10</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Core Stats */}
                <div className="lg:col-span-4 space-y-6">
                  <ScoreCard score={scoreData.credit_score} grade={scoreData.grade} />
                  <ScoreBreakdownChart score={scoreData.credit_score} />
                  <SavingsTracker />
                  <ImprovementSimulator 
                    currentScore={scoreData.credit_score} 
                    hasIrrigation={!!profile?.hasIrrigation} 
                    hasPriorLoan={!!profile?.hasPriorLoan} 
                  />
                </div>

                {/* Right Column: Analysis and Recommendations */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white p-8 rounded-2xl border-2 border-green-50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <span className="text-9xl">📋</span>
                    </div>
                    <h3 className="text-xl font-black mb-6 text-slate-800 flex items-center">
                      <span className="bg-[#2D6A4F] text-white p-1 rounded mr-3 text-sm">AI</span>
                      {t('our_analysis')}
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed font-medium mb-8">
                      {scoreData.explanation}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-green-50/50 p-5 rounded-xl border border-green-100">
                        <h4 className="font-black text-[#2D6A4F] mb-4 flex items-center text-sm uppercase tracking-wider">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          {t('positive_factors')}
                        </h4>
                        <ul className="space-y-3">
                          {scoreData.positive_factors.map((factor: string, i: number) => (
                            <li key={i} className="flex items-start text-xs font-bold text-slate-700">
                              <span className="text-green-500 mr-2">•</span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50/50 p-5 rounded-xl border border-red-100">
                        <h4 className="font-black text-red-800 mb-4 flex items-center text-sm uppercase tracking-wider">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                          {t('risk_factors')}
                        </h4>
                        <ul className="space-y-3">
                          {scoreData.risk_factors.map((factor: string, i: number) => (
                            <li key={i} className="flex items-start text-xs font-bold text-slate-700">
                              <span className="text-red-400 mr-2">•</span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <LoanOffers recommendation={scoreData.loan_recommendation} />
                    <FinanceLiteracy />
                  </div>
                  
                  <GreenTips tips={scoreData.green_tips} />
                </div>
              </div>

              <div className="my-16 border-t border-dashed border-gray-200 pt-16">
                <h3 className="text-2xl font-black text-center text-slate-800 mb-4">{t('ussd_simulate')}</h3>
                <p className="text-md text-center text-gray-500 max-w-2xl mx-auto mb-10 font-medium">
                  {t('ussd_desc')}
                </p>
                <SMSSimulator score={scoreData.credit_score} loanAmt={scoreData.loan_recommendation} />
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 mt-12 gap-4">
                <button onClick={handleReset} className="text-[#2D6A4F] font-black hover:underline uppercase tracking-wider text-sm">
                  &larr; {t('start_over')}
                </button>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] font-black py-4 px-8 rounded-xl transition-all shadow-sm hover:bg-green-50 transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download Report
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full sm:w-auto bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black py-4 px-10 rounded-xl transition-all shadow-lg transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-sm"
                  >
                    {t('share_sms')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
