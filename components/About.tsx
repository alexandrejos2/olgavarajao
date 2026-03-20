import React from 'react';
import { MapPin, Users, Award } from 'lucide-react';
import Reveal from './Reveal';
import { useSiteContent } from '../lib/hooks';

const DEFAULTS: Record<string, string> = {
  heading_line1: 'Profissionalismo.',
  heading_line2: 'Estratégia.',
  heading_line3: 'Compromisso com Resultados.',
  bio_paragraph_1: 'O meu nome é Olga Varajão e sou Consultora Imobiliária na RE/MAX Move Limiana. Exerço a minha atividade com máximo profissionalismo, máximo dinamismo e máxima dedicação.',
  bio_paragraph_2: 'Sou Pós Graduada em Mediação Imobiliária Profissional e Consultora Collection. Na hora de escolher a quem entregar o seu imóvel para vender, escolha alguém que mostre resultados e está devidamente capacitada.',
  bio_paragraph_3: 'O meu compromisso é representar os interesses dos meus clientes. Tenho o imóvel certo para si e com a garantia de qualidade do Grupo Move - Líderes Imobiliários no Alto Minho.',
  profile_image_url: 'https://res.cloudinary.com/dxrk58emm/image/upload/v1772809281/olga-pr%C3%A9mio_asq7qu.png',
  profile_name: 'Olga Varajão',
  profile_subtitle: 'RE/MAX Move Limiana',
  stat_1_value: '15+',
  stat_1_label: 'Anos de Experiência',
  stat_2_value: 'Golden',
  stat_2_label: 'Club RE/MAX',
  stat_3_value: 'Alto Minho',
  stat_3_label: 'Zona de Atuação',
};

const About: React.FC = () => {
  const raw = useSiteContent('about');
  const c = { ...DEFAULTS, ...raw };

  return (
    <section id="sobre" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div className="relative order-2 lg:order-1 flex justify-center lg:-mt-4 lg:pr-4">
            <Reveal duration={1000} yOffset={40}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-50/50 -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gold-50/30 -z-10"></div>

                <div className="relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] aspect-[4/5] w-full min-h-[500px] lg:min-h-[600px] group">
                  <img
                    src={c.profile_image_url}
                    alt="Olga Varajão Consultora"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-8">
                    <p className="text-white font-serif text-2xl font-bold">{c.profile_name}</p>
                    <p className="text-gray-300 text-sm tracking-widest uppercase mt-1">{c.profile_subtitle}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-6">
              <Reveal>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  {c.heading_line1}<br />
                  {c.heading_line2}<br />
                  <span className="text-gold-500 font-light italic">{c.heading_line3}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="w-20 h-1 bg-gold-500 mb-8"></div>
              </Reveal>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
              <Reveal delay={0.3}>
                <p>{c.bio_paragraph_1}</p>
              </Reveal>
              <Reveal delay={0.4}>
                <p>{c.bio_paragraph_2}</p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="font-medium text-slate-900">{c.bio_paragraph_3}</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
              <Reveal delay={0.6} width="100%">
                <div className="bg-white p-8 border border-gold-200/50 shadow-sm hover:shadow-xl hover:border-gold-400 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col items-center text-center">
                  <Award className="w-8 h-8 text-gold-500 mb-4" />
                  <h3 className="text-3xl font-serif font-bold text-slate-900 uppercase">{c.stat_1_value}</h3>
                  <p className="text-xs tracking-widest uppercase text-slate-500 mt-2 font-medium">{c.stat_1_label}</p>
                </div>
              </Reveal>

              <Reveal delay={0.7} width="100%">
                <div className="bg-white p-8 border border-gold-200/50 shadow-sm hover:shadow-xl hover:border-gold-400 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col items-center text-center">
                  <Users className="w-8 h-8 text-gold-500 mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-slate-900 uppercase">{c.stat_2_value}</h3>
                  <p className="text-xs tracking-widest uppercase text-slate-500 mt-2 font-medium">{c.stat_2_label}</p>
                </div>
              </Reveal>

              <Reveal delay={0.8} width="100%">
                <div className="bg-white p-8 border border-gold-200/50 shadow-sm hover:shadow-xl hover:border-gold-400 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col items-center text-center">
                  <MapPin className="w-8 h-8 text-gold-500 mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-slate-900">{c.stat_3_value}</h3>
                  <p className="text-xs tracking-widest uppercase text-slate-500 mt-2 font-medium">{c.stat_3_label}</p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
