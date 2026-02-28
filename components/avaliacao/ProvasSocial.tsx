import React from 'react';
import { Star, MapPin, ShieldCheck } from 'lucide-react';
import Reveal from '../Reveal';

const stats = [
  {
    icon: ShieldCheck,
    value: '100+',
    label: 'Imóveis acompanhados',
    sub: 'com processo estruturado',
  },
  {
    icon: MapPin,
    value: 'Coimbra',
    label: 'Especialização local',
    sub: 'conhecimento profundo do mercado',
  },
  {
    icon: Star,
    value: '100%',
    label: 'Processo transparente',
    sub: 'comunicação clara em cada etapa',
  },
];

const ProvasSocial: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gold-500 mb-12">
            Porque trabalhar com um especialista local
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
