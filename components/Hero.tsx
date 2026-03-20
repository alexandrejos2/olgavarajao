import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';
import { useSiteContent } from '../lib/hooks';

const DEFAULTS: Record<string, string> = {
  badge: 'Consultoria Imobiliária em Ponte de Lima',
  title: 'Venda ou compre casa em Ponte de Lima com acompanhamento profissional e transparente.',
  subtitle: 'Do primeiro contacto à escritura, tem estratégia, clareza e alguém ao seu lado em cada decisão.',
  cta_primary: 'Agendar conversa',
  cta_secondary: 'WhatsApp',
  profile_image_url: 'https://res.cloudinary.com/dxrk58emm/image/upload/v1772799577/olga-varajao_ywiaiw.png',
  whatsapp_url: 'https://wa.me/351927411641',
};

const Hero: React.FC = () => {
  const raw = useSiteContent('hero');
  const c = { ...DEFAULTS, ...raw };

  return (
    <section id="home" className="relative min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-remax-blue pt-32 pb-16 lg:py-20 px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-xl w-full">
          <Reveal delay={0.2} yOffset={20}>
            <div className="inline-block px-4 py-1.5 mb-8 border border-gold-500/30 rounded-full bg-gold-500/10 backdrop-blur-md">
              <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
                {c.badge}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.4} yOffset={30}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-black text-white leading-[1.1] mb-8 drop-shadow-lg tracking-tight">
              {c.title}
            </h1>
          </Reveal>

          <Reveal delay={0.6} yOffset={30}>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg font-light leading-relaxed">
              {c.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.8} yOffset={20}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contactos"
                className="inline-flex items-center justify-center px-10 py-5 bg-gold-500 text-white rounded-none font-medium text-sm tracking-[0.2em] uppercase hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-gold-900/40 group"
              >
                {c.cta_primary}
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={c.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white/30 text-white rounded-none font-medium text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-remax-blue hover:border-white transition-all duration-300 group"
              >
                <MessageCircle className="mr-3 w-4 h-4 text-white group-hover:text-green-500 transition-colors" />
                {c.cta_secondary}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-remax-blue via-remax-blue/20 to-transparent z-10 w-full hidden lg:block pointer-events-none h-1/3"></div>
        <div className="absolute inset-0">
          <img
            src={c.profile_image_url}
            alt="Olga Varajão - Consultora Imobiliária"
            className="w-full h-full object-cover object-[center_15%] lg:object-[20%_top] animate-[scale_40s_ease-in-out_infinite_alternate]"
            style={{ animationDuration: '40s' }}
          />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        @keyframes scale {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
