'use client';
import { useState, useEffect } from 'react';
import { rankMandis } from '@/lib/calculations';
import mandis from '@/lib/mockMandis';
import { loadProfile } from '@/lib/storage';
import MandiComparison from '@/components/MandiComparison';
import AIExplanation from '@/components/AIExplanation';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function MarketPage() {
  const [profile, setProfile] = useState(null);
  const [rankedMandis, setRankedMandis] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const router = useRouter();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const p = loadProfile();
    if (!p) {
      router.push('/');
      return;
    }
    // Update profile language state seamlessly when context language changes
    const updatedProfile = { ...p, language: lang === 'mr' ? 'Marathi' : 'English' };
    setProfile(updatedProfile);
    setRankedMandis(rankMandis(mandis, updatedProfile));
  }, [router, lang]);

  if (!profile || rankedMandis.length === 0) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-brand-800 text-white px-4 sm:px-6 pt-10 pb-5 sticky top-0 z-20 shadow-sm">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">{t('market_comparison')}</h1>
              <p className="text-brand-200 text-xs mt-0.5">
                {profile.quantity} {t('qtl')} {profile.crop} &middot; {profile.district}
              </p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div className="px-4 sm:px-6 py-5 max-w-lg mx-auto pb-20">
        <MandiComparison rankedMandis={rankedMandis} />

        <div className="mt-5 pt-4 border-t border-slate-200">
          <button
            id="ai-explain-btn"
            onClick={() => setShowAI(!showAI)}
            className="w-full border border-brand-600 text-brand-700 hover:bg-brand-50 active:bg-brand-100 font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <BrainCircuit size={18} />
            {showAI ? t('hide_ai') : t('explain_ai')}
          </button>
        </div>

        {showAI && <AIExplanation rankedMandis={rankedMandis} profile={profile} />}
      </div>
    </main>
  );
}
