'use client';
import { saveProfile } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const RAMESH_DEMO = {
  name: 'Ramesh Patil',
  district: 'Nashik',
  crop: 'Onion',
  quantity: 120,
  stage: 'Near Harvest',
  language: 'Marathi',
};

export default function LoadDemoButton() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <button
      id="load-demo-btn"
      onClick={() => {
        saveProfile(RAMESH_DEMO);
        router.push('/dashboard');
      }}
      className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold py-4 px-6 rounded-xl text-base shadow-sm transition-colors flex items-center justify-center gap-2 group"
    >
      <span>{t('load_demo')}</span>
      <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
