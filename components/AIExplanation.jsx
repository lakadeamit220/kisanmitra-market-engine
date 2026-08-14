'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AIExplanation({ rankedMandis, profile }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched) return;
    
    async function fetchExplanation() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rankedMandis, farmerProfile: profile }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || 'Unknown error');
        setExplanation(data.explanation);
        setFetched(true);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchExplanation();
  }, [fetched, rankedMandis, profile]);

  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="font-bold text-slate-900 text-sm">AI Market Analysis</h3>
        <p className="text-xs text-slate-400 mt-0.5">Powered by Llama 3 (Groq)</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-500 text-sm py-3">
          <Loader2 size={16} className="animate-spin text-brand-500" />
          Analysing your market options...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          <p className="font-semibold">Could not load analysis</p>
          <p className="text-xs mt-1 text-red-500">{error}</p>
          <button
            onClick={() => setFetched(false)}
            className="mt-2 text-xs font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {explanation && (
        <div className="text-sm text-slate-700 leading-relaxed space-y-2">
          {explanation.split('\n').filter(l => l.trim()).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
