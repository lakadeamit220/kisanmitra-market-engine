'use client';
import { useState } from 'react';
import { saveProfile } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function ProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    district: 'Nashik',
    crop: 'Onion',
    quantity: '',
    stage: 'Near Harvest',
    language: 'English',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ensure quantity is a number if provided
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (value ? Number(value) : '') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) return;
    saveProfile(formData);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
      <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">Fill Your Details</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">FARMER NAME</label>
          <input 
            type="text" name="name" required
            value={formData.name} onChange={handleChange}
            placeholder="e.g. Tukaram"
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">DISTRICT</label>
            <select 
              name="district" 
              value={formData.district} onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
            >
              <option>Nashik</option>
              <option>Pune</option>
              <option>Ahmednagar</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">CROP</label>
            <select 
              name="crop" 
              value={formData.crop} onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
            >
              <option>Onion</option>
              <option>Tomato</option>
              <option>Soybean</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">QUANTITY (QTL)</label>
            <input 
              type="number" name="quantity" required min="1"
              value={formData.quantity} onChange={handleChange}
              placeholder="e.g. 50"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">STAGE</label>
            <select 
              name="stage" 
              value={formData.stage} onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-2 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none text-center"
            >
              <option>Growing</option>
              <option>Near Harvest</option>
              <option>Harvested / Stored</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full mt-2 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl text-md transition-all active:scale-[0.98]"
        >
          Proceed to Dashboard →
        </button>
      </div>
    </form>
  );
}
