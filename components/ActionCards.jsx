import { AlertTriangle, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function ActionCards() {
  return (
    <div className="mt-8">
      <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
        <span className="bg-brand-100 text-brand-700 p-1.5 rounded-lg">📅</span> 
        Today's Action Plan
      </h3>
      
      <div className="space-y-3">
        {/* GREEN Action */}
        <Link href="/market" className="block relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 pl-5 overflow-hidden transition-all hover:shadow-md active:scale-[0.98]">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-green-500"></div>
          <div className="flex gap-3">
            <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 leading-none mb-1">Make Market Decision Today</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Prices at Nashik APMC are currently strong. You have a chance to secure ₹2,459 net realization.
              </p>
            </div>
            <ChevronRight className="text-gray-300 ml-auto self-center shrink-0" size={20} />
          </div>
        </Link>
        
        {/* YELLOW Action */}
        <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 pl-5 overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-amber-400"></div>
          <div className="flex gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 leading-none mb-1">Check Tomorrow's Weather</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Rain predicted in 3 days. Consider harvesting mature sections in the next 36 hours.
              </p>
            </div>
          </div>
        </div>
        
        {/* RED Action */}
        <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 pl-5 overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-red-500"></div>
          <div className="flex gap-3">
            <Info className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 leading-none mb-1">Avoid Distant Markets</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Even if Kolhapur price is ₹2,750, high transport drops your profit to ₹1,463. Do not travel far!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
