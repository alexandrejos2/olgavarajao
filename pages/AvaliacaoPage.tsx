import React, { useEffect, useRef } from 'react';
import AvaliacaoNavbar from '../components/avaliacao/AvaliacaoNavbar';
import AvaliacaoHero from '../components/avaliacao/AvaliacaoHero';
import DiferenciacaoBlock from '../components/avaliacao/DiferenciacaoBlock';
import MultiStepForm from '../components/avaliacao/MultiStepForm';
import ProvasSocial from '../components/avaliacao/ProvasSocial';
import AvaliacaoCTA from '../components/avaliacao/AvaliacaoCTA';

const AvaliacaoPage: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-gold-500/20 selection:text-gold-900">
      <AvaliacaoNavbar />
      <main>
        <AvaliacaoHero onCTAClick={scrollToForm} />
        <DiferenciacaoBlock />
        <div ref={formRef}>
          <MultiStepForm />
        </div>
        <ProvasSocial />
        <AvaliacaoCTA onCTAClick={scrollToForm} />
      </main>
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif font-bold text-slate-900">ANDREIA ROCHA</p>
            <p className="text-xs text-gold-500 font-semibold tracking-widest uppercase">RE/MAX Family · Vila Nova de Gaia</p>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Andreia Rocha. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AvaliacaoPage;
