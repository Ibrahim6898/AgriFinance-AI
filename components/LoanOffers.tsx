export function LoanOffers({ recommendation }: { recommendation: string }) {
  if (!recommendation) return null;

  const mockOffers = [
    { lender: 'Safaricom Agri', rate: '2.5%', type: 'Fertilizer Input Loan', amount: recommendation },
    { lender: 'RuralCoop', rate: '3.0%', type: 'Cash Micro-loan', amount: recommendation },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#2D6A4F] text-white p-4">
        <h3 className="font-bold">Matched Loan Products</h3>
        <p className="text-sm text-green-100">Based on your AI Credit Score</p>
      </div>
      <div className="divide-y divide-gray-100">
        {mockOffers.map((offer, i) => (
          <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div>
              <p className="font-bold text-gray-800">{offer.lender}</p>
              <p className="text-sm text-gray-500">{offer.type} &bull; {offer.rate} Interest</p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-medium text-sm transition-colors shadow-sm">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
