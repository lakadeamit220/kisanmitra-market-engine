'use client';
import { useState, useEffect } from 'react';
import { rankMandis } from '@/lib/calculations';
import mandis from '@/lib/mockMandis';
import { loadProfile } from '@/lib/storage';
import MandiComparison from '@/components/MandiComparison';
import AIExplanation from '@/components/AIExplanation';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot } from 'lucide-react';

export default function MarketPage() {
  const [profile, setProfile] = useState(null);
  const [rankedMandis, setRankedMandis] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const p = loadProfile();
    // For demo purposes, we will supply a fallback Ramesh Demo if profile is missing
    // so we can test /market before /dashboard is fully built.
    const activeProfile = p || {
      name: 'Ramesh Patil',
      district: 'Nashik',
      crop: 'Onion',
      quantity: 120,
      stage: 'Near Harvest',
      language: 'English',
    };

    setProfile(activeProfile);
    setRankedMandis(rankMandis(mandis, activeProfile.quantity));
  }, []);

  if (!profile || rankedMandis.length === 0) return null;

  return (
    <main className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-brand-700 text-white p-4 pt-6 flex items-center gap-4 sticky top-0 z-20 shadow-md">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-white hover:bg-brand-600 p-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Market Comparison</h1>
          <p className="text-brand-100 text-sm mt-0.5 font-medium">
            {profile.quantity} qtl {profile.crop} • {profile.district}
          </p>
        </div>
      </div>

      <div className="p-4 mt-2 mb-20 max-w-lg mx-auto">
        <MandiComparison rankedMandis={rankedMandis} />

        {/* AI Explanation trigger */}
        <button
          onClick={() => setShowAI(!showAI)}
          className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
        >
          <Bot size={22} />
          {showAI ? 'Hide AI Advice' : 'Why this recommendation?'}
        </button>

        {showAI && (
          <AIExplanation rankedMandis={rankedMandis} profile={profile} />
        )}
      </div>
    </main>
  );
}
