'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!supabase) return;

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

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
          AgriFinance AI
        </Link>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/onboard" className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hidden sm:block">
            Onboarding
          </Link>
          <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-[#2D6A4F] hidden sm:block">
            Lenders
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 hidden md:block">{user.phone}</span>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-[#2D6A4F] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#1B4332] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
