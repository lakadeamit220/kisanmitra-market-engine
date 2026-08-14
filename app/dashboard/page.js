'use client';
import { useEffect, useState } from 'react';
import { loadProfile, clearProfile } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import DashboardCards from '@/components/DashboardCards';
import ActionCards from '@/components/ActionCards';
import { Store, LogOut, Sun } from 'lucide-react';

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const p = loadProfile();
    if (!p) {
      // strict redirection to home if no profile
      router.push('/');
      return;
    }
    setProfile(p);
  }, [router]);

  if (!profile) return null; // Avoid hydration flash

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 17) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  const handleReset = () => {
    clearProfile();
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#f9fafb] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-700 to-brand-600 text-white p-6 rounded-b-[32px] shadow-lg sticky top-0 z-20">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 opacity-80 mb-1">
              <Sun size={14} />
              <p className="text-sm font-medium tracking-wide uppercase">{getGreeting()}</p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{profile.name} 👋</h1>
          </div>
          <button
            onClick={handleReset}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
            title="Reset Profile"
          >
            <LogOut size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-5 max-w-lg mx-auto -mt-2">
        <DashboardCards profile={profile} />

        {/* Main Hero CTA */}
        <button
          id="find-best-mandi-btn"
          onClick={() => router.push('/market')}
          className="w-full bg-brand-900 overflow-hidden relative hover:bg-black text-white font-bold py-5 rounded-2xl text-xl shadow-xl shadow-brand-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>

          <Store size={26} className="relative z-10 text-brand-400 group-hover:text-brand-300 transition-colors" />
          <span className="relative z-10">Find Best Mandi</span>
          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
        </button>

        <ActionCards />
      </div>
    </main>
  );
}
