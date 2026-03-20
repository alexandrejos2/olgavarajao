import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Hop as Home } from 'lucide-react';
import { useSiteContent } from '../lib/hooks';

const DEFAULTS: Record<string, string> = {
  brand_name: 'OLGA VARAJÃO',
  brand_role: 'CONSULTORA IMOBILIÁRIA',
  facebook_url: '#',
  instagram_url: 'https://instagram.com/olgavarajao',
  email: 'ovarajao@remax.pt',
  phone: '+351 927 411 641',
  office: 'RE/MAX Move Limiana',
};

const Footer: React.FC = () => {
  const raw = useSiteContent('footer');
  const c = { ...DEFAULTS, ...raw };

  return (
    <footer className="text-slate-300 border-t border-primary-800 bg-primary-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <Home className="w-8 h-8" />
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-xl tracking-tight">{c.brand_name}</span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400">{c.brand_role}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a href={c.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href={c.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Menu</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-gold-400 transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-gold-400 transition-colors">Sobre Mim</a></li>
              <li><a href="#servicos" className="hover:text-gold-400 transition-colors">Serviços</a></li>
              <li><a href="#imoveis" className="hover:text-gold-400 transition-colors">Portefólio</a></li>
              <li><a href="#contactos" className="hover:text-gold-400 transition-colors">Contactos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Termos de Utilização</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Livro de Reclamações</a></li>
            </ul>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {c.brand_name}. Todos os direitos reservados. <Link to="/admin/login" className="text-slate-600 hover:text-slate-400 transition-colors">*</Link></p>
              <p className="text-xs text-slate-600 mt-2">{c.office} | {c.email} | {c.phone}</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
