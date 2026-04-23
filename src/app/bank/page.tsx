'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { FarmerDB } from '@/types/farmer';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function BankDashboard() {
  const [farmers, setFarmers] = useState<FarmerDB[]>([]);
  const [currentBank, setCurrentBank] = useState('Babban Gona');
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const { t } = useLanguage();

  const supabase = createClient();

  const fetchFarmers = useCallback(async () => {
    if (!supabase) {
      console.warn('Supabase client unavailable, showing empty data.');
      setFarmers([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from('farmers').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setFarmers(data ? (data as unknown as FarmerDB[]) : []);
    } catch (err) {
      console.error('Error fetching farmers:', err);
      setFarmers([]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchFarmers();
    if (!supabase) return;

    const channel = supabase
      .channel('bank-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'farmers' }, () => {
        fetchFarmers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchFarmers, supabase]);

  const [selectedFarmer, setSelectedFarmer] = useState<FarmerDB | null>(null);

  const filteredFarmers = farmers.filter((f) => 
    (f.assigned_lender || '').toLowerCase() === currentBank.toLowerCase()
  );

  const handleApproveLoan = async () => {
    if (!selectedFarmer || !supabase) return;
    setApproving(true);

    try {
      // 1. Update Supabase
      const { error } = await supabase
        .from('farmers')
        .update({ loan_status: 'approved' })
        .eq('id', selectedFarmer.id);

      if (error) throw error;

      // 2. Dispatch Termii SMS
      const message = `AgriFinance: Congratulations! Your loan application for the ${selectedFarmer.primary_crop} season has been APPROVED by ${currentBank}. Please visit your local branch representative with your ID to disburse the funds.`;
      
      const smsRes = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: selectedFarmer.phone_number, message })
      });

      const smsData = await smsRes.json();
      if (!smsData.success && !smsData.mocked) {
         console.warn('SMS failed, but DB updated:', smsData);
      } else {
         alert('Loan Approved! SMS notification dispatched successfully limit via Termii.');
      }
      
      setSelectedFarmer(null);
      fetchFarmers();

    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve the loan. Please check console logs.');
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Detail Modal Overlay */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-[#1b4332] p-6 text-white flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{selectedFarmer.name}</h2>
                    <p className="text-green-100 text-sm font-medium">{selectedFarmer.location}</p>
                 </div>
                 <button onClick={() => !approving && setSelectedFarmer(null)} className="text-3xl hover:text-red-200 transition-colors">×</button>
              </div>
              <div className="p-8 grid grid-cols-2 gap-8 text-slate-800">
                 <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('modal_farm_details')}</p>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                       <p className="font-bold flex justify-between"><span className="text-gray-500">{t('table_crop')}:</span> <span>{selectedFarmer.primary_crop}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Method:</span> <span>Mechanized</span></p>
                       <p className="font-bold flex justify-between"><span className="text-gray-500">Experience:</span> <span>{selectedFarmer.years_experience} Years</span></p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('modal_credit_health')}</p>
                    <div className="bg-amber-50 p-4 rounded-xl space-y-2">
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Grade:</span> <span className="text-green-700">{selectedFarmer.credit_grade}</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Score:</span> <span>{selectedFarmer.credit_score}/100</span></p>
                       <p className="font-bold flex justify-between"><span className="text-amber-800">Status:</span> <span className="uppercase text-amber-700 font-black">{selectedFarmer.loan_status || 'Pending'}</span></p>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
                 <button 
                   onClick={handleApproveLoan}
                   disabled={approving || selectedFarmer.loan_status === 'approved'}
                   className="bg-[#2D6A4F] text-white px-8 py-3 rounded-lg font-black uppercase text-sm shadow hover:bg-[#1b4332] transition-colors disabled:opacity-50 flex items-center"
                 >
                   {approving ? 'Processing...' : (selectedFarmer.loan_status === 'approved' ? 'Already Approved' : `Approve & Notify`)}
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              <Link href="/admin" className="hover:text-[#2D6A4F] font-medium">← Farmer Records</Link>
            </p>
            <h1 className="text-3xl font-extrabold text-[#1B4332]">Lender Action Portal</h1>
            <p className="text-gray-500 mt-1 font-medium italic">Loan Underwriting &amp; Dispatch Dashboard</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
             <label className="text-sm font-bold text-slate-600">Viewing as:</label>
             <select 
               className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] bg-white"
               value={currentBank}
               onChange={e => setCurrentBank(e.target.value)}
             >
               <option value="Babban Gona">Babban Gona</option>
               <option value="Sterling Bank (Sabadi)">Sterling Bank (Sabadi)</option>
             </select>

             <button
               onClick={() => fetchFarmers()}
               disabled={loading}
               className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-xs font-bold hover:bg-gray-50 flex items-center uppercase tracking-wider transition-all text-slate-800 disabled:opacity-50"
             >
               Refresh
             </button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
             <p className="font-bold text-slate-800 uppercase tracking-tight text-sm">
                Applications routed to: <span className="text-[#2D6A4F]">{currentBank}</span>
             </p>
             <p className="text-sm text-gray-500">{filteredFarmers.length} Applications</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-100/50 text-gray-600 text-sm">
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_farmer')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_location')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">{t('table_score')}</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-right">{t('table_action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                      Loading matching applications...
                    </td>
                  </tr>
                ) : filteredFarmers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No applications currently routed to {currentBank}.
                    </td>
                  </tr>
                ) : (
                  filteredFarmers.map(farmer => (
                    <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{farmer.name}</td>
                      <td className="p-4 text-gray-500">{farmer.location || 'Unknown'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                          ${farmer.credit_grade === 'A' ? 'bg-green-100 text-green-800' : 
                            ['B', 'C'].includes(farmer.credit_grade) ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {farmer.credit_grade} ({farmer.credit_score})
                        </span>
                      </td>
                      <td className="p-4">
                         <span className={`uppercase font-black text-xs ${farmer.loan_status === 'approved' ? 'text-green-600' : 'text-amber-500'}`}>
                           {farmer.loan_status || 'Pending'}
                         </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setSelectedFarmer(farmer)}
                          className="text-[#2D6A4F] hover:text-[#1B4332] font-black uppercase tracking-wider text-xs border border-[#2D6A4F] px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
                        >
                          Review Application
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
