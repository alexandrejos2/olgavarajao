import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

const HeroOption4: React.FC = () => {
    return (
        <section id="home-opt-4" className="relative min-h-screen flex flex-col lg:flex-row">
            {/* Left Content Half */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-900 pt-32 pb-16 lg:py-20 px-6 lg:px-12 xl:px-20 relative z-10">
                <div className="max-w-xl w-full">
                    <Reveal delay={0.2} yOffset={20}>
                        <div className="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                            <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">Consultoria Imobiliária em Évora</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.4} yOffset={30}>
                        <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-sm">
                            Venda ou compre casa em Évora com acompanhamento profissional.
                        </h1>
                    </Reveal>

                    <Reveal delay={0.6} yOffset={30}>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg font-light leading-relaxed">
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
                                href="https://wa.me/351965006443"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/20 text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 group"
                            >
                                <MessageCircle className="mr-2 w-5 h-5 text-green-400 group-hover:text-green-600 transition-colors" />
                                Falar por WhatsApp
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Right Image Half */}
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://res.cloudinary.com/dxrk58emm/image/upload/v1772536224/70349860_2659579564093365_2325093731239198720_n_hfaybm.jpg"
                        alt="Nuno Manita - Consultor Imobiliário"
                        className="w-full h-full object-cover object-center lg:object-[20%_center] animate-[scale_30s_ease-in-out_infinite_alternate]"
                        style={{ animationDuration: '40s' }}
                    />
                    {/* Subtle gradient to merge image with the dark side on desktop */}
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

export default HeroOption4;
