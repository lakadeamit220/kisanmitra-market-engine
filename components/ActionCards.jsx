import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    icon: CheckCircle2,
    color: 'bg-brand-500',
    iconColor: 'text-brand-600',
    bg: 'bg-brand-50 border-brand-100',
    title: 'Make Market Decision Today',
    body: 'Prices at Nashik APMC are currently strong. You have a chance to secure ₹2,459 net realization per quintal.',
    href: '/market',
  },
  {
    icon: AlertTriangle,
    color: 'bg-amber-400',
    iconColor: 'text-amber-500',
    bg: 'bg-amber-50 border-amber-100',
    title: 'Monitor Weather This Week',
    body: 'Rain is predicted in 3 days. Consider harvesting mature sections within the next 36 hours to avoid damage.',
    href: null,
  },
  {
    icon: Info,
    color: 'bg-red-500',
    iconColor: 'text-red-500',
    bg: 'bg-red-50 border-red-100',
    title: 'Avoid Distant Markets',
    body: 'Despite a higher headline price of ₹2,750 at Kolhapur, transport costs reduce your net to ₹1,463/qtl — far below nearby options.',
    href: null,
  },
];

export default function ActionCards() {
  return (
    <section className="mt-6">
      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
        Today's Action Plan
      </h2>
      <div className="space-y-2.5">
        {actions.map(({ icon: Icon, color, iconColor, bg, title, body, href }) => {
          const Card = (
            <div className={`relative flex gap-3 bg-white border ${bg} rounded-xl p-4 overflow-hidden`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${color} rounded-l-xl`} />
              <Icon size={18} className={`${iconColor} mt-0.5 shrink-0`} />
              <div>
                <p className="text-sm font-semibold text-slate-900 leading-snug">{title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{body}</p>
              </div>
            </div>
          );
          return href
            ? <Link key={title} href={href} className="block hover:opacity-90 transition-opacity">{Card}</Link>
            : <div key={title}>{Card}</div>;
        })}
      </div>
    </section>
  );
}
