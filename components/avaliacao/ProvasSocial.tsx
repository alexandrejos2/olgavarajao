import React from 'react';
import { Star, MapPin, ShieldCheck } from 'lucide-react';
import Reveal from '../Reveal';
import { useSiteContent } from '../../lib/hooks';

const ICONS = [ShieldCheck, MapPin, Star];

const DEFAULTS: Record<string, string> = {
  section_label: 'Porquê escolher um especialista local',
  stat_1_value: '100+',
  stat_1_label: 'Imóveis acompanhados',
  stat_1_sub: 'com processo estruturado',
  stat_2_value: 'Évora',
  stat_2_label: 'Especialização local',
  stat_2_sub: 'conhecimento profundo do mercado',
  stat_3_value: '100%',
  stat_3_label: 'Processo transparente',
  stat_3_sub: 'comunicação clara em cada etapa',
};

const ProvasSocial: React.FC = () => {
  const raw = useSiteContent('avaliacao_provas');
  const c = { ...DEFAULTS, ...raw };

  const stats = [1, 2, 3].map((i) => ({
    icon: ICONS[i - 1],
    value: c[`stat_${i}_value`],
    label: c[`stat_${i}_label`],
    sub: c[`stat_${i}_sub`],
  }));

  return (
    <section className="py-20 bg-remax-blue text-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gold-500 mb-12">
            {c.section_label}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 * i} width="100%">
              <div className="text-center group">
                <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center mx-auto mb-5 group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-slate-400 group-hover:text-gold-400 transition-colors" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-base font-semibold text-white mb-1">{stat.label}</p>
                <p className="text-sm text-slate-400">{stat.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvasSocial;
