import React from 'react';
import Reveal from './Reveal';
import { useSiteContent, useAwards } from '../lib/hooks';

const DEFAULTS: Record<string, string> = {
  section_label: 'Prémios e Distinções',
  section_title: 'Reconhecimento',
  section_title_highlight: 'RE/MAX',
};

const Awards: React.FC = () => {
  const raw = useSiteContent('awards');
  const c = { ...DEFAULTS, ...raw };
  const { awards } = useAwards();

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 via-primary-50 to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="flex-shrink-0">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{c.section_label}</p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                {c.section_title} <span className="text-gold-500">{c.section_title_highlight}</span>
              </h3>
            </div>

            <div className="flex items-center gap-6 md:gap-10 lg:gap-12 flex-wrap justify-center md:justify-end">
              {awards.map((award, index) => (
                <Reveal key={award.id} delay={0.1 * index}>
                  <div className="group flex flex-col items-center gap-3">
                    <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center bg-white rounded-full shadow-md border border-slate-200/60 group-hover:scale-110 group-hover:shadow-xl group-hover:border-gold-400 transition-all duration-500 ease-out p-2">
                      <img
                        src={award.image_url}
                        alt={`Prémio ${award.name}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-gold-500 transition-colors">
                      {award.name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Awards;
