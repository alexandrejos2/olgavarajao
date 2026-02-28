
import React from 'react';
import { MapPin, Users, Award } from 'lucide-react';
import Reveal from './Reveal';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image Side */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:-mt-4 lg:pr-4">
            <Reveal duration={1000} yOffset={40}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gray-100 rounded-tl-3xl -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary-50 rounded-br-3xl -z-10"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] w-full min-h-[500px] lg:min-h-[600px] group">
                  <img
                    src="https://res.cloudinary.com/dxrk58emm/image/upload/v1770740487/e105d692-cbce-42be-afba-3ff12b8d9443_ifeape.jpg"
                    alt="Carlos Matos Consultor"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-8">
                    <p className="text-white font-serif text-2xl font-bold">Carlos Matos</p>
                    <p className="text-gray-300 text-sm tracking-widest uppercase mt-1">RE/MAX White</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <div className="mb-6">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  Profissionalismo.<br/>
                  Estratégia.<br/>
                  <span className="text-gold-500">Compromisso com Resultados.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="w-20 h-1 bg-gold-500 mb-8"></div>
              </Reveal>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
              <Reveal delay={0.3}>
                <p>
                  Consultor imobiliário RE/MAX com mais de 6 anos de experiência em Coimbra.
                  Conheço profundamente o mercado local e acompanho cada venda com estratégia, rigor e total transparência.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p>
                  Trabalho com avaliação precisa, marketing profissional e negociação orientada ao melhor resultado possível.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="font-medium text-slate-900">
                  Se procura um acompanhamento sério, organizado e focado em resultados, estou aqui para ajudar.
                </p>
              </Reveal>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <Reveal delay={0.6} width="100%">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                  <Users className="w-8 h-8 text-gold-500 mb-3" />
                  <h3 className="text-3xl font-bold text-slate-900">+100</h3>
                  <p className="text-sm text-slate-500 mt-1">Proprietários Acompanhados</p>
                </div>
              </Reveal>
              
              <Reveal delay={0.7} width="100%">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                  <Award className="w-8 h-8 text-gold-500 mb-3" />
                  <h3 className="text-xl font-bold text-slate-900">Expert</h3>
                  <p className="text-sm text-slate-500 mt-1">Vendas Residenciais</p>
                </div>
              </Reveal>

              <Reveal delay={0.8} width="100%">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                  <MapPin className="w-8 h-8 text-gold-500 mb-3" />
                  <h3 className="text-xl font-bold text-slate-900">Coimbra</h3>
                  <p className="text-sm text-slate-500 mt-1">Zona de Atuação</p>
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
