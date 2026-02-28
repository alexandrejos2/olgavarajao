import React from 'react';
import { Link } from 'react-router-dom';

const AvaliacaoNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 py-4 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <span className="text-xl font-serif font-bold tracking-tight text-slate-900 group-hover:text-gold-600 transition-colors">
            ANDREIA ROCHA
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-500">
            RE/MAX Family
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
