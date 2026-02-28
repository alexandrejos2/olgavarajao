
import React from 'react';
import Reveal from './Reveal';

const LogoSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal width="100%">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logo RE/MAX White */}
            <div className="h-12 flex flex-col justify-center items-center">
              <span className="text-xl font-serif font-bold text-slate-900 leading-none">RE/MAX White</span>
              <span className="text-[8px] tracking-[0.3em] font-bold text-slate-500">COIMBRA</span>
            </div>
            
            {/* Partner Placeholder 1: Maxfinance */}
            <div className="h-10 flex items-center">
              <span className="text-lg font-bold text-slate-800 tracking-tighter italic">MAX<span className="text-gold-500 italic">FINANCE</span></span>
            </div>

            {/* Partner Placeholder 2: Melom */}
            <div className="h-10 flex items-center">
              <span className="text-lg font-black text-slate-800">ME<span className="text-gold-500">LOM</span></span>
            </div>

            {/* Partner Placeholder 3: Certificação Energética */}
            <div className="h-10 flex items-center">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase text-slate-600">Certificação</span>
                <span className="text-sm font-bold text-slate-800 tracking-widest leading-none">ENERGÉTICA</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LogoSection;
