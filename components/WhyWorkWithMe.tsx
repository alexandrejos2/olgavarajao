import React from 'react';
import { ArrowRight, ShieldCheck, Target, TrendingUp, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import { useSiteContent } from '../lib/hooks';

const ICON_MAP: Record<string, React.ElementType> = {
  Target, ShieldCheck, TrendingUp, Sparkles,
};

const DEFAULTS: Record<string, string> = {
  badge: 'O Meu Método',
  heading: 'O poder da',
  heading_highlight: 'Exclusividade.',
  description: 'Trabalho neste regime porque é a única forma de garantir uma estratégia clara, definir o posicionamento correto no mercado e assumir total responsabilidade pelos seus resultados.',
  cta_text: 'Falar comigo',
  card_1_title: 'Estratégia Focada',
  card_1_description: 'Sem dispersão. Todo o esforço concentrado no resultado que deseja atingir.',
  card_1_icon: 'Target',
  card_2_title: 'Único Interlocutor',
  card_2_description: 'Comunicação centralizada, defendendo rigorosamente os seus interesses.',
  card_2_icon: 'ShieldCheck',
  card_3_title: 'Posicionamento',
  card_3_description: 'Sem mensagens contraditórias no mercado, preservando o valor do imóvel.',
  card_3_icon: 'TrendingUp',
  card_4_title: 'Compromisso',
  card_4_description: 'Dedicação plena e responsabilidade absoluta sobre todo o processo de venda.',
  card_4_icon: 'Sparkles',
};

const WhyWorkWithMe: React.FC = () => {
  const raw = useSiteContent('why_work_with_me');
  const c = { ...DEFAULTS, ...raw };

  const benefits = [1, 2, 3, 4].map((i) => ({
    icon: ICON_MAP[c[`card_${i}_icon`]] || Target,
    title: c[`card_${i}_title`],
    desc: c[`card_${i}_description`],
  }));

  return (
    <section id="porque-eu" className="py-32 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gold-50/20 border-l border-gold-100/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-gold-200 bg-gold-50/50">
                <div className="w-1.5 h-1.5 bg-gold-500"></div>
                <span className="text-xs font-semibold tracking-widest uppercase text-gold-700">
                  {c.badge}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 mb-6 leading-tight tracking-tight">
                {c.heading} <span className="text-gold-500 block italic font-light mt-2">{c.heading_highlight}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="w-12 h-1 bg-gold-500 mb-8"></div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-xl">
                {c.description}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <a
                href="#contactos"
                className="inline-flex items-center justify-center px-10 py-5 bg-remax-blue text-white rounded-none font-medium text-sm tracking-[0.2em] uppercase hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-remax-blue/10 group mt-4"
              >
                {c.cta_text}
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute -inset-4 bg-gold-50/30 rounded-3xl -z-10 blur-2xl"></div>
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={idx} delay={0.2 + (idx * 0.1)} className="h-full">
                  <div className="flex flex-col p-8 border border-gold-100/50 bg-white hover:bg-gold-50/20 transition-all duration-500 hover:shadow-xl hover:shadow-gold-900/5 hover:-translate-y-1 group h-full">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-none bg-gold-50 group-hover:bg-gold-100 transition-colors text-gold-600 mb-6">
                      <Icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{benefit.title}</h3>
                      <p className="text-slate-500 font-light text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;
