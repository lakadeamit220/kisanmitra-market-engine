import LoadDemoButton from '@/components/LoadDemoButton';
import ProfileForm from '@/components/ProfileForm';
import LanguageToggle from '@/components/LanguageToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 relative">
      {/* Absolute Language Toggle for unauthenticated users */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Hero Header */}
      <div className="bg-brand-800 text-white pt-16 pb-14 px-6 shadow-sm">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            KisanMitra
          </h1>
          <p className="text-brand-100 font-medium text-base sm:text-lg">
            योग्य बाजार ओळखा, जास्त नफा मिळवा
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8 max-w-lg mx-auto w-full">
        <LoadDemoButton />

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">or</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <ProfileForm />
      </div>
    </main>
  );
}
