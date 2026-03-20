import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Eye, CircleCheck as CheckCircle, X } from 'lucide-react';

interface Submission {
  id: string;
  type: string;
  data: Record<string, string>;
  status: string;
  created_at: string;
}

const AdminSubmissions: React.FC = () => {
  const [items, setItems] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<'all' | 'contacto' | 'avaliacao'>('all');
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data);
      });
  }, []);

  const markAsRead = async (id: string) => {
    await supabase.from('form_submissions').update({ status: 'lido' }).eq('id', id);
    setItems(items.map((i) => i.id === id ? { ...i, status: 'lido' } : i));
    if (selected?.id === id) setSelected({ ...selected!, status: 'lido' });
  };

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Submissoes</h1>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {(['all', 'contacto', 'avaliacao'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === f ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'contacto' ? 'Contacto' : 'Avaliacao'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">Nenhuma submissao encontrada</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 font-medium text-slate-500">Data</th>
                <th className="px-4 py-3 font-medium text-slate-500">Tipo</th>
                <th className="px-4 py-3 font-medium text-slate-500">Nome</th>
                <th className="px-4 py-3 font-medium text-slate-500">Telefone</th>
                <th className="px-4 py-3 font-medium text-slate-500">Estado</th>
                <th className="px-4 py-3 font-medium text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${
                    item.status === 'novo' ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => setSelected(item)}
                >
                  <td className="px-4 py-3 text-slate-600">{formatDate(item.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      item.type === 'contacto'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.data.nome || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{item.data.telefone || '-'}</td>
                  <td className="px-4 py-3">
                    {item.status === 'novo' ? (
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Eye className="w-4 h-4 text-slate-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-lg text-slate-900">Detalhes da submissao</h2>
                <p className="text-sm text-slate-500">{formatDate(selected.created_at)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  selected.type === 'contacto' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {selected.type}
                </span>
                <span className={`text-xs font-medium ${selected.status === 'novo' ? 'text-blue-600' : 'text-green-600'}`}>
                  {selected.status}
                </span>
              </div>
              {Object.entries(selected.data).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">{key}</label>
                  <p className="text-slate-900">{value || '-'}</p>
                </div>
              ))}
            </div>
            {selected.status === 'novo' && (
              <div className="p-6 border-t border-slate-100">
                <button
                  onClick={() => markAsRead(selected.id)}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Marcar como lido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubmissions;
