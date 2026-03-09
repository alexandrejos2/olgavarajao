
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    question: "Quanto tempo demora vender um imóvel?",
    answer: `O tempo depende diretamente do posicionamento inicial.\n\nPreço estratégico correto e comunicação coerente reduzem significativamente o tempo médio de venda.\n\nO objetivo não é vender depressa.\nÉ vender no ponto certo entre tempo e valor.`
  },
  {
    question: "Porque trabalha apenas em regime de exclusividade?",
    answer: `Porque resultados consistentes exigem controlo total da estratégia.\n\nQuando um imóvel é promovido por vários agentes, a comunicação fragmenta-se, o posicionamento perde força e o valor começa a ser negociado para baixo.\n\nA exclusividade permite definir uma estratégia clara, investir com segurança e assumir responsabilidade total pelo resultado.`
  },
  {
    question: "Fico \"preso\" a um contrato?",
    answer: `Não se trata de ficar preso.\nTrata-se de criar compromisso mútuo para que a estratégia tenha tempo e foco para funcionar.\n\nSem compromisso, não há estrutura.\nSem estrutura, não há previsibilidade no resultado.\n\nO contrato define regras claras desde o início, com total transparência.`
  },
  {
    question: "Porque devo pagar comissão se posso vender sozinho?",
    answer: `Vender sozinho é possível.\n\nMas vender bem exige:\n\n• Posicionamento estratégico\n• Filtragem de compradores\n• Negociação estruturada\n• Proteção jurídica até à escritura\n\nA comissão não remunera apenas divulgação.\nRemunera estratégia, estrutura e responsabilidade assumida sobre o seu património.`
  },
  {
    question: "A comissão é negociável?",
    answer: `A comissão é definida com base no nível de responsabilidade e investimento envolvidos no processo.\n\nO foco não é ser o mais barato do mercado.\nÉ garantir que a estratégia implementada protege e maximiza o valor do imóvel.`
  }
];

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Reveal width="100%" delay={index * 0.08}>
      <div className={`border-b border-slate-200 transition-colors duration-300 ${open ? 'border-gold-500/40' : ''}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <span className={`text-lg font-semibold transition-colors duration-300 pr-4 ${open ? 'text-gold-600' : 'text-slate-900 group-hover:text-gold-600'}`}>
            {question}
          </span>
          <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? 'border-gold-500 bg-gold-500/10 rotate-180' : 'border-slate-300 group-hover:border-gold-500/60'}`}>
            <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-gold-600' : 'text-slate-500 group-hover:text-gold-600'}`} />
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="pb-6 pr-12">
            {answer.split('\n').map((line, i) => (
              line.trim() === '' ? (
                <div key={i} className="h-3" />
              ) : (
                <p key={i} className={`leading-relaxed ${line.startsWith('•') ? 'text-slate-600 pl-2' : 'text-slate-600'}`}>
                  {line}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gold-500 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-slate-400 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
              Perguntas frequentes
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="w-16 h-1 bg-gold-500 rounded-full" />
          </Reveal>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
