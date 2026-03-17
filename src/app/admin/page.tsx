'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FarmerDB } from '@/types/farmer';
import { useLanguage } from '@/contexts/LanguageContext';

const MOCK_FARMERS: FarmerDB[] = [
  { id: '1', name: 'Musa Ibrahim', location: 'Gusau, Zamfara', primary_crop: 'Cotton', credit_grade: 'A', credit_score: 88, climate_risk_score: 3, phone_number: '', farm_size_acres: 0, farming_method: '', estimated_yield_kg: 0, years_experience: 0, has_irrigation: false, has_prior_loan: false },
  { id: '2', name: 'Bello Hassan', location: 'Tsafe, Zamfara', primary_crop: 'Beans', credit_grade: 'B', credit_score: 74, climate_risk_score: 5, phone_number: '', farm_size_acres: 0, farming_method: '', estimated_yield_kg: 0, years_experience: 0, has_irrigation: false, has_prior_loan: false },
  { id: '3', name: 'Zainab Umar', location: 'Kauran Namoda, Zamfara', primary_crop: 'Sorghum', credit_grade: 'C', credit_score: 62, climate_risk_score: 7, phone_number: '', farm_size_acres: 0, farming_method: '', estimated_yield_kg: 0, years_experience: 0, has_irrigation: false, has_prior_loan: false },
  { id: '4', name: 'Aliyu Danjuma', location: 'Talata Mafara, Zamfara', primary_crop: 'Rice', credit_grade: 'A', credit_score: 92, climate_risk_score: 2, phone_number: '', farm_size_acres: 0, farming_method: '', estimated_yield_kg: 0, years_experience: 0, has_irrigation: false, has_prior_loan: false },
];

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState<FarmerDB[]>([]);
  const [filterRegion, setFilterRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const supabase = createClient();

  useEffect(() => {
    if (!supabase) {
      setFarmers(MOCK_FARMERS);
      setLoading(false);
      return;
    }

    async function fetchFarmers() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('farmers').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setFarmers(data && data.length > 0 ? (data as unknown as FarmerDB[]) : MOCK_FARMERS);
      } catch (error) {
        console.error('Error fetching farmers:', error);
        setFarmers(MOCK_FARMERS);
      }
      setLoading(false);
    }

    fetchFarmers();
  }, [supabase]);

  const [selectedFarmer, setSelectedFarmer] = useState<FarmerDB | null>(null);

  const filteredFarmers = filterRegion 
    ? farmers.filter((f) => f.location?.toLowerCase().includes(filterRegion.toLowerCase()))
    : farmers;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Detail Modal Overlay */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-[#2D6A4F] p-6 text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{selectedFarmer.name}</h2>
                    <p className="text-green-100 text-sm font-medium">{selectedFarmer.location}</p>
                 </div>
                 <button onClick={() => setSelectedFarmer(null)} className="text-3xl hover:text-red-200 transition-colors">×</button>
              </div>
              <div className="p-8 grid grid-cols-2 gap-8 text-slate-800">
                 <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('modal_farm_details')}</p>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                       <p className="font-bold flex justify-between"><span className="text-gray-500">{t('table_crop')}:</span> <span>{selectedFarmer.primary_crop}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Method:</span> <span>Mechanized</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Experience:</span> <span>5 Years</span></p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('modal_credit_health')}</p>
                    <div className="bg-amber-50 p-4 rounded-xl space-y-2">
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Grade:</span> <span className="text-green-700">{selectedFarmer.credit_grade}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Score:</span> <span>{selectedFarmer.credit_score}/100</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Lender Match:</span> <span>Babban Gona</span></p>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
                 <button className="bg-[#2D6A4F] text-white px-8 py-3 rounded-lg font-black uppercase text-sm shadow hover:bg-[#1b4332] transition-colors">{t('approve_loan')}</button>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2D6A4F]">{t('admin_title')}</h1>
            <p className="text-gray-500 mt-1 font-medium italic">{t('admin_subtitle')}</p>
          </div>
          <div className="flex space-x-3">
             <button className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-xs font-bold hover:bg-gray-50 flex items-center uppercase tracking-wider transition-all text-slate-800">
                {t('export_csv')}
             </button>
          </div>
        </header>

        {/* Importance Banner */}
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-inner mb-10 flex items-start space-x-4 border-l-8 border-green-800">
           <span className="text-4xl text-white">💡</span>
           <div>
              <h3 className="font-black text-lg mb-1 uppercase tracking-tight">{t('why_matters_title')}</h3>
              <p className="text-green-50 text-sm leading-relaxed font-medium">
                 {t('why_matters_desc')}
              </p>
           </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
             <div className="flex space-x-4">
                <input 
                  type="text" 
                  placeholder={t('filter_region')} 
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-64 focus:outline-none focus:border-[#2D6A4F] text-slate-800"
                />
             </div>
             <p className="text-sm text-gray-500">{t('showing_profiles').replace('{count}', filteredFarmers.length.toString())}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-100/50 text-gray-600 text-sm">
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_farmer')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_location')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_crop')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_score')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_risk')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-right">{t('table_action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                      Loading farmer database...
                    </td>
                  </tr>
                ) : filteredFarmers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No farmers found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredFarmers.map(farmer => (
                    <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{farmer.name}</td>
                      <td className="p-4 text-gray-500">{farmer.location || 'Unknown'}</td>
                      <td className="p-4 text-gray-500">{farmer.primary_crop}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                          ${farmer.credit_grade === 'A' ? 'bg-green-100 text-green-800' : 
                            ['B', 'C'].includes(farmer.credit_grade) ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {farmer.credit_grade} ({farmer.credit_score})
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(farmer.climate_risk_score || 0) * 10}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-500">{farmer.climate_risk_score}/10</span>
                        </div>
                      </td>
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
