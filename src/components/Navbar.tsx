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
      if (session?.user) {
        setUser(session.user);
      } else {
        // Check for Demo Simulator User
        const demo = localStorage.getItem('agrifinance_demo_user');
        if (demo) setUser(JSON.parse(demo));
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        const demo = localStorage.getItem('agrifinance_demo_user');
        if (demo && _event !== 'SIGNED_OUT') {
           setUser(JSON.parse(demo));
        } else {
           setUser(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    localStorage.removeItem('agrifinance_demo_user');
    await supabase?.auth.signOut();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#2D6A4F] flex items-center">
          {t('app_name')}
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex bg-gray-100 p-1 rounded-lg mr-2 space-x-1 items-center">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-white text-[#2D6A4F] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ENG
            </button>
            <button 
              onClick={() => setLanguage('ha')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'ha' ? 'bg-white text-[#2D6A4F] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              HAU
            </button>
          </div>
          <Link href="/onboard" className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hidden sm:block">
            {t('onboarding')}
          </Link>
          <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hidden sm:block">
            {t('lenders')}
          </Link>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 hidden md:block">{user.phone}</span>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                {t('sign_out')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
