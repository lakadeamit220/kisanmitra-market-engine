'use client';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-brand-900 flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-black/20 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        <div className="text-7xl mb-6 drop-shadow-lg filter bg-white/10 p-6 rounded-full inline-block backdrop-blur-sm border border-white/20">
          🌾
        </div>

        <h1 className="text-3xl font-black tracking-tight mb-3">You are offline</h1>

        <p className="text-brand-100 text-lg mb-8 leading-relaxed font-medium">
          KisanMitra needs internet to fetch the latest mandi prices and AI advice.
        </p>

        <div className="bg-black/20 rounded-2xl p-4 w-full border border-white/10 shadow-inner">
          <p className="text-brand-200 text-sm">
            Please reconnect your mobile data or Wi-Fi and try again.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-white text-brand-900 py-3 px-8 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors active:scale-95"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
