import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Loader2, Check } from 'lucide-react';

interface Award {
  id?: string;
  name: string;
  image_url: string;
  sort_order: number;
}

const AdminAwards: React.FC = () => {
  const [items, setItems] = useState<Award[]>([]);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    supabase.from('awards').select('*').order('sort_order').then(({ data }) => {
      if (data) setItems(data);
    });
  }, []);

  const addItem = () => {
    setItems([...items, { name: '', image_url: '', sort_order: items.length + 1 }]);
  };

  const removeItem = async (index: number) => {
    const item = items[index];
    if (item.id) await supabase.from('awards').delete().eq('id', item.id);
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Award, value: string | number) => {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setStatus('saving');
    for (let i = 0; i < items.length; i++) {
      const item = { ...items[i], sort_order: i + 1 };
      if (item.id) {
        await supabase.from('awards').update(item).eq('id', item.id);
      } else {
        const { data } = await supabase.from('awards').insert(item).select().maybeSingle();
        if (data) items[i] = data;
      }
    }
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Premios</h1>
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

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item.id || `new-${i}`} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
            {item.image_url && <img src={item.image_url} alt={item.name} className="w-16 h-16 object-contain rounded-lg border border-slate-100 flex-shrink-0" />}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nome</label>
                <input value={item.name} onChange={(e) => updateItem(i, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">URL da imagem</label>
                <input value={item.image_url} onChange={(e) => updateItem(i, 'image_url', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
              </div>
            </div>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAwards;
