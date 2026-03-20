import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Loader2, Check } from 'lucide-react';

interface Testimonial {
  id?: string;
  text: string;
  author: string;
  role: string;
  avatar_url: string | null;
  sort_order: number;
}

const AdminTestimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    supabase.from('testimonials').select('*').order('sort_order').then(({ data }) => {
      if (data) setItems(data);
    });
  }, []);

  const addItem = () => {
    setItems([...items, { text: '', author: '', role: '', avatar_url: null, sort_order: items.length + 1 }]);
  };

  const removeItem = async (index: number) => {
    const item = items[index];
    if (item.id) await supabase.from('testimonials').delete().eq('id', item.id);
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Testimonial, value: string | null) => {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setStatus('saving');
    for (let i = 0; i < items.length; i++) {
      const item = { ...items[i], sort_order: i + 1 };
      if (item.id) {
        await supabase.from('testimonials').update(item).eq('id', item.id);
      } else {
        const { data } = await supabase.from('testimonials').insert(item).select().maybeSingle();
        if (data) items[i] = data;
      }
    }
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Testemunhos</h1>
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
            <div className="flex justify-between mb-3">
              <span className="text-sm font-bold text-slate-400">#{i + 1}</span>
              <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Texto</label>
                <textarea rows={3} value={item.text} onChange={(e) => updateItem(i, 'text', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Autor</label>
                  <input value={item.author} onChange={(e) => updateItem(i, 'author', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Funcao</label>
                  <input value={item.role} onChange={(e) => updateItem(i, 'role', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">URL do avatar (opcional)</label>
                  <input value={item.avatar_url || ''} onChange={(e) => updateItem(i, 'avatar_url', e.target.value || null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
