'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ha';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    app_name: 'AgriFinance AI',
    onboarding: 'Onboarding',
    lenders: 'Lenders',
    sign_in: 'Sign In',
    sign_out: 'Sign Out',
    join_title: 'Join AgriFinance',
    join_desc: 'Enter your farm details below to see what loan products you qualify for.',
    analysis_title: 'Your Farm Analysis',
    analysis_desc: 'We have generated your AI-powered credit profile.',
    credit_grade: 'Credit Grade',
    score: 'Score',
    climate_risk: 'Climate Risk Level',
    our_analysis: 'Our Analysis',
    positive_factors: 'Positive Factors',
    risk_factors: 'Risk Factors',
    ussd_simulate: 'Simulate USSD / SMS Flow',
    ussd_desc: 'See how a farmer on a 2G connection without smartphone access receives their credit decision.',
    start_over: 'Start Over',
    share_sms: 'Share via SMS',
    generate_score: 'Generate Credit Score',
    analyzing: 'Analyzing Farm Data...',
    full_name: 'Full Name',
    mobile_number: 'Mobile Number',
    region: 'Region / Location',
    primary_crop: 'Primary Crop',
    farm_size: 'Size (Acres)',
    est_yield: 'Est. Yield (Kg)',
    years_farming: 'Years Farming',
    farming_method: 'Farming Method',
    irrigation_check: 'I have access to reliable irrigation / water pump.',
    full_name_placeholder: 'e.g., Amina Bello',
    error_name: 'Please enter your full name.',
    error_phone: 'Please enter a valid phone number.',
    error_location: 'Please enter your location or region.',
    error_crop: 'Please enter your primary crop (e.g., Maize).',
    error_size: 'Please enter a valid farm size.',
    error_yield: 'Please enter a positive estimated yield.',
    error_experience: 'Please enter valid years of experience.',
    error_failed: 'Failed to analyze farm data',
    error_unexpected: 'An unexpected error occurred. Please try again.',
  },
  ha: {
    app_name: 'AgriFinance AI',
    onboarding: 'Shigarwa',
    lenders: 'Masu Ba da Rance',
    sign_in: 'Shiga',
    sign_out: 'Fita',
    join_title: 'Kasance da AgriFinance',
    join_desc: 'Shigar da bayanan gonar ku a kasa don ganin irin rancen da kuka cancanci samu.',
    analysis_title: 'Binciken Gonar Ku',
    analysis_desc: 'Mun samar da bayanan ku na bashi ta amfani da hankali na jabu (AI).',
    credit_grade: 'Matakin Bashi',
    score: 'Maki',
    climate_risk: 'Hadarin Yanayi',
    our_analysis: 'Binciken Mu',
    positive_factors: 'Abubuwa Masu Kyau',
    risk_factors: 'Abubuwan Hadari',
    ussd_simulate: 'Gwada USSD / SMS',
    ussd_desc: 'Ga yadda manomi mai amfani da tsohuwar waya (2G) yake samun sakamakon bashin sa.',
    start_over: 'Sake Farawa',
    share_sms: 'Aika ta SMS',
    generate_score: 'Samar da Makin Bashi',
    analyzing: 'Ana binciken bayanan gona...',
    full_name: 'Cikakken Suna',
    mobile_number: 'Lambar Wayar Hannu',
    region: 'Yanki / Wuri',
    primary_crop: 'Babban Amfanin Gona',
    farm_size: 'Fadin Gona (Acres)',
    est_yield: 'Yawan Amfanin Gona (Kg)',
    years_farming: 'Shekarun Noma',
    farming_method: 'Hanyar Noma',
    irrigation_check: 'Ina da damar yin amfani da ban-ruwan rani.',
    loan_check: 'Na taba karbar bashi kuma na biya a baya.',
    full_name_placeholder: 'Misali, Amina Bello',
    error_name: 'Da fatan za a shigar da cikakken sunan ku.',
    error_phone: 'Da fatan za a shigar da lambar waya mai aiki.',
    error_location: 'Da fatan za a shigar da yankin ku ko wurin ku.',
    error_crop: 'Da fatan za a shigar da babban amfanin gonar ku (misali, Masara).',
    error_size: 'Da fatan za a shigar da fadin gona mai inganci.',
    error_yield: 'Da fatan za a shigar da yawan amfani mai kyau.',
    error_experience: 'Da fatan za a shigar da shekarun gwaninta masu kyau.',
    error_failed: 'An gaza binciken bayanan gona',
    error_unexpected: 'An sami kuskuren da ba a zata ba. Da fatan za a sake gwadawa.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
