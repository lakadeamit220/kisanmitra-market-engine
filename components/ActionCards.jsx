import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { rankMandis } from '@/lib/calculations';
import mandis from '@/lib/mockMandis';
import { useLanguage } from '@/lib/LanguageContext';

export default function ActionCards({ profile }) {
  const { t } = useLanguage();
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
      title: t('action_decision_title'),
      body: t('action_decision_body', { mandi: bestMandi.mandiName, price: bestMandi.netPerQtl.toLocaleString('en-IN') }),
      href: '/market',
    },
    {
      icon: AlertTriangle,
      color: 'bg-amber-400',
      iconColor: 'text-amber-500',
      bg: 'bg-amber-50 border-amber-100',
      title: t('action_weather_title'),
      body: t('action_weather_body'),
      href: null,
    },
    {
      icon: Info,
      color: 'bg-red-500',
      iconColor: 'text-red-500',
      bg: 'bg-red-50 border-red-100',
      title: t('action_avoid_title'),
      body: t('action_avoid_body', { headline: distantMandi.headlinePrice, mandi: distantMandi.mandiName, net: distantMandi.netPerQtl.toLocaleString('en-IN') }),
      href: null,
    },
  ];

  return (
    <section className="mt-6">
      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
        {t('action_plan')}
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
