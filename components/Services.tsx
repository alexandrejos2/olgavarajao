
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  ClipboardCheck,
  Handshake,
  FileText,
  UserCheck,
  Search,
  BarChart3,
  CreditCard,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Reveal from './Reveal';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const sellServices: ServiceItem[] = [
  {
    id: 1,
    title: "Avaliação Estratégica",
    description: "Preço definido com base em dados reais e análise de mercado atual, evitando posicionamentos que prejudicam o valor.",
    icon: ClipboardCheck
  },
  {
    id: 2,
    title: "Posicionamento e Marketing",
    description: "Apresentação profissional e comunicação coerente, focadas em gerar perceção de valor e atrair compradores qualificados.",
    icon: Camera
  },
  {
    id: 3,
    title: "Qualificação e Gestão de Visitas",
    description: "Organização estruturada de contactos e visitas com intenção real, reduzindo desgaste desnecessário.",
    icon: UserCheck
  },
  {
    id: 4,
    title: "Negociação Profissional",
    description: "Negociação conduzida com método, firmeza e foco na proteção do seu interesse.",
    icon: Handshake
  },
  {
    id: 5,
    title: "Acompanhamento até à Escritura",
    description: "Coordenação documental e apoio contínuo até ao fecho final.",
    icon: FileText
  }
];

const buyServices: ServiceItem[] = [
  {
    id: 1,
    title: "Acompanhamento para compradores",
    description: "Um serviço dedicado e exclusivo para quem procura a casa ideal com total segurança.",
    icon: UserCheck
  },
  {
    id: 2,
    title: "Identificação de oportunidades",
    description: "Acesso privilegiado a imóveis no mercado e off-market que se ajustam ao seu perfil.",
    icon: Search
  },
  {
    id: 3,
    title: "Análise de mercado",
    description: "Estudo comparativo rigoroso para garantir que o seu investimento é seguro e o preço é justo.",
    icon: BarChart3
  },
  {
    id: 4,
    title: "Apoio na negociação",
    description: "Estratégia focada em obter as melhores condições de aquisição e proteção dos seus interesses.",
    icon: Handshake
  },
  {
    id: 5,
    title: "Verificação documental",
    description: "Análise minuciosa de toda a documentação do imóvel antes de qualquer compromisso formal.",
    icon: FileText
  },
  {
    id: 6,
    title: "Coordenação com financiamento",
    description: "Ligação direta com especialistas para encontrar a solução de crédito habitação mais vantajosa.",
    icon: CreditCard
  },
  {
    id: 7,
    title: "Acompanhamento até escritura",
    description: "Presença e apoio constante em todos os atos formais até ao momento da entrega das chaves.",
    icon: CheckCircle
  }
];

interface ServicesProps {
  activeTab: 'sell' | 'buy';
  setActiveTab: (tab: 'sell' | 'buy') => void;
}

const Services: React.FC<ServicesProps> = ({ activeTab, setActiveTab }) => {
  const services = activeTab === 'sell' ? sellServices : buyServices;

  return (
    <section id="servicos" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          
          {/* Toggle Switch */}
          <Reveal width="100%" delay={0.1}>
            <div className="flex justify-center mb-12">
              <div className="bg-slate-200 p-1.5 rounded-full flex items-center shadow-inner relative border border-slate-300/30">
                <button 
                  onClick={() => setActiveTab('sell')}
                  className={`relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === 'sell' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quero vender
                </button>
                <button 
                  onClick={() => setActiveTab('buy')}
                  className={`relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === 'buy' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quero comprar
                </button>
                {/* Sliding Background */}
                <div
                  className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gold-500 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg ${
                    activeTab === 'buy' ? 'translate-x-full' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </div>
          </Reveal>

          {/* Dynamic Header */}
          <Reveal width="100%" delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              {activeTab === 'sell'
                ? "O meu método para vender bem."
                : "Acompanhamento para Compradores: Segurança e Rigor em cada Etapa."}
            </h2>
          </Reveal>

          <Reveal width="100%" delay={0.3}>
            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {activeTab === 'sell'
                ? "Um processo completo, pensado para reduzir incerteza, proteger o valor e aumentar a probabilidade de uma venda tranquila."
                : "Encontre o imóvel ideal com apoio especializado na análise, negociação e burocracia do processo."}
            </p>
          </Reveal>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={`${activeTab}-${service.id}`} delay={index * 0.1} width="100%" className="h-full">
                <div
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 group h-full flex flex-col"
                >
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:rotate-6 transition-all duration-500">
                    <Icon className="w-7 h-7 text-gold-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-gold-500 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm flex-grow">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA Button */}
        {activeTab === 'sell' && (
          <Reveal delay={0.6} width="100%" className="mt-16 flex justify-center">
            <Link
              to="/avaliacao"
              className="inline-flex items-center px-10 py-4 bg-gold-500 text-white rounded-lg font-bold text-lg hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-gold-600/40 group"
            >
              Pedir Avaliação
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Services;
