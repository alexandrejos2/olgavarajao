
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex flex-col">
            <span className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              ANDREIA ROCHA
            </span>
            <span className={`text-xs font-medium tracking-widest uppercase ${isScrolled ? 'text-gold-500' : 'text-gray-200'}`}>
              RE/MAX Family
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-500 ${isScrolled ? 'text-slate-700' : 'text-white/90'
                }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/avaliacao"
            className={`text-sm font-semibold transition-colors border-b-2 pb-0.5 ${isScrolled
              ? 'text-gold-600 border-gold-500 hover:text-gold-700'
              : 'text-gold-400 border-gold-400/60 hover:text-gold-300'
              }`}
          >
            Avaliar Imóvel
          </a>
          <a
            href="#contactos"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${isScrolled
              ? 'bg-secondary-900 text-white hover:bg-gray-700'
              : 'bg-white text-secondary-900 hover:bg-gray-100'
              }`}
          >
            Agendar conversa
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-800 font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/avaliacao"
            className="text-gold-600 font-semibold text-lg border-b border-gold-200 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Avaliar Imóvel
          </a>
          <a
            href="#contactos"
            className="w-full text-center bg-secondary-900 text-white py-3 rounded-lg font-semibold mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Agendar conversa
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
