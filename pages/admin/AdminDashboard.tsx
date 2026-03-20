import React from 'react';
import { Link } from 'react-router-dom';
import { Image, FileText, Award, Briefcase, Hop as Home, MessageSquare, Circle as HelpCircle, Phone } from 'lucide-react';

const SECTIONS = [
  { to: '/admin/hero', label: 'Hero', icon: Image, desc: 'Titulo, subtitulo e imagem principal' },
  { to: '/admin/about', label: 'Sobre', icon: FileText, desc: 'Bio, foto e estatisticas' },
  { to: '/admin/awards', label: 'Premios', icon: Award, desc: 'Premios e distincoes RE/MAX' },
  { to: '/admin/services', label: 'Servicos', icon: Briefcase, desc: 'Servicos de venda e compra' },
  { to: '/admin/why', label: 'Porque Eu', icon: FileText, desc: 'Beneficios da exclusividade' },
  { to: '/admin/properties', label: 'Imoveis', icon: Home, desc: 'Portfolio de imoveis' },
  { to: '/admin/testimonials', label: 'Testemunhos', icon: MessageSquare, desc: 'Avaliacoes de clientes' },
  { to: '/admin/faq', label: 'FAQ', icon: HelpCircle, desc: 'Perguntas frequentes' },
  { to: '/admin/contact', label: 'Contacto', icon: Phone, desc: 'Telefone, email e morada' },
  { to: '/admin/avaliacao', label: 'Pag. Avaliacao', icon: FileText, desc: 'Conteudo da pagina de avaliacao' },
  { to: '/admin/submissions', label: 'Submissoes', icon: FileText, desc: 'Pedidos de contacto e avaliacao' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6">Painel de Gestao</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                <s.icon className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-900">{s.label}</h3>
            </div>
            <p className="text-sm text-slate-500">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
