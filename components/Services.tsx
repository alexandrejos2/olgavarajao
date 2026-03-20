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
  ArrowRight,
  Circle
} from 'lucide-react';
import Reveal from './Reveal';
import { useSiteContent, useServices as useServicesData, ServiceRow } from '../lib/hooks';

const ICON_MAP: Record<string, React.ElementType> = {
  Camera, ClipboardCheck, Handshake, FileText, UserCheck,
  Search, BarChart3, CreditCard, CheckCircle, Circle,
};

const DEFAULTS: Record<string, string> = {
  tab_sell: 'Quero vender',
  tab_buy: 'Quero comprar',
  sell_title: 'O meu método para vender bem.',
  sell_subtitle: 'Um processo completo, pensado para reduzir incerteza, proteger o valor e aumentar a probabilidade de uma venda tranquila.',
  buy_title: 'Acompanhamento para Compradores: Segurança e Rigor em cada Etapa.',
  buy_subtitle: 'Encontre o imóvel ideal com apoio especializado na análise, negociação e burocracia do processo.',
  cta_text: 'Pedir Avaliação',
};

interface ServicesProps {
  activeTab: 'sell' | 'buy';
  setActiveTab: (tab: 'sell' | 'buy') => void;
}

const Services: React.FC<ServicesProps> = ({ activeTab, setActiveTab }) => {
  const raw = useSiteContent('services');
  const c = { ...DEFAULTS, ...raw };
  const { services: allServices } = useServicesData();

  const services = allServices.filter((s) => s.category === activeTab);

  return (
    <section id="servicos" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">

          <Reveal width="100%" delay={0.1}>
            <div className="flex justify-center mb-12">
              <div className="bg-slate-200 p-1.5 rounded-full flex items-center shadow-inner relative border border-slate-300/30">
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === 'sell' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c.tab_sell}
                </button>
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === 'buy' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c.tab_buy}
                </button>
                <div
                  className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gold-500 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg ${
                    activeTab === 'buy' ? 'translate-x-full' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              {activeTab === 'sell' ? c.sell_title : c.buy_title}
            </h2>
          </Reveal>

          <Reveal width="100%" delay={0.3}>
            <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {activeTab === 'sell' ? c.sell_subtitle : c.buy_subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon_name] || Circle;
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

        {activeTab === 'sell' && (
          <Reveal delay={0.6} width="100%" className="mt-16 flex justify-center">
            <Link
              to="/avaliacao"
              className="inline-flex items-center px-10 py-4 bg-gold-500 text-white rounded-lg font-bold text-lg hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-gold-600/40 group"
            >
              {c.cta_text}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Services;
