
import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';
import Reveal from './Reveal';

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "O nosso muito obrigado, por todo o acompanhamento... Foi um longo caminho até à escritura, mas que a Olga empenhou em levar a um final feliz. Esteve sempre disponível... recomendo vivamente.",
    author: "Família Silva",
    role: "Proprietários"
  },
  {
    id: 2,
    text: "A Olga continuou a ser uma excelente profissional, sempre disponível para nos ajudar a esclarecer as nossas dúvidas... recomendaremos a Olga Varajão e a Remax a familiares, amigos e conhecidos.",
    author: "Família Antunes",
    role: "Vendedores"
  },
  {
    id: 3,
    text: "Agradecemos todo o profissionalismo e dedicação! Acompanhou-nos durante todo o tempo em que a propriedade esteve a venda... no futuro se tivermos de comprar ou vender será a D. Olga que iremos contactar.",
    author: "Família Cruz",
    role: "Vendedores"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-remax-blue text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-500 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-700 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-gold-500/30 bg-gold-500/10">
              <div className="w-1.5 h-1.5 bg-gold-400"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-300">
                Experiências Reais
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif font-black mb-4 tracking-tight">O que dizem os clientes</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-16 h-1 bg-gold-500 rounded-none mt-6"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={index * 0.15} width="100%">
              <div className="bg-remax-blue/50 backdrop-blur-sm rounded-none border border-gold-500/20 relative hover:border-gold-500/50 transition-colors duration-500 h-full overflow-hidden flex flex-col p-2">
                {t.avatar && (
                  <div className="relative w-full h-72 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-full h-full object-cover object-[center_15%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 via-slate-800/20 to-transparent" />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <Quote className="w-8 h-8 text-gold-500 opacity-30 mb-4 flex-shrink-0" />
                  <p className="text-gray-300 italic mb-8 leading-relaxed whitespace-pre-line flex-1">"{t.text}"</p>
                  <div className="flex flex-col mt-auto">
                    <span className="font-bold text-white text-lg">{t.author}</span>
                    <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">{t.role}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
