import LoadDemoButton from '@/components/LoadDemoButton';
import ProfileForm from '@/components/ProfileForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9fafb]">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-600 text-white rounded-b-[40px] pt-14 pb-12 px-6 shadow-xl relative overflow-hidden">
        {/* Abstract shapes for premium feel */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 -left-10 w-32 h-32 bg-brand-900/40 rounded-full blur-xl"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center justify-center gap-2">
            KisanMitra <span className="text-3xl">🌾</span>
          </h1>
          <p className="text-brand-100 font-medium opacity-90 tracking-wide text-sm">
            जानो सही मंडी, कमाओ सही पैसा
          </p>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20 max-w-md mx-auto">
        <LoadDemoButton />

        <div className="flex items-center gap-4 my-8">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">or fill your details</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <ProfileForm />
      </div>
    </main>
  );
}
