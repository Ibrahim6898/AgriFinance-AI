'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSimulatorMode, setIsSimulatorMode] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();
  const { t } = useLanguage();

  React.useEffect(() => {
    if (!supabase) {
      setIsSimulatorMode(true);
      setMessage('Demo Mode: Security services are offline. Using simulator (OTP: 123456).');
    }
  }, [supabase]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSimulatorMode) {
      setStep('otp');
      return;
    }
    if (!supabase) {
      setError('Connection to security services failed. Please try again later.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) {
      if (error.message.toLowerCase().includes('provider') || error.message.toLowerCase().includes('unsupported')) {
        // Switch to Simulator Mode for Hackathon Demo
        setIsSimulatorMode(true);
        setStep('otp');
        setMessage('Simulator Mode: Use "123456" as the OTP (SMS provider is currently disabled).');
      } else {
        setError(error.message);
      }
    } else {
      setStep('otp');
      setMessage('OTP sent! Please check your phone.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSimulatorMode) {
      if (otp === '123456') {
        localStorage.setItem('agrifinance_demo_user', JSON.stringify({ 
          id: 'demo-farmer-123', 
          phone: phoneNumber || '08012345678',
          user_metadata: { full_name: 'Demo Farmer' }
        }));
        router.push('/onboard');
      } else {
        setError('Invalid simulator OTP. Try "123456".');
      }
    } else {
      if (!supabase) {
        setError('Connection to security services failed. Please try again later.');
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/onboard');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-emerald-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Brand header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-black text-[#2D6A4F] tracking-tight">AgriFinance AI</span>
        </Link>
        <h2 className="mt-4 text-center text-2xl font-extrabold text-slate-800">
          {t('login_title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {t('login_subtitle')}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100 sm:px-10">
          {error && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          {step === 'phone' ? (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('login_phone_label')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder={t('login_phone_placeholder')}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] text-sm transition-shadow"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#2D6A4F] hover:bg-[#1B4332] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D6A4F] disabled:opacity-50 transition-colors uppercase tracking-wide"
              >
                {loading ? t('login_sending') : t('login_send_otp')}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-1">
                  {t('login_otp_label')}
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-[#2D6A4F] text-sm transition-shadow"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#2D6A4F] hover:bg-[#1B4332] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D6A4F] disabled:opacity-50 transition-colors uppercase tracking-wide"
              >
                {loading ? t('login_verifying') : t('login_verify')}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-sm font-medium text-[#2D6A4F] hover:text-[#1B4332] hover:underline transition-colors"
                >
                  {t('login_change_phone')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Back to home link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="font-medium text-[#2D6A4F] hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
