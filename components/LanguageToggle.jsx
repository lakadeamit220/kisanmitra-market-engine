'use client';
import { useLanguage } from '@/lib/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold backdrop-blur-sm"
      aria-label="Toggle language"
    >
      <Languages size={14} />
      <span>{lang === 'en' ? 'मराठी' : 'EN'}</span>
    </button>
  );
}
