'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { type User } from '@supabase/supabase-js';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const navLinks = [
    { href: '/onboard', label: t('onboarding') },
    { href: '/admin', label: 'Farmer Records' },
    { href: '/bank', label: 'Loan Approvals' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[#2D6A4F] flex items-center shrink-0">
            {t('app_name')}
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-6">
            {/* Language toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg space-x-1 items-center">
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

            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] transition-colors">
                {link.label}
              </Link>
            ))}

            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500 hidden md:block">{user.phone}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                  {t('sign_out')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile: language toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-lg space-x-1 items-center">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-white text-[#2D6A4F] shadow-sm' : 'text-gray-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ha')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${language === 'ha' ? 'bg-white text-[#2D6A4F] shadow-sm' : 'text-gray-500'}`}
              >
                HA
              </button>
            </div>
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              className="p-2 rounded-md text-gray-600 hover:text-[#2D6A4F] hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <div className="pt-2 border-t border-gray-100">
                <span className="block px-3 py-1 text-xs text-gray-500">{user.phone}</span>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  {t('sign_out')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
