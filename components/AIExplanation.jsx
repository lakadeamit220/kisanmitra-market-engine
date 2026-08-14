'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function AIExplanation({ rankedMandis, profile }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // We intentionally ignore `fetched` here so swapping languages forces a fresh fetch from AI
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
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchExplanation();
  }, [rankedMandis, profile]); // Now it refetches if profile.language changes!

  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="font-bold text-slate-900 text-sm">{t('ai_analysis_title')}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{t('ai_analysis_subtitle')}</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-500 text-sm py-3">
          <Loader2 size={16} className="animate-spin text-brand-500" />
          {t('loading')}
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          <p className="font-semibold">Could not load analysis</p>
          <p className="text-xs mt-1 text-red-500">{error}</p>
          <button
            onClick={() => setFetched(false)}
            className="mt-2 text-xs font-semibold underline"
          >
            {t('retry')}
          </button>
        </div>
      )}

      {explanation && !loading && (
        <div className="text-sm text-slate-700 leading-relaxed space-y-2 font-medium">
          {explanation.split('\n').filter(l => l.trim()).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
