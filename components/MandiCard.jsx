import { MapPin, TrendingUp, Truck, CircleDollarSign, BadgePercent, MoveDown } from 'lucide-react';

export default function MandiCard({ mandi }) {
  const isRecommended = mandi.rank === 1;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden mb-4 ${
        isRecommended
          ? 'bg-gradient-to-br from-brand-50 to-brand-100 border-2 border-brand-500 shadow-xl shadow-brand-500/20 ring-1 ring-brand-400'
          : 'bg-white border border-gray-200 shadow-md'
      }`}
    >
      {/* Recommended Ribbon */}
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
          <TrendingUp size={14} /> RECOMMENDED
        </div>
      )}

      {/* Rank Badge */}
      <div className="absolute top-3 left-3 bg-gray-900 text-white font-black text-sm w-7 h-7 flex items-center justify-center rounded-full z-10 shadow-sm">
        #{mandi.rank}
      </div>

      <div className="p-4 pl-12 pt-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{mandi.mandiName}</h3>
            <div className="flex items-center text-sm text-gray-500 gap-1 mt-0.5">
              <MapPin size={14} />
              {mandi.distanceKm} km away
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium tracking-wide">HEADLINE PRICE</p>
            <p className="font-semibold text-gray-400 line-through decoration-gray-400/50">
              ₹{mandi.headlinePrice}/qtl
            </p>
          </div>
        </div>

        <hr className="border-gray-200 my-3" />

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1"><Truck size={12} className="text-gray-400" /> Transport</span>
            <span className="font-medium text-red-500">-₹{mandi.transportCostPerQtl}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1"><BadgePercent size={12} className="text-gray-400" /> Market Fee</span>
            <span className="font-medium text-red-500">-₹{mandi.marketFeePerQtl}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1"><CircleDollarSign size={12} className="text-gray-400" /> Commission</span>
            <span className="font-medium text-red-500">-₹{mandi.commissionPerQtl}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1"><MoveDown size={12} className="text-gray-400" /> Loading</span>
            <span className="font-medium text-red-500">-₹{mandi.loadingChargePerQtl}</span>
          </div>
        </div>

        {/* Hero Number - Net Realization */}
        <div className={`rounded-xl p-3 flex justify-between items-center ${isRecommended ? 'bg-brand-600' : 'bg-gray-50'}`}>
          <div className={isRecommended ? 'text-brand-100' : 'text-gray-500'}>
            <p className="text-xs font-bold tracking-wider mb-0.5">NET REALIZATION</p>
            <p className="text-[10px] opacity-80">(After all costs)</p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-black ${isRecommended ? 'text-white' : 'text-gray-800'}`}>
              ₹{mandi.netPerQtl.toLocaleString('en-IN')}
            </p>
            <p className={`text-[10px] font-medium ${isRecommended ? 'text-brand-100' : 'text-gray-500'}`}>
              per quintal
            </p>
          </div>
        </div>
        
        {/* Total Earnings */}
        <div className="mt-3 flex justify-between items-center bg-gray-50 border border-gray-100 rounded-lg p-2 px-3">
          <span className="text-xs font-semibold text-gray-500">TOTAL EARNINGS</span>
          <span className="text-sm font-bold text-gray-900">₹{mandi.totalNet.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
