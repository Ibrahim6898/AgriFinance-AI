'use client';

import React, { useState } from 'react';
import { FarmerProfile, FarmerScoreResponse } from '../types/farmer';

interface FarmerFormProps {
  onScoreSuccess: (data: FarmerScoreResponse['data']) => void;
}

export default function FarmerForm({ onScoreSuccess }: FarmerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8) return 'Please enter a valid phone number.';
    if (!formData.location.trim()) return 'Please enter your location or region.';
    if (!formData.primaryCrop.trim()) return 'Please enter your primary crop (e.g., Maize).';
    if (!formData.farmSizeAcres || Number(formData.farmSizeAcres) <= 0) return 'Please enter a valid farm size.';
    if (!formData.estimatedYieldKg || Number(formData.estimatedYieldKg) <= 0) return 'Please enter a positive estimated yield.';
    if (!formData.yearsExperience || Number(formData.yearsExperience) < 0) return 'Please enter valid years of experience.';
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
        body: JSON.stringify(profile),
      });

      const data = await res.json() as FarmerScoreResponse;

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze farm data');
      }

      // Pass the successful score up to the parent page
      onScoreSuccess(data.data);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl text-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#2D6A4F]">Farmer Profile</h2>
      <p className="text-gray-600 mb-6 font-medium">Please enter your farm details to get your credit matching score.</p>
      
      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder="e.g., Amina Bello" />
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-1">Mobile Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder="e.g., +234 800 000 0000" />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-semibold mb-1">Region / Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder="e.g., Kano State, Nigeria" />
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Farm Data */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="primaryCrop" className="block text-sm font-semibold mb-1">Primary Crop</label>
              <input type="text" id="primaryCrop" name="primaryCrop" value={formData.primaryCrop} onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="e.g., Sorghum" />
            </div>
            
            <div>
              <label htmlFor="farmSizeAcres" className="block text-sm font-semibold mb-1">Size (Acres)</label>
              <input type="number" id="farmSizeAcres" name="farmSizeAcres" value={formData.farmSizeAcres} onChange={handleChange} min="0" step="0.1"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="0.0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="estimatedYieldKg" className="block text-sm font-semibold mb-1">Est. Yield (Kg)</label>
              <input type="number" id="estimatedYieldKg" name="estimatedYieldKg" value={formData.estimatedYieldKg} onChange={handleChange} min="0"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="0" />
            </div>
            
            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-semibold mb-1">Years Farming</label>
              <input type="number" id="yearsExperience" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} min="0"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                placeholder="0" />
            </div>
          </div>

          <div>
             <label htmlFor="farmingMethod" className="block text-sm font-semibold mb-1">Farming Method</label>
             <select id="farmingMethod" name="farmingMethod" value={formData.farmingMethod} onChange={handleChange} 
               className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-white">
                <option value="Traditional">Traditional</option>
                <option value="Mechanized">Mechanized</option>
                <option value="Mixed">Mixed</option>
             </select>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Boolean Flags */}
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition-colors">
            <input type="checkbox" name="hasIrrigation" checked={formData.hasIrrigation} onChange={handleChange}
              className="w-5 h-5 text-[#2D6A4F] border-gray-300 rounded focus:ring-[#2D6A4F]" />
            <span className="text-sm font-medium">I have access to reliable irrigation / water pump.</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md transition-colors">
            <input type="checkbox" name="hasPriorLoan" checked={formData.hasPriorLoan} onChange={handleChange}
              className="w-5 h-5 text-[#2D6A4F] border-gray-300 rounded focus:ring-[#2D6A4F]" />
            <span className="text-sm font-medium">I have taken and repaid a farming loan in the past.</span>
          </label>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-6 bg-[#2D6A4F] text-white font-bold py-4 px-4 rounded-md hover:bg-[#1B4332] transition-colors focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing Farm Data...</span>
            </span>
          ) : (
            'Generate Credit Score'
          )}
        </button>
      </form>
    </div>
  );
}
