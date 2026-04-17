'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Page() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left order-2 lg:order-1">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#2D6A4F] mb-6 leading-tight">
            {t('app_name')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
            {t('home_tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/onboard"
              className="bg-[#2D6A4F] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#1B4332] transition-colors shadow-lg text-lg text-center"
            >
              {t('home_farmer_btn')}
            </Link>
            <Link
              href="/admin"
              className="bg-white text-[#2D6A4F] border-2 border-[#2D6A4F] px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-sm text-lg text-center"
            >
              {t('home_admin_btn')}
            </Link>
          </div>
        </div>

        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2">
          <Image
            src="/hero-image.png"
            alt="Farmer using digital agriculture technology"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
