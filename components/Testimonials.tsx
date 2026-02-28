
import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';
import Reveal from './Reveal';

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "O Carlos foi de extrema importância durante todo processo, mesmo após a assinatura da escritura ele tem se mostrado super disponível para nos ajudar.\n\nRecomendo muito seu trabalho e resumiria Carlos em 3 palavras: Simpático, Prestativo e Muito Profissional\n\nObrigado Carlos !",
    author: "Talita Afonso",
    role: "Cliente"
  },
  {
    id: 2,
    text: "Desde a avaliação até à escritura, senti-me sempre acompanhada. A estratégia de marketing fez toda a diferença nas visitas.",
    author: "Maria de Lurdes",
    role: "Vendedora"
  },
  {
    id: 3,
    text: "Transparência total. Explicou-nos todos os passos e conseguiu um valor acima do que esperávamos. Recomendo vivamente.",
    author: "Carlos Mendes",
    role: "Investidor"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-500 blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-700 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">O que dizem os clientes</h2>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={index * 0.15} width="100%">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 relative hover:border-gold-500/50 transition-colors duration-300 h-full overflow-hidden flex flex-col">
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
