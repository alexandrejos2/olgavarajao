
import React from 'react';
import Reveal from './Reveal';

const awards = [
  {
    id: 1,
    name: "Estrela",
    image: "https://res.cloudinary.com/dxrk58emm/image/upload/v1764693490/premio-estrela_z5lrl5.png"
  },
  {
    id: 2,
    name: "Presidente",
    image: "https://res.cloudinary.com/dxrk58emm/image/upload/v1764693490/premio-presidente_iu1i4k.png"
  },
  {
    id: 3,
    name: "Executivo",
    image: "https://res.cloudinary.com/dxrk58emm/image/upload/v1764693490/premio-executivo_zvwrge.png"
  },
  {
    id: 4,
    name: "100%",
    image: "https://res.cloudinary.com/dxrk58emm/image/upload/v1767034015/premio-100porcento_vmzqa2.png"
  },
  {
    id: 5,
    name: "Balão de Prata",
    image: "https://res.cloudinary.com/dxrk58emm/image/upload/v1764936479/balao-prata-pb_msdjgv.png"
  },
  {
    id: 6,
    name: "Golden Club",
    image: "https://res.cloudinary.com/dxrk58emm/image/upload/v1765469831/golden-club_jyxwcq.png"
  }
];

const Awards: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 via-primary-50 to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="flex-shrink-0">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Prémios e Distinções</p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                Reconhecimento <span className="text-gold-500">RE/MAX</span>
              </h3>
            </div>

            <div className="flex items-center gap-6 md:gap-10 lg:gap-12 flex-wrap justify-center md:justify-end">
              {awards.map((award, index) => (
                <Reveal key={award.id} delay={0.1 * index}>
                  <div className="group flex flex-col items-center gap-3">
                    <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center bg-white rounded-full shadow-md border border-slate-200/60 group-hover:scale-110 group-hover:shadow-xl group-hover:border-gold-400 transition-all duration-500 ease-out p-2">
                      <img
                        src={award.image}
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
