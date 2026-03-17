'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState<any[]>([]);
  const [filterRegion, setFilterRegion] = useState('');
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const MOCK_FARMERS = [
    { id: '1', name: 'Amina Bello', location: 'Kano, Nigeria', primary_crop: 'Maize', credit_grade: 'A', credit_score: 88, climate_risk_score: 3 },
    { id: '2', name: 'Kofi Mensah', location: 'Kumasi, Ghana', primary_crop: 'Cocoa', credit_grade: 'B', credit_score: 74, climate_risk_score: 5 },
    { id: '3', name: 'John Kamau', location: 'Nakuru, Kenya', primary_crop: 'Coffee', credit_grade: 'C', credit_score: 62, climate_risk_score: 7 },
    { id: '4', name: 'Zainab Jallow', location: 'Banjul, Gambia', primary_crop: 'Groundnuts', credit_grade: 'A', credit_score: 92, climate_risk_score: 2 },
  ];

  useEffect(() => {
    if (!supabase) {
      setFarmers(MOCK_FARMERS);
      setLoading(false);
      return;
    }

    async function fetchFarmers() {
      setLoading(true);
      const { data, error } = supabase 
        ? await supabase.from('farmers').select('*').order('created_at', { ascending: false })
        : { data: null, error: null };

      if (error) {
        console.error('Error fetching farmers:', error);
        setFarmers(MOCK_FARMERS);
      } else {
        setFarmers(data && data.length > 0 ? data : MOCK_FARMERS);
      }
      setLoading(false);
    }

    fetchFarmers();
  }, [supabase]);

  const filteredFarmers = filterRegion 
    ? farmers.filter((f: any) => f.location?.toLowerCase().includes(filterRegion.toLowerCase()))
    : farmers;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2D6A4F]">Lender Portal</h1>
            <p className="text-gray-500 mt-1">Review AI-scored farmer profiles for loan matching.</p>
          </div>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 flex items-center">
             Export to CSV 📊
          </button>
        </header>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
             <div className="flex space-x-4">
                <input 
                  type="text" 
                  placeholder="Filter by region (e.g. Kano)" 
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-64 focus:outline-none focus:border-[#2D6A4F]"
                />
             </div>
             <p className="text-sm text-gray-500">Showing {filteredFarmers.length} profiles</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-100/50 text-gray-600 text-sm">
                  <th className="p-4 font-semibold uppercase tracking-wider">Farmer</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Location</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Crop</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Credit Score</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Climate Risk</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-right">Action</th>
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
                      <button className="text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-sm">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
          
          {filteredFarmers.length === 0 && (
            <div className="p-8 text-center text-gray-500">No farmers found matching your criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}
