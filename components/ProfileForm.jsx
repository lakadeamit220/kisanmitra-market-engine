'use client';
import { useState } from 'react';
import { saveProfile } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const DISTRICTS = ['Nashik', 'Pune', 'Ahmednagar', 'Aurangabad', 'Solapur', 'Kolhapur', 'Satara', 'Sangli'];
const CROPS     = ['Onion', 'Tomato', 'Soybean', 'Wheat', 'Maize', 'Grapes', 'Sugarcane'];
const STAGES    = ['Growing', 'Near Harvest', 'Harvested / Stored'];

const inputClass = "w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder-slate-400";
const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

export default function ProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    district: 'Nashik',
    crop: 'Onion',
    quantity: '',
    stage: 'Near Harvest',
    language: 'Marathi',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (value ? Number(value) : '') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) return;
    saveProfile(formData);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="font-bold text-slate-900 text-lg mb-5">Enter Your Details</h2>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Farmer Name</label>
          <input
            type="text" name="name" required
            value={formData.name} onChange={handleChange}
            placeholder="e.g. Tukaram Shinde"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>District</label>
            <div className="relative">
              <select name="district" value={formData.district} onChange={handleChange}
                className={`${inputClass} appearance-none pr-9 cursor-pointer`}>
                {DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Crop</label>
            <div className="relative">
              <select name="crop" value={formData.crop} onChange={handleChange}
                className={`${inputClass} appearance-none pr-9 cursor-pointer`}>
                {CROPS.map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Quantity (Qtl)</label>
            <input
              type="number" name="quantity" required min="1"
              value={formData.quantity} onChange={handleChange}
              placeholder="e.g. 50"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Stage</label>
            <div className="relative">
              <select name="stage" value={formData.stage} onChange={handleChange}
                className={`${inputClass} appearance-none pr-9 cursor-pointer`}>
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-semibold py-3.5 rounded-lg text-sm transition-colors"
        >
          View Market Analysis
        </button>
      </div>
    </form>
  );
}
