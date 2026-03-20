import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Check, Loader as Loader2 } from 'lucide-react';

interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'url';
}

interface SectionEditorProps {
  section: string;
  title: string;
  fields: FieldConfig[];
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, title, fields }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    supabase
      .from('site_content')
      .select('key, value')
      .eq('section', section)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach((row) => { map[row.key] = row.value; });
          setValues(map);
        }
      });
  }, [section]);

  const handleSave = async () => {
    setStatus('saving');
    const upserts = fields.map((f) => ({
      section,
      key: f.key,
      value: values[f.key] || '',
      updated_at: new Date().toISOString(),
    }));

    for (const row of upserts) {
      await supabase
        .from('site_content')
        .upsert(row, { onConflict: 'section,key' });
    }

    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900">{title}</h1>
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {status === 'saving' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'saved' ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {status === 'saving' ? 'A guardar...' : status === 'saved' ? 'Guardado!' : 'Guardar'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                rows={4}
                value={values[field.key] || ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all text-sm resize-none"
              />
            ) : (
              <input
                type={field.type === 'url' ? 'url' : 'text'}
                value={values[field.key] || ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition-all text-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionEditor;
