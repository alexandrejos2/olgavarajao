import React from 'react';
import { MapPin, TrendingUp, Home, Target } from 'lucide-react';
import Reveal from '../Reveal';
import { useSiteContent } from '../../lib/hooks';

const ICONS = [MapPin, TrendingUp, Home, Target];

const DEFAULTS: Record<string, string> = {
  heading: 'Não é uma estimativa automática.',
  paragraph_1: 'Ferramentas online apresentam valores genéricos com base em médias.',
  paragraph_2: 'O valor real de um imóvel depende da localização específica, da procura ativa atual, do estado do imóvel e da estratégia de posicionamento.',
  paragraph_3: 'A análise é personalizada e baseada em dados reais do mercado local.',
  bullet_1: 'Localização específica',
  bullet_2: 'Procura ativa atual',
  bullet_3: 'Estado real do imóvel',
  bullet_4: 'Estratégia de posicionamento',
};

const DiferenciacaoBlock: React.FC = () => {
  const raw = useSiteContent('avaliacao_diferenciacao');
  const c = { ...DEFAULTS, ...raw };

  const bullets = [1, 2, 3, 4].map((i) => ({
    icon: ICONS[i - 1],
    label: c[`bullet_${i}`],
  }));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal delay={0.1}>
              <div className="w-12 h-1 bg-gold-500 mb-6"></div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                {c.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-slate-600 leading-relaxed mb-4">
                {c.paragraph_1}
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="text-slate-600 leading-relaxed mb-4">
                {c.paragraph_2}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-slate-700 font-semibold leading-relaxed">
                {c.paragraph_3}
              </p>
            </Reveal>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-4">
              {bullets.map((bullet, index) => (
                <Reveal key={bullet.label} delay={0.1 * (index + 1)} width="100%">
                  <div className="flex items-center gap-4 p-5 bg-primary-50 rounded-xl border border-primary-100 group hover:border-gold-500/50 hover:bg-primary-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-white border border-gold-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                      <bullet.icon className="w-4 h-4 text-gold-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-slate-800">{bullet.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiferenciacaoBlock;
