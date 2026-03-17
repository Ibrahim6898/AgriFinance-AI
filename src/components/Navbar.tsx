import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { type User } from '@supabase/supabase-js';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!supabase) return;

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#2D6A4F] flex items-center">
          <span className="mr-2">🚜</span>
          {t('app_name')}
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex bg-gray-100 p-1 rounded-md mr-2">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${language === 'en' ? 'bg-white text-[#2D6A4F] shadow-sm' : 'text-gray-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ha')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${language === 'ha' ? 'bg-white text-[#2D6A4F] shadow-sm' : 'text-gray-500'}`}
            >
              HA
            </button>
          </div>
          <Link href="/onboard" className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hidden sm:block">
            {t('onboarding')}
          </Link>
          <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hidden sm:block">
            {t('lenders')}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 hidden md:block">{user.phone}</span>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                {t('sign_out')}
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-[#2D6A4F] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#1B4332] transition-colors"
            >
              {t('sign_in')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
