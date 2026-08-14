import MandiCard from './MandiCard';

export default function MandiComparison({ rankedMandis }) {
  if (!rankedMandis || rankedMandis.length === 0) return null;

  const best = rankedMandis[0];
  const secondBest = rankedMandis[1];
  const savingsPerQtl = secondBest ? (best.netPerQtl - secondBest.netPerQtl).toFixed(0) : 0;
  const totalSavings = secondBest ? (best.totalNet - secondBest.totalNet).toLocaleString('en-IN') : 0;

  return (
    <div className="w-full">
      {secondBest && Number(savingsPerQtl) > 0 && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 mb-4">
          <p className="text-sm font-semibold text-brand-800">
            Choosing {best.mandiName} saves you{' '}
            <span className="font-black">₹{savingsPerQtl}/qtl</span> over the next best option.
          </p>
          <p className="text-xs text-brand-600 mt-0.5">
            Total extra earnings: ₹{totalSavings}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {rankedMandis.slice(0, 5).map((mandi) => (
          <MandiCard key={mandi.mandiId} mandi={mandi} />
        ))}
      </div>

      {rankedMandis.length > 5 && (
        <p className="text-center text-xs text-slate-400 mt-4">
          {rankedMandis.length - 5} additional markets analysed and not shown.
        </p>
      )}
    </div>
  );
}
