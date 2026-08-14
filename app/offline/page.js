'use client';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-brand-800 flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="max-w-sm w-full">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M8.288 8.288A7.5 7.5 0 0120.49 17.49M1.51 6.51A7.5 7.5 0 0110.5 4.5c2.17 0 4.13.92 5.48 2.4M12 12v.01" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">No Connection</h1>
        <p className="text-brand-100 text-sm leading-relaxed mb-8">
          KisanMitra requires an internet connection to fetch live market prices and AI recommendations. Please check your mobile data or Wi-Fi and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-brand-800 font-semibold py-3 px-8 rounded-xl text-sm hover:bg-brand-50 active:scale-95 transition-all"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
