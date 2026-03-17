import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold text-[#2D6A4F] mb-6">AgriFinance AI</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Empowering smallholder farmers with access to fair micro-loans through AI-powered credit scoring based on real farming data, not just bank history.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/onboard" 
          className="bg-[#2D6A4F] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#1B4332] transition-colors shadow-lg text-lg text-center"
        >
          Farmer Onboarding
        </Link>
        <Link 
          href="/admin" 
          className="bg-white text-[#2D6A4F] border-2 border-[#2D6A4F] px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-sm text-lg text-center"
        >
          Admin Portal
        </Link>
      </div>
    </div>
  );
}
