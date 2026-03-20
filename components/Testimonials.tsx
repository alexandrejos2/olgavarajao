import React from 'react';
import { Quote } from 'lucide-react';
import Reveal from './Reveal';
import { useSiteContent, useTestimonials as useTestimonialsData } from '../lib/hooks';

const DEFAULTS: Record<string, string> = {
  badge: 'Experiências Reais',
  section_title: 'O que dizem os clientes',
};

const Testimonials: React.FC = () => {
  const raw = useSiteContent('testimonials');
  const c = { ...DEFAULTS, ...raw };
  const { testimonials } = useTestimonialsData();

  return (
    <section className="py-32 bg-remax-blue text-white relative overflow-hidden">
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
                {c.badge}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif font-black mb-4 tracking-tight">{c.section_title}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-16 h-1 bg-gold-500 rounded-none mt-6"></div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={index * 0.15} width="100%">
              <div className="bg-remax-blue/50 backdrop-blur-sm rounded-none border border-gold-500/20 relative hover:border-gold-500/50 transition-colors duration-500 h-full overflow-hidden flex flex-col p-2">
                {t.avatar_url && (
                  <div className="relative w-full h-72 flex-shrink-0">
                    <img
                      src={t.avatar_url}
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
