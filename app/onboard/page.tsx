'use client';

import React, { useState } from 'react';
import FarmerForm from '../../components/FarmerForm';
import { ScoreCard } from '../../components/ScoreCard';
import { ScoreBreakdownChart } from '../../components/ScoreBreakdownChart';
import { LoanOffers } from '../../components/LoanOffers';
import { GreenTips } from '../../components/GreenTips';
import { SMSSimulator } from '../../components/SMSSimulator';
import ImprovementSimulator from '../../components/ImprovementSimulator';
import { FarmerProfile, FarmerScoreResponse } from '../../types/farmer';

export default function OnboardPage() {
  const [scoreData, setScoreData] = useState<FarmerScoreResponse['data'] | null>(null);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);

  // Once the form successfully submits, we swap the view to the Score Card
  const handleScoreSuccess = (data: FarmerScoreResponse['data'], farmerProfile: FarmerProfile) => {
    setScoreData(data);
    setProfile(farmerProfile);
  };

  const handleReset = () => {
    setScoreData(null);
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#2D6A4F] tracking-tight sm:text-5xl">
            {scoreData ? 'Your Farm Analysis' : 'Join AgriFinance'}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {scoreData
              ? 'We have generated your AI-powered credit profile.'
              : 'Enter your farm details below to see what loan products you qualify for.'}
          </p>
        </div>

        {/* Content Area */}
        {!scoreData ? (
          <FarmerForm onScoreSuccess={handleScoreSuccess} />
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-slate-800 p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2D6A4F]">Credit Grade: <span className="text-3xl ml-2">{scoreData.grade}</span></h2>
                <p className="text-gray-500">Score: {scoreData.credit_score} / 100</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-semibold">Climate Risk Level</p>
                <div className="flex space-x-1 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-4 rounded ${i < scoreData.climate_risk_score ? 'bg-amber-400' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">{scoreData.climate_risk_score}/10</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
                    <div className="grid grid-cols-1 gap-6">
                      <ScoreCard score={scoreData.credit_score} grade={scoreData.grade} />
                      <ScoreBreakdownChart score={scoreData.credit_score} />
                      <ImprovementSimulator 
                        currentScore={scoreData.credit_score} 
                        hasIrrigation={!!profile?.hasIrrigation} 
                        hasPriorLoan={!!profile?.hasPriorLoan} 
                      />
                    </div>
              

              <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-slate-800">Our Analysis</h3>
                  <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-md border border-green-100 italic">
                    {scoreData.explanation}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Positive Factors
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                        {scoreData.positive_factors.map((factor, i) => <li key={i}>{factor}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-2 flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Risk Factors
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                        {scoreData.risk_factors.map((factor, i) => <li key={i}>{factor}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <LoanOffers recommendation={scoreData.loan_recommendation} />
                
                <GreenTips tips={scoreData.green_tips} />
              </div>
            </div>

            <div className="my-10">
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Simulate USSD / SMS Flow</h3>
              <p className="text-sm text-center text-gray-500 max-w-lg mx-auto mb-6">
                See how a farmer on a 2G connection without smartphone access receives their credit decision.
              </p>
              <SMSSimulator score={scoreData.credit_score} loanAmt={scoreData.loan_recommendation} />
            </div>

            <div className="pt-6 flex justify-between items-center border-t border-gray-200 mt-8">
              <button onClick={handleReset} className="text-[#2D6A4F] font-medium hover:underline">
                &larr; Start Over
              </button>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-sm">
                Share via SMS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
