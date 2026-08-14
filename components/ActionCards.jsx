import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { rankMandis } from '@/lib/calculations';
import mandis from '@/lib/mockMandis';

export default function ActionCards({ profile }) {
  if (!profile) return null;

  // Calculate live market advice specifically for this user
  const rankedMandis = rankMandis(mandis, profile);
  const bestMandi = rankedMandis[0];
  const distantMandi = rankedMandis[rankedMandis.length - 1]; // Worst case

  const actions = [
    {
      icon: CheckCircle2,
      color: 'bg-brand-500',
      iconColor: 'text-brand-600',
      bg: 'bg-brand-50 border-brand-100',
      title: 'Make Market Decision Today',
      body: `Prices at ${bestMandi.mandiName} are currently strong. You have a chance to secure ₹${bestMandi.netPerQtl.toLocaleString('en-IN')} net realization per quintal considering local transport.`,
      href: '/market',
    },
    {
      icon: AlertTriangle,
      color: 'bg-amber-400',
      iconColor: 'text-amber-500',
      bg: 'bg-amber-50 border-amber-100',
      title: 'Monitor Weather This Week',
      body: 'Rain is predicted in 3 days. Consider harvesting mature sections within the next 36 hours to avoid crop damage.',
      href: null,
    },
    {
      icon: Info,
      color: 'bg-red-500',
      iconColor: 'text-red-500',
      bg: 'bg-red-50 border-red-100',
      title: 'Avoid Distant Markets',
      body: `Despite a headline price of ₹${distantMandi.headlinePrice} at ${distantMandi.mandiName}, massive transport costs reduce your net to ₹${distantMandi.netPerQtl.toLocaleString('en-IN')}/qtl. Do not sell here.`,
      href: null,
    },
  ];

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
