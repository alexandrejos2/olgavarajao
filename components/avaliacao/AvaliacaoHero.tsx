import React from 'react';
import { ArrowDown } from 'lucide-react';
import Reveal from '../Reveal';

interface AvaliacaoHeroProps {
  onCTAClick: () => void;
}

const AvaliacaoHero: React.FC<AvaliacaoHeroProps> = ({ onCTAClick }) => {
  return (
    <section className="bg-gradient-to-br from-white via-primary-50 to-primary-100 py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col max-w-2xl mx-auto">

          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-gold-500/30 rounded-full bg-gold-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-600">
                Análise Estratégica · Alto Minho
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Qual é o valor real do seu imóvel no{' '}
              <span className="text-gold-600">Alto Minho?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-2xl">
              Peça uma análise estratégica baseada no mercado atual, na procura ativa e no posicionamento correto para vender com segurança.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col items-start gap-3">
              <button
                onClick={onCTAClick}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-bold text-lg transition-all duration-300 shadow-lg shadow-gold-500/30 group"
              >
                Pedir Análise Estratégica
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <p className="text-sm text-slate-400 font-medium pl-1">
                Resposta personalizada. Sem compromisso.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5} width="100%">
            <div className="mt-14 border-t border-gray-200 pt-10">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold-400 ring-offset-2 ring-offset-white shadow-lg">
                    <img
                      src="https://res.cloudinary.com/dxrk58emm/image/upload/v1772799577/olga-varajao_ywiaiw.png"
                      alt="Olga Varajão Consultora"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900 font-serif leading-tight">Olga Varajão</p>
                    <p className="text-xs text-slate-500 leading-tight">Consultora RE/MAX Move Limiana</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  {[
                    { value: '100+', label: 'Imóveis acompanhados' },
                    { value: '15+', label: 'Anos de experiência' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-left">
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500 font-medium leading-tight mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default AvaliacaoHero;
