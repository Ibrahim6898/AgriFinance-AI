'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FarmerDB } from '@/types/farmer';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const MOCK_FARMERS: FarmerDB[] = [
  // 1. Anka
  { id: '1', name: 'Hamisu Anka', location: 'Anka, Zamfara', primary_crop: 'Cotton', credit_grade: 'A', credit_score: 85, climate_risk_score: 4, phone_number: '08031234001', farm_size_acres: 5, farming_method: 'Mechanized', estimated_yield_kg: 2200, years_experience: 10, has_irrigation: true, has_prior_loan: true, assigned_lender: 'Babban Gona', loan_status: 'pending' },
  // 2. Bakura
  { id: '2', name: 'Fadila Bakura', location: 'Bakura, Zamfara', primary_crop: 'Groundnut', credit_grade: 'B', credit_score: 72, climate_risk_score: 6, phone_number: '08031234002', farm_size_acres: 3, farming_method: 'Traditional', estimated_yield_kg: 900, years_experience: 6, has_irrigation: false, has_prior_loan: true, assigned_lender: 'Sterling Bank (Sabadi)', loan_status: 'pending' },
  // 3. Birnin Magaji
  { id: '3', name: 'Usman Birnin', location: 'Birnin Magaji, Zamfara', primary_crop: 'Millet', credit_grade: 'C', credit_score: 61, climate_risk_score: 7, phone_number: '08031234003', farm_size_acres: 2, farming_method: 'Traditional', estimated_yield_kg: 600, years_experience: 4, has_irrigation: false, has_prior_loan: false, assigned_lender: 'Babban Gona', loan_status: 'pending' },
  // 4. Bukkuyum
  { id: '4', name: 'Maryam Buk', location: 'Bukkuyum, Zamfara', primary_crop: 'Cowpea', credit_grade: 'B', credit_score: 76, climate_risk_score: 5, phone_number: '08031234004', farm_size_acres: 4, farming_method: 'Mixed', estimated_yield_kg: 1100, years_experience: 8, has_irrigation: false, has_prior_loan: true, assigned_lender: 'Sterling Bank (Sabadi)', loan_status: 'approved' },
  // 5. Bungudu
  { id: '5', name: 'Sani Bungudu', location: 'Bungudu, Zamfara', primary_crop: 'Sorghum', credit_grade: 'A', credit_score: 91, climate_risk_score: 2, phone_number: '08031234005', farm_size_acres: 8, farming_method: 'Mechanized', estimated_yield_kg: 3500, years_experience: 15, has_irrigation: true, has_prior_loan: true, assigned_lender: 'Babban Gona', loan_status: 'approved' },
  // 6. Gummi
  { id: '6', name: 'Hauwa Gummi', location: 'Gummi, Zamfara', primary_crop: 'Rice', credit_grade: 'B', credit_score: 78, climate_risk_score: 4, phone_number: '08031234006', farm_size_acres: 5, farming_method: 'Mixed', estimated_yield_kg: 1800, years_experience: 9, has_irrigation: true, has_prior_loan: false, assigned_lender: 'Babban Gona', loan_status: 'pending' },
  // 7. Gusau
  { id: '7', name: 'Aliyu Danjuma', location: 'Gusau, Zamfara', primary_crop: 'Maize', credit_grade: 'A', credit_score: 94, climate_risk_score: 2, phone_number: '08031234007', farm_size_acres: 10, farming_method: 'Mechanized', estimated_yield_kg: 4200, years_experience: 18, has_irrigation: true, has_prior_loan: true, assigned_lender: 'Sterling Bank (Sabadi)', loan_status: 'approved' },
  // 8. Kauran Namoda
  { id: '8', name: 'Zainab Kauran', location: 'Kauran Namoda, Zamfara', primary_crop: 'Soybeans', credit_grade: 'C', credit_score: 63, climate_risk_score: 7, phone_number: '08031234008', farm_size_acres: 2.5, farming_method: 'Traditional', estimated_yield_kg: 700, years_experience: 5, has_irrigation: false, has_prior_loan: false, assigned_lender: 'Babban Gona', loan_status: 'pending' },
  // 9. Maradun
  { id: '9', name: 'Bello Maradun', location: 'Maradun, Zamfara', primary_crop: 'Cotton', credit_grade: 'B', credit_score: 80, climate_risk_score: 5, phone_number: '08031234009', farm_size_acres: 6, farming_method: 'Mixed', estimated_yield_kg: 2000, years_experience: 11, has_irrigation: false, has_prior_loan: true, assigned_lender: 'Sterling Bank (Sabadi)', loan_status: 'pending' },
  // 10. Maru
  { id: '10', name: 'Aisha Maru', location: 'Maru, Zamfara', primary_crop: 'Groundnut', credit_grade: 'D', credit_score: 48, climate_risk_score: 9, phone_number: '08031234010', farm_size_acres: 1.5, farming_method: 'Traditional', estimated_yield_kg: 350, years_experience: 2, has_irrigation: false, has_prior_loan: false, assigned_lender: 'Babban Gona', loan_status: 'pending' },
  // 11. Shinkafi
  { id: '11', name: 'Ibrahim Shinkafi', location: 'Shinkafi, Zamfara', primary_crop: 'Millet', credit_grade: 'C', credit_score: 65, climate_risk_score: 6, phone_number: '08031234011', farm_size_acres: 3, farming_method: 'Traditional', estimated_yield_kg: 850, years_experience: 7, has_irrigation: false, has_prior_loan: false, assigned_lender: 'Sterling Bank (Sabadi)', loan_status: 'pending' },
  // 12. Talata Mafara
  { id: '12', name: 'Ramatu Talata', location: 'Talata Mafara, Zamfara', primary_crop: 'Rice', credit_grade: 'A', credit_score: 89, climate_risk_score: 3, phone_number: '08031234012', farm_size_acres: 7, farming_method: 'Mechanized', estimated_yield_kg: 3100, years_experience: 14, has_irrigation: true, has_prior_loan: true, assigned_lender: 'Babban Gona', loan_status: 'approved' },
  // 13. Tsafe
  { id: '13', name: 'Musa Tsafe', location: 'Tsafe, Zamfara', primary_crop: 'Sorghum', credit_grade: 'B', credit_score: 74, climate_risk_score: 5, phone_number: '08031234013', farm_size_acres: 4, farming_method: 'Mixed', estimated_yield_kg: 1400, years_experience: 9, has_irrigation: false, has_prior_loan: true, assigned_lender: 'Sterling Bank (Sabadi)', loan_status: 'pending' },
  // 14. Zurmi
  { id: '14', name: 'Hadiza Zurmi', location: 'Zurmi, Zamfara', primary_crop: 'Cowpea', credit_grade: 'C', credit_score: 59, climate_risk_score: 8, phone_number: '08031234014', farm_size_acres: 2, farming_method: 'Traditional', estimated_yield_kg: 500, years_experience: 3, has_irrigation: false, has_prior_loan: false, assigned_lender: 'Babban Gona', loan_status: 'pending' },
];

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState<FarmerDB[]>([]);
  const [filterRegion, setFilterRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const exportCSV = () => {
    const headers = ['Name', 'Location', 'Crop', 'Credit Grade', 'Credit Score', 'Climate Risk', 'Assigned Lender', 'Loan Status'];
    const rows = filteredFarmers.map((f: FarmerDB) => [
      f.name,
      f.location || '',
      f.primary_crop,
      f.credit_grade,
      String(f.credit_score),
      String(f.climate_risk_score),
      f.assigned_lender || '',
      f.loan_status || 'pending',
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map((v: string) => `"${v.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `agrifinance-farmers-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const supabase = createClient();

  const fetchFarmers = useCallback(async () => {
    if (!supabase) {
      console.warn('Supabase client unavailable, using mock data.');
      setFarmers(MOCK_FARMERS);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from('farmers').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      const fetchedData = data ? (data as unknown as FarmerDB[]) : [];
      setFarmers(fetchedData.length > 0 ? fetchedData : MOCK_FARMERS);
    } catch (err) {
      console.error('Error fetching farmers:', err);
      setFarmers(MOCK_FARMERS);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchFarmers();

    if (!supabase) return;

    const channel = supabase
      .channel('farmers-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'farmers' }, () => {
        fetchFarmers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchFarmers, supabase]);

  const [selectedFarmer, setSelectedFarmer] = useState<FarmerDB | null>(null);

  const filteredFarmers = filterRegion 
    ? farmers.filter((f) => f.location?.toLowerCase().includes(filterRegion.toLowerCase()))
    : farmers;

  const gradeColorClass = (grade: string) => {
    if (grade === 'A') return 'bg-green-100 text-green-800';
    if (['B', 'C'].includes(grade)) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const statusColorClass = (status?: string) => {
    if (status === 'approved') return 'text-green-600';
    if (status === 'rejected') return 'text-red-600';
    return 'text-amber-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
      {/* Detail Modal Overlay */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-[#2D6A4F] p-6 text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{selectedFarmer.name}</h2>
                    <p className="text-green-100 text-sm font-medium">{selectedFarmer.location}</p>
                 </div>
                 <button onClick={() => setSelectedFarmer(null)} className="text-3xl hover:text-red-200 transition-colors leading-none">&times;</button>
              </div>
               <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-800">
                 <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('modal_farm_details')}</p>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                       <p className="font-bold flex justify-between"><span className="text-gray-500">{t('table_crop')}:</span> <span>{selectedFarmer.primary_crop}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Farm Size:</span> <span>{selectedFarmer.farm_size_acres} acres</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Method:</span> <span>{selectedFarmer.farming_method}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Experience:</span> <span>{selectedFarmer.years_experience} yrs</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Irrigation:</span> <span>{selectedFarmer.has_irrigation ? 'Yes ✓' : 'No'}</span></p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('modal_credit_health')}</p>
                    <div className="bg-amber-50 p-4 rounded-xl space-y-2 text-sm">
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Grade:</span> <span className={`font-black ${selectedFarmer.credit_grade === 'A' ? 'text-green-700' : ['B','C'].includes(selectedFarmer.credit_grade) ? 'text-amber-700' : 'text-red-700'}`}>{selectedFarmer.credit_grade}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Score:</span> <span>{selectedFarmer.credit_score}/100</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Climate Risk:</span> <span>{selectedFarmer.climate_risk_score}/10</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Assigned Lender:</span> <span className="font-black text-slate-800 text-right text-xs">{selectedFarmer.assigned_lender || 'Pending Match'}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Status:</span> <span className={`uppercase font-black ${statusColorClass(selectedFarmer.loan_status)}`}>{selectedFarmer.loan_status || 'Pending'}</span></p>
                    </div>
                 </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <Link href="/bank" className="text-sm font-bold text-[#2D6A4F] hover:underline">
                  → Review in Lender Portal
                </Link>
                <button onClick={() => setSelectedFarmer(null)} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors text-sm">
                  Close
                </button>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2D6A4F]">Farmer Records</h1>
            <p className="text-gray-500 mt-1 font-medium italic">{t('admin_subtitle')}</p>
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            <Link
              href="/bank"
              className="bg-[#2D6A4F] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] transition-colors shadow-sm"
            >
              → Lender Action Portal
            </Link>
             <button
               onClick={() => fetchFarmers()}
               disabled={loading}
               className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-xs font-bold hover:bg-gray-50 flex items-center uppercase tracking-wider transition-all text-slate-800 disabled:opacity-50"
             >
               {loading ? (
                 <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
               ) : '↻ '}
               Refresh
             </button>
             <button
               onClick={exportCSV}
               className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-xs font-bold hover:bg-gray-50 flex items-center uppercase tracking-wider transition-all text-slate-800"
             >
               ⬇ {t('export_csv')}
             </button>
          </div>
        </header>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Farmers', value: farmers.length, color: 'text-[#2D6A4F]' },
            { label: 'Grade A', value: farmers.filter(f => f.credit_grade === 'A').length, color: 'text-green-600' },
            { label: 'Approved Loans', value: farmers.filter(f => f.loan_status === 'approved').length, color: 'text-blue-600' },
            { label: 'LGAs Covered', value: new Set(farmers.map(f => f.location?.split(',')[0])).size, color: 'text-amber-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{stat.label}</p>
              <p className={`text-3xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Importance Banner */}
        <div className="bg-green-50 border border-green-200 text-slate-800 p-5 rounded-xl mb-8 flex items-start gap-4">
           <div className="text-2xl mt-0.5">💡</div>
           <div>
              <h3 className="font-black text-sm mb-1 text-[#2D6A4F] uppercase tracking-tight">{t('why_matters_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                 {t('why_matters_desc')}
              </p>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
             <input 
               type="text" 
               placeholder={t('filter_region')} 
               value={filterRegion}
               onChange={(e) => setFilterRegion(e.target.value)}
               className="px-3 py-2 border rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] text-slate-800"
             />
             <p className="text-sm text-gray-500 whitespace-nowrap">{t('showing_profiles').replace('{count}', filteredFarmers.length.toString())}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-100/50 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">{t('table_farmer')}</th>
                  <th className="p-4 font-semibold">{t('table_location')}</th>
                  <th className="p-4 font-semibold">{t('table_crop')}</th>
                  <th className="p-4 font-semibold">{t('table_score')}</th>
                  <th className="p-4 font-semibold">{t('table_risk')}</th>
                  <th className="p-4 font-semibold">Lender</th>
                  <th className="p-4 font-semibold text-right">{t('table_action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500 italic">
                      Loading farmer database...
                    </td>
                  </tr>
                ) : filteredFarmers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No farmers found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredFarmers.map(farmer => (
                    <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{farmer.name}</td>
                      <td className="p-4 text-gray-500 text-sm">{farmer.location || 'Unknown'}</td>
                      <td className="p-4 text-gray-500 text-sm">{farmer.primary_crop}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeColorClass(farmer.credit_grade)}`}>
                          {farmer.credit_grade} ({farmer.credit_score})
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(farmer.climate_risk_score || 0) * 10}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{farmer.climate_risk_score}/10</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-gray-600 font-medium">{farmer.assigned_lender || '—'}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setSelectedFarmer(farmer)}
                          className="text-[#2D6A4F] hover:text-[#1B4332] font-black uppercase tracking-wider text-xs border border-[#2D6A4F] px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
                        >
                          {t('view_details')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
