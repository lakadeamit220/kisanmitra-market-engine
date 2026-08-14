import { Navigation, Scale, Leaf, Clock } from 'lucide-react';

export default function DashboardCards({ profile }) {
  if (!profile) return null;
  
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-brand-600 mb-2">
          <Leaf size={20} />
        </div>
        <p className="text-xs text-gray-500 font-medium">CROP</p>
        <p className="font-bold text-gray-900">{profile.crop}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
          <Scale size={20} />
        </div>
        <p className="text-xs text-gray-500 font-medium">QUANTITY</p>
        <p className="font-bold text-gray-900">{profile.quantity} qtl</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
          <Navigation size={20} />
        </div>
        <p className="text-xs text-gray-500 font-medium">DISTRICT</p>
        <p className="font-bold text-gray-900">{profile.district}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-2">
          <Clock size={20} />
        </div>
        <p className="text-xs text-gray-500 font-medium">STAGE</p>
        <p className="font-bold text-gray-900 text-sm leading-tight">{profile.stage}</p>
      </div>
    </div>
  );
}
