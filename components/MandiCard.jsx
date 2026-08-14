import { MapPin, Truck, BadgePercent, CircleDollarSign, MoveDown, TrendingUp } from 'lucide-react';

export default function MandiCard({ mandi }) {
  const isRecommended = mandi.rank === 1;

  return (
    <div className={`bg-white rounded-xl border overflow-hidden shadow-sm transition-shadow hover:shadow-md ${
      isRecommended ? 'border-brand-400 ring-1 ring-brand-300' : 'border-slate-200'
    }`}>
      {/* Top bar */}
      <div className={`flex items-center justify-between px-4 py-2.5 ${
        isRecommended ? 'bg-brand-600 text-white' : 'bg-slate-50 border-b border-slate-100'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
            isRecommended ? 'bg-white text-brand-700' : 'bg-slate-200 text-slate-600'
          }`}>
            {mandi.rank}
          </span>
          <span className="text-sm font-semibold">{mandi.mandiName}</span>
        </div>
        {isRecommended && (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-brand-100">
            <TrendingUp size={11} /> Best Option
          </span>
        )}
        {!isRecommended && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <MapPin size={11} /> {mandi.distanceKm} km
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        {/* Distance row (only for recommended, as top bar shows it for others) */}
        {isRecommended && (
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
            <MapPin size={11} />
            <span>{mandi.distanceKm} km away &middot; Headline ₹{mandi.headlinePrice}/qtl</span>
          </div>
        )}
        {!isRecommended && (
          <p className="text-xs text-slate-400 mb-3">Headline ₹{mandi.headlinePrice}/qtl</p>
        )}

        {/* Deductions grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-3">
          {[
            { icon: Truck, label: 'Transport', value: mandi.transportCostPerQtl },
            { icon: BadgePercent, label: 'Market Fee', value: mandi.marketFeePerQtl },
            { icon: CircleDollarSign, label: 'Commission', value: mandi.commissionPerQtl },
            { icon: MoveDown, label: 'Loading', value: mandi.loadingChargePerQtl },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <Icon size={11} className="text-slate-400 shrink-0" /> {label}
              </span>
              <span className="text-red-500 font-medium">-₹{value}</span>
            </div>
          ))}
        </div>

        {/* Net Realization */}
        <div className={`rounded-lg px-3 py-2.5 flex items-center justify-between ${
          isRecommended ? 'bg-brand-50 border border-brand-200' : 'bg-slate-50 border border-slate-200'
        }`}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Net Realization</p>
            <p className="text-[10px] text-slate-400">After all deductions</p>
          </div>
          <div className="text-right">
            <p className={`text-xl font-black ${isRecommended ? 'text-brand-700' : 'text-slate-800'}`}>
              ₹{mandi.netPerQtl.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-slate-400">per quintal</p>
          </div>
        </div>

        {/* Total row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Total Earnings</span>
          <span className="text-sm font-bold text-slate-800">₹{mandi.totalNet.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
