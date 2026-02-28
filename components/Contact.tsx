
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

interface ContactProps {
  activeTab: 'sell' | 'buy';
}

const Contact: React.FC<ContactProps> = ({ activeTab }) => {
  const content = {
    sell: {
      title: "Vamos falar sobre o seu imóvel?",
      description: "Disponível para esclarecer dúvidas ou avaliar o seu imóvel com total transparência e sem compromisso."
    },
    buy: {
      title: "Vamos encontrar a sua nova casa?",
      description: "Disponível para ajudar na procura, análise e negociação do seu próximo investimento imobiliário em Vila Nova de Gaia."
    }
  };

  const currentContent = content[activeTab];

  return (
    <section id="contactos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form Side */}
          <div>
            <Reveal key={`title-${activeTab}`}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                {currentContent.title}
              </h2>
            </Reveal>
            <Reveal key={`desc-${activeTab}`} delay={0.2}>
              <p className="text-slate-600 text-lg mb-10">
                {currentContent.description}
              </p>
            </Reveal>

            <form className="space-y-6">
              <Reveal delay={0.3} width="100%">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Reveal delay={0.4} width="100%">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all"
                      placeholder="exemplo@email.com"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.45} width="100%">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all"
                      placeholder="910 000 000"
                    />
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.5} width="100%">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all resize-none"
                    placeholder="Como posso ajudar?"
                  ></textarea>
                </div>
              </Reveal>

              <Reveal delay={0.6} width="100%">
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button className="flex-1 inline-flex justify-center items-center px-8 py-4 bg-secondary-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </button>
                  <a href="https://wa.me/351912290463" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center px-8 py-4 bg-green-50 text-green-700 border border-green-200 rounded-lg font-semibold hover:bg-green-100 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Falar por WhatsApp
                  </a>
                </div>
              </Reveal>
            </form>
          </div>

          {/* Info Side */}
          <div className="h-fit">
            <Reveal delay={0.4} width="100%">
              <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8">Contactos Diretos</h3>

                <div className="space-y-8">
                  {/* 1. Telefone */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 mr-4 text-gold-500">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Telefone</p>
                      <a href="tel:912290463" className="text-slate-900 font-medium hover:text-gold-500 transition-colors">
                        912 290 463
                      </a>
                      <p className="text-xs text-slate-400 mt-1">(Chamada para rede móvel nacional)</p>
                    </div>
                  </div>

                  {/* 2. Email */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 mr-4 text-gold-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Email</p>
                      <a href="mailto:afmrocha@remax.pt" className="text-slate-900 font-medium hover:text-gold-500 transition-colors">
                        afmrocha@remax.pt
                      </a>
                    </div>
                  </div>

                  {/* 3. Escritório */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 mr-4 text-gold-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Escritório</p>
                      <p className="text-slate-900 font-medium">RE/MAX Family</p>
                      <p className="text-slate-700">R. Sport Clube de Canidelo 24<br />4400-594 Canidelo</p>
                    </div>
                  </div>
                </div>

                {/* Google Map Embed */}
                <div className="mt-10 rounded-xl overflow-hidden shadow-sm border border-slate-200 h-64 bg-slate-200 relative">
                  <iframe
                    src="https://www.google.com/maps?q=R.+Sport+Clube+de+Canidelo+24,+4400-594+Canidelo&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização RE/MAX White"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
