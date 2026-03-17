'use client';

import React, { useState } from 'react';
import { FarmerProfile, FarmerScoreResponse } from '../types/farmer';
import { useLanguage } from '../contexts/LanguageContext';

interface FarmerFormProps {
  onScoreSuccess: (data: FarmerScoreResponse['data'], profile: FarmerProfile) => void;
}

export default function FarmerForm({ onScoreSuccess }: FarmerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { t, language } = useLanguage();

  // Default state matches our FarmerProfile
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phoneNumber: '',
    farmSizeAcres: '',
    primaryCrop: '',
    farmingMethod: 'Traditional',
    estimatedYieldKg: '',
    yearsExperience: '',
    hasIrrigation: false,
    hasPriorLoan: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return t('error_name');
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8) return t('error_phone');
    if (!formData.location.trim()) return t('error_location');
    if (!formData.primaryCrop.trim()) return t('error_crop');
    if (!formData.farmSizeAcres || Number(formData.farmSizeAcres) <= 0) return t('error_size');
    if (!formData.estimatedYieldKg || Number(formData.estimatedYieldKg) <= 0) return t('error_yield');
    if (!formData.yearsExperience || Number(formData.yearsExperience) < 0) return t('error_experience');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Build strongly typed profile
      const profile: FarmerProfile = {
        name: formData.name,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        farmSizeAcres: Number(formData.farmSizeAcres),
        primaryCrop: formData.primaryCrop,
        farmingMethod: formData.farmingMethod,
        estimatedYieldKg: Number(formData.estimatedYieldKg),
        yearsExperience: Number(formData.yearsExperience),
        hasIrrigation: formData.hasIrrigation,
        hasPriorLoan: formData.hasPriorLoan,
      };

      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          language: language // Pass language context for deep localization
        }),
      });

      const data = await res.json() as FarmerScoreResponse;

      if (!res.ok || !data.success) {
        throw new Error(data.error || t('error_failed'));
      }

      // Pass the successful score and profile up to the parent page
      onScoreSuccess(data.data, profile);

    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : t('error_unexpected');
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl text-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#2D6A4F]">{t('app_name')} - {t('onboarding')}</h2>
      <p className="text-gray-600 mb-6 font-medium">{t('join_desc')}</p>
      
      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">{t('full_name')}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder={t('full_name_placeholder')} />
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-1">{t('mobile_number')}</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder="+234..." />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-semibold mb-1">{t('region')}</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder="e.g., Kano" />
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Farm Data */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="primaryCrop" className="block text-sm font-semibold mb-1">{t('primary_crop')}</label>
              <input type="text" id="primaryCrop" name="primaryCrop" value={formData.primaryCrop} onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="Maize" />
            </div>
            
            <div>
              <label htmlFor="farmSizeAcres" className="block text-sm font-semibold mb-1">{t('farm_size')}</label>
              <input type="number" id="farmSizeAcres" name="farmSizeAcres" value={formData.farmSizeAcres} onChange={handleChange} min="0" step="0.1"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="0.0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="estimatedYieldKg" className="block text-sm font-semibold mb-1">{t('est_yield')}</label>
              <input type="number" id="estimatedYieldKg" name="estimatedYieldKg" value={formData.estimatedYieldKg} onChange={handleChange} min="0"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="0" />
            </div>
            
            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-semibold mb-1">{t('years_farming')}</label>
              <input type="number" id="yearsExperience" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} min="0"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="0" />
            </div>
          </div>

          <div>
             <label htmlFor="farmingMethod" className="block text-sm font-semibold mb-1">{t('farming_method')}</label>
             <select id="farmingMethod" name="farmingMethod" value={formData.farmingMethod} onChange={handleChange} 
               className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-white text-sm">
                <option value="Traditional">Traditional / Na Iyaye</option>
                <option value="Mechanized">Mechanized / Na Zamani</option>
                <option value="Mixed">Mixed / Gauraye</option>
             </select>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Boolean Flags */}
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition-colors">
            <input type="checkbox" name="hasIrrigation" checked={formData.hasIrrigation} onChange={handleChange}
              className="w-5 h-5 text-[#2D6A4F] border-gray-300 rounded focus:ring-[#2D6A4F]" />
            <span className="text-xs font-bold leading-tight">{t('irrigation_check')}</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition-colors">
            <input type="checkbox" name="hasPriorLoan" checked={formData.hasPriorLoan} onChange={handleChange}
              className="w-5 h-5 text-[#2D6A4F] border-gray-300 rounded focus:ring-[#2D6A4F]" />
            <span className="text-xs font-bold leading-tight">{t('loan_check')}</span>
          </label>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-6 bg-[#2D6A4F] text-white font-black py-4 px-4 rounded-xl hover:bg-[#1B4332] transition-colors focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center uppercase tracking-widest text-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{t('analyzing')}</span>
            </span>
          ) : (
            t('generate_score')
          )}
        </button>
      </form>
    </div>
  );
}
