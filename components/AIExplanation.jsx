'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AIExplanation({ rankedMandis, profile }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState(false);

  // Auto-fetch explanation when the component is mounted (user clicks "Why this recommendation?")
  useEffect(() => {
    async function fetchExplanation() {
      if (fetched) return;
      
      setLoading(true);
      setError('');
      
      try {
        const res = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rankedMandis, farmerProfile: profile }),
        });
        
        const data = await res.json();
        if (data.error || !res.ok) throw new Error(data.error || 'Failed to generate explanation');
        
        setExplanation(data.explanation);
        setFetched(true);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchExplanation();
  }, [fetched, profile, rankedMandis]);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3 mt-6 shadow-md shadow-amber-500/10">
      <div className="flex items-center gap-2 mb-1 border-b border-amber-200/50 pb-3">
        <span className="text-2xl filter drop-shadow-sm">🤖</span>
        <h3 className="font-bold text-amber-900 tracking-tight text-lg">KisanMitra AI Explains</h3>
      </div>
      
      {loading && (
        <div className="flex items-center gap-3 text-amber-700 py-4 font-medium animate-pulse">
          <Loader2 className="animate-spin text-amber-500" size={24} />
          Analysing your market options...
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-200">
          <p className="font-semibold mb-1">Could not load AI explanation</p>
          <p className="opacity-90">{error}</p>
          <button 
            onClick={() => setFetched(false)}
            className="mt-2 text-xs font-bold underline hover:text-red-900"
          >
            Try Again
          </button>
        </div>
      )}
      
      {explanation && (
        <div className="text-gray-800 leading-relaxed font-medium">
          {/* Render newlines properly if returned by Gemini */}
          {explanation.split('\n').map((line, i) => (
            <p key={i} className={`${line.trim() === '' ? 'h-3' : 'mb-2'}`}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
