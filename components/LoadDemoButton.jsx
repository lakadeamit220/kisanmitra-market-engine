'use client';
import { saveProfile } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';

const RAMESH_DEMO = {
  name: 'Ramesh Patil',
  district: 'Nashik',
  crop: 'Onion',
  quantity: 120,
  stage: 'Near Harvest',
  language: 'English',
};

export default function LoadDemoButton() {
  const router = useRouter();
  
  return (
    <button
      id="load-demo-btn"
      onClick={() => { 
        saveProfile(RAMESH_DEMO); 
        router.push('/dashboard'); 
      }}
      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-amber-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
    >
      <span>🌾 Load Ramesh Demo</span>
      <Play fill="currentColor" size={16} className="opacity-80 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
