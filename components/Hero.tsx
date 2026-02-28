
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dxrk58emm/image/upload/v1770740863/ice-124946-72421078_3XL-359778-scaled-e1700051560864_yooatl.jpg"
          alt="Coimbra Real Estate"
          className="w-full h-full object-cover animate-[scale_25s_ease-in-out_infinite_alternate]"
          style={{ animationDuration: '30s' }}
        />
        {/* Overlay gradient - Darker at bottom/left for text readability */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(12,31,63,0.92) 0%, rgba(12,31,63,0.55) 50%, transparent 100%)'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <Reveal delay={0.2} yOffset={20}>
            <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
              <span className="text-white text-xs font-semibold tracking-wider uppercase">Consultoria Imobiliária em Coimbra</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.4} yOffset={30}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-sm">
              Venda ou compre casa em Coimbra com acompanhamento profissional e transparente.
            </h1>
          </Reveal>
          
          <Reveal delay={0.6} yOffset={30}>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed">
              Do primeiro contacto à escritura, tem estratégia, clareza e alguém ao seu lado em cada decisão.
            </p>
          </Reveal>
          
          <Reveal delay={0.8} yOffset={20}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contactos" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white rounded-lg font-semibold text-lg hover:bg-gold-600 transition-all duration-300 shadow-lg shadow-gold-600/20 group"
              >
                Agendar conversa
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://wa.me/351915128113" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 group"
              >
                <MessageCircle className="mr-2 w-5 h-5 text-green-400 group-hover:text-green-600 transition-colors" />
                Falar por WhatsApp
              </a>
            </div>
          </Reveal>
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
