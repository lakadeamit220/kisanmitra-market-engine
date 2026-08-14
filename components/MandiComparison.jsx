import MandiCard from './MandiCard';

export default function MandiComparison({ rankedMandis }) {
  if (!rankedMandis || rankedMandis.length === 0) return null;

  const best = rankedMandis[0];
  const secondBest = rankedMandis.length > 1 ? rankedMandis[1] : null;
  const savingsPerQtl = secondBest ? best.netPerQtl - secondBest.netPerQtl : 0;
  const totalSavings = secondBest ? best.totalNet - secondBest.totalNet : 0;

  return (
    <div className="w-full max-w-lg mx-auto">
      {secondBest && savingsPerQtl > 0 && (
        <div className="bg-brand-50 border border-brand-200 text-brand-800 rounded-xl p-3 mb-4 text-center shadow-sm">
          <p className="text-sm font-semibold">
            🏆 You save <span className="font-bold text-brand-700">₹{savingsPerQtl.toFixed(0)}/qtl</span> vs the next best option!
          </p>
          <p className="text-xs mt-0.5 text-brand-600 opacity-90">
            (Total extra profit: ₹{totalSavings.toLocaleString('en-IN')})
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* We slice to show only top 5 by default so the list is manageable for the farmer */}
        {rankedMandis.slice(0, 5).map((mandi) => (
          <MandiCard key={mandi.mandiId} mandi={mandi} />
        ))}
      </div>
      
      {rankedMandis.length > 5 && (
        <p className="text-center text-xs text-gray-400 mt-4 mb-2">
          + {rankedMandis.length - 5} other markets analyzed and hidden.
        </p>
      )}
    </div>
  );
}
