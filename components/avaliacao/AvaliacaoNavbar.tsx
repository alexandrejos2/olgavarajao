import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../../lib/hooks';

const DEFAULTS: Record<string, string> = {
  brand_name: 'OLGA VARAJÃO',
  brand_subtitle: 'RE/MAX Move Limiana',
};

const AvaliacaoNavbar: React.FC = () => {
  const raw = useSiteContent('navbar');
  const c = { ...DEFAULTS, ...raw };

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-4 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <span className="text-xl font-serif font-bold tracking-tight text-slate-900 group-hover:text-gold-600 transition-colors">
            {c.brand_name}
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-500">
            {c.brand_subtitle}
          </span>
        </Link>
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          ← Ver Página do Agente
        </Link>
      </div>
    </nav>
  );
};

export default AvaliacaoNavbar;
