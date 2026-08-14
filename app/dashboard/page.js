'use client';
import { useEffect, useState } from 'react';
import { loadProfile, clearProfile } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import DashboardCards from '@/components/DashboardCards';
import ActionCards from '@/components/ActionCards';
import { Store, LogOut } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const p = loadProfile();
    if (!p) { router.push('/'); return; }
    setProfile(p);
  }, [router]);

  if (!profile) return null;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return t('greeting_morning');
    if (h < 17) return t('greeting_afternoon');
    return t('greeting_evening');
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-brand-800 text-white px-4 sm:px-6 pt-10 pb-6">
        <div className="max-w-lg mx-auto flex justify-between items-start">
          <div>
            <p className="text-brand-200 text-xs font-medium uppercase tracking-widest mb-1">{getGreeting()}</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{profile.name}</h1>
          </div>
          <div className="flex flex-col items-end gap-2 mt-1">
            <LanguageToggle />
            <button
              onClick={() => { clearProfile(); router.push('/'); }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title="Change Profile"
              aria-label="Change profile"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-6 max-w-lg mx-auto">
        <DashboardCards profile={profile} />

        {/* Primary CTA */}
        <button
          id="find-best-mandi-btn"
          onClick={() => router.push('/market')}
          className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold py-4 rounded-xl text-base shadow-sm transition-colors flex items-center justify-center gap-2.5 group mt-2"
        >
          <Store size={20} />
          <span>{t('find_best_mandi')}</span>
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
        </button>

        <ActionCards profile={profile} />
      </div>
    </main>
  );
}
