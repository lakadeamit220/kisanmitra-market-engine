import { Navigation, Scale, Leaf, Clock } from 'lucide-react';

const CARDS = [
  { icon: Leaf,       iconColor: 'text-brand-600', bg: 'bg-brand-50', label: 'Crop',     key: 'crop' },
  { icon: Scale,      iconColor: 'text-blue-600',  bg: 'bg-blue-50',  label: 'Quantity', key: 'quantity', suffix: ' qtl' },
  { icon: Navigation, iconColor: 'text-purple-600',bg: 'bg-purple-50',label: 'District', key: 'district' },
  { icon: Clock,      iconColor: 'text-amber-600', bg: 'bg-amber-50', label: 'Stage',    key: 'stage' },
];

export default function DashboardCards({ profile }) {
  if (!profile) return null;

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {CARDS.map(({ icon: Icon, iconColor, bg, label, key, suffix }) => (
        <div key={key} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
            <Icon size={18} className={iconColor} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="font-semibold text-slate-900 text-sm mt-0.5 leading-tight">
              {profile[key]}{suffix || ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
