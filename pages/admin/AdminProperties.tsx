import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Loader2, Check } from 'lucide-react';

interface Property {
  id?: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  image_url: string;
  status: string;
  sort_order: number;
}

const EMPTY: Property = {
  title: '', location: '', price: '', beds: 0, baths: 0,
  area: '', image_url: '', status: 'Disponivel', sort_order: 0,
};

const AdminProperties: React.FC = () => {
  const [items, setItems] = useState<Property[]>([]);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    supabase.from('properties').select('*').order('sort_order').then(({ data }) => {
      if (data) setItems(data);
    });
  }, []);

  const addItem = () => {
    setItems([...items, { ...EMPTY, sort_order: items.length + 1 }]);
  };

  const removeItem = async (index: number) => {
    const item = items[index];
    if (item.id) {
      await supabase.from('properties').delete().eq('id', item.id);
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Property, value: string | number) => {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setStatus('saving');
    for (let i = 0; i < items.length; i++) {
      const item = { ...items[i], sort_order: i + 1 };
      if (item.id) {
        await supabase.from('properties').update(item).eq('id', item.id);
      } else {
        const { data } = await supabase.from('properties').insert(item).select().maybeSingle();
        if (data) items[i] = data;
      }
    }
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Imoveis</h1>
        <div className="flex gap-2">
          <button onClick={addItem} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar
          </button>
          <button onClick={handleSave} disabled={status === 'saving'} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50">
            {status === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : status === 'saved' ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {status === 'saving' ? 'A guardar...' : status === 'saved' ? 'Guardado!' : 'Guardar'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id || `new-${i}`} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-bold text-slate-400">#{i + 1}</span>
              <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Titulo</label>
                <input value={item.title} onChange={(e) => updateItem(i, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Localizacao</label>
                <input value={item.location} onChange={(e) => updateItem(i, 'location', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Preco</label>
                <input value={item.price} onChange={(e) => updateItem(i, 'price', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Quartos</label>
                <input type="number" value={item.beds} onChange={(e) => updateItem(i, 'beds', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Casas de banho</label>
                <input type="number" value={item.baths} onChange={(e) => updateItem(i, 'baths', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Area</label>
                <input value={item.area} onChange={(e) => updateItem(i, 'area', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">URL da imagem</label>
                <input value={item.image_url} onChange={(e) => updateItem(i, 'image_url', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Estado</label>
                <select value={item.status} onChange={(e) => updateItem(i, 'status', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none">
                  <option value="Disponivel">Disponivel</option>
                  <option value="Vendido">Vendido</option>
                  <option value="Reservado">Reservado</option>
                </select>
              </div>
            </div>
            {item.image_url && (
              <div className="mt-3">
                <img src={item.image_url} alt={item.title} className="w-32 h-20 object-cover rounded-lg border border-slate-200" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProperties;
