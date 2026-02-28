
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const WhyWorkWithMe: React.FC = () => {
  return (
    <section id="porque-eu" className="py-24 text-white relative overflow-hidden" style={{backgroundColor: '#0c1f3f'}}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-500 mb-6">
            A forma como trabalho com proprietários
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight tracking-tight">
            Compromisso total através de exclusividade.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="w-16 h-1 bg-gold-500 mb-10"></div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
            Trabalho em regime de exclusividade porque só assim é possível definir uma estratégia clara, manter coerência no posicionamento e assumir responsabilidade total pelo resultado.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col gap-4 mb-16 border-l-2 border-gold-500 pl-8">
            <p className="text-lg font-semibold text-white">Sem dispersão.</p>
            <p className="text-lg font-semibold text-white">Sem mensagens contraditórias no mercado.</p>
            <p className="text-lg font-semibold text-gold-400">Com foco.</p>
          </div>
        </Reveal>

        <Reveal delay={0.4} width="100%">
          <a
            href="#contactos"
            className="inline-flex items-center px-10 py-4 bg-gold-500 text-white rounded-lg font-bold text-lg hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-gold-600/40 group"
          >
            Agendar conversa agora
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
