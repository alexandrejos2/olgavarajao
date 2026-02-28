
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    question: "Porque trabalha apenas em regime de exclusividade?",
    answer: `Porque resultados consistentes exigem controlo total da estratégia.

Quando um imóvel é promovido por vários agentes, a comunicação fragmenta-se, o posicionamento perde força e o valor começa a ser negociado para baixo.

A exclusividade permite definir uma estratégia clara, investir com segurança e assumir responsabilidade total pelo resultado.`
  },
  {
    question: "Fico \"preso\" a um contrato?",
    answer: `Não se trata de ficar preso.
Trata-se de criar compromisso mútuo para que a estratégia tenha tempo e foco para funcionar.

Sem compromisso, não há estrutura.
Sem estrutura, não há previsibilidade no resultado.

O contrato define regras claras desde o início, com total transparência.`
  },
  {
    question: "Porque devo pagar comissão se posso vender sozinho?",
    answer: `Vender sozinho é possível.

Mas vender bem exige:

• Posicionamento estratégico
• Filtragem de compradores
• Negociação estruturada
• Proteção jurídica até à escritura

A comissão não remunera apenas divulgação.
Remunera estratégia, estrutura e responsabilidade assumida sobre o seu património.`
  },
  {
    question: "A comissão é negociável?",
    answer: `A comissão é definida com base no nível de responsabilidade e investimento envolvidos no processo.

O foco não é ser o mais barato do mercado.
É garantir que a estratégia implementada protege e maximiza o valor do imóvel.`
  },
  {
    question: "Quanto tempo demora vender um imóvel?",
    answer: `O tempo depende diretamente do posicionamento inicial.

Preço estratégico correto e comunicação coerente reduzem significativamente o tempo médio de venda.

O objetivo não é vender depressa.
É vender no ponto certo entre tempo e valor.`
  }
];

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Reveal width="100%" delay={index * 0.08}>
      <div className={`border-b border-slate-700 transition-colors duration-300 ${open ? 'border-gold-500/40' : ''}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <span className={`text-lg font-semibold transition-colors duration-300 pr-4 ${open ? 'text-gold-400' : 'text-white group-hover:text-gold-400'}`}>
            {question}
          </span>
          <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? 'border-gold-500 bg-gold-500/10 rotate-180' : 'border-slate-600 group-hover:border-gold-500/60'}`}>
            <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-gold-400' : 'text-slate-400 group-hover:text-gold-400'}`} />
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
                <p key={i} className={`leading-relaxed ${line.startsWith('•') ? 'text-gray-300 pl-2' : 'text-gray-300'}`}>
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
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gold-500 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-slate-600 blur-3xl" />
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
