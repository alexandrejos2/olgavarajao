import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../Reveal';
import { useSiteContent } from '../../lib/hooks';

const DEFAULTS: Record<string, string> = {
  heading: 'Vamos analisar o seu imóvel com estratégia.',
  subtitle: 'Preencha os dados essenciais e receba uma análise personalizada baseada no mercado atual.',
  button_text: 'Pedir Análise Estratégica',
  button_subtext: 'Resposta personalizada. Sem compromisso.',
};

interface AvaliacaoCTAProps {
  onCTAClick: () => void;
}

const AvaliacaoCTA: React.FC<AvaliacaoCTAProps> = ({ onCTAClick }) => {
  const raw = useSiteContent('avaliacao_cta');
  const c = { ...DEFAULTS, ...raw };

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal delay={0.1}>
          <div className="w-12 h-1 bg-gold-500 mx-auto mb-8"></div>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            {c.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-slate-600 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            {c.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onCTAClick}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/30 group"
            >
              {c.button_text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-slate-400">{c.button_subtext}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AvaliacaoCTA;
