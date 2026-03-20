import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';
import { useSiteContent } from '../lib/hooks';
import { supabase } from '../lib/supabase';

const DEFAULTS: Record<string, string> = {
  sell_title: 'Vamos falar sobre o seu imóvel?',
  sell_description: 'Disponível para esclarecer dúvidas ou avaliar o seu imóvel com total transparência e sem compromisso.',
  buy_title: 'Vamos encontrar a sua nova casa?',
  buy_description: 'Disponível para ajudar na procura, análise e negociação do seu próximo investimento imobiliário em Évora e Alentejo.',
  phone: '927 411 641',
  phone_raw: '927411641',
  email: 'ovarajao@remax.pt',
  office_name: 'RE/MAX Move Limiana',
  office_address: '4990-081 Pte. de Lima',
  whatsapp_number: '351927411641',
  maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.289126236097!2d-8.583392423981968!3d41.76022007278648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25a5f9ac4c3d5f%3A0x28f1829953ca4b56!2sRemax%20Limiana!5e1!3m2!1spt-PT!2spt!4v1772805111693!5m2!1spt-PT!2spt',
};

interface ContactProps {
  activeTab: 'sell' | 'buy';
}

const Contact: React.FC<ContactProps> = ({ activeTab }) => {
  const raw = useSiteContent('contact');
  const c = { ...DEFAULTS, ...raw };
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const title = activeTab === 'sell' ? c.sell_title : c.buy_title;
  const description = activeTab === 'sell' ? c.sell_description : c.buy_description;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim()) return;
    setStatus('sending');
    const { error } = await supabase.from('form_submissions').insert({
      type: 'contacto',
      data: form,
    });
    setStatus(error ? 'error' : 'sent');
    if (!error) setForm({ nome: '', email: '', telefone: '', mensagem: '' });
  };

  return (
    <section id="contactos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <Reveal key={`title-${activeTab}`}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                {title}
              </h2>
            </Reveal>
            <Reveal key={`desc-${activeTab}`} delay={0.2}>
              <p className="text-slate-600 text-lg mb-10">
                {description}
              </p>
            </Reveal>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Reveal delay={0.3} width="100%">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm(p => ({ ...p, nome: e.target.value }))}
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
                      value={form.email}
                      onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
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
                      value={form.telefone}
                      onChange={(e) => setForm(p => ({ ...p, telefone: e.target.value }))}
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
                    value={form.mensagem}
                    onChange={(e) => setForm(p => ({ ...p, mensagem: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all resize-none"
                    placeholder="Como posso ajudar?"
                  ></textarea>
                </div>
              </Reveal>

              <Reveal delay={0.6} width="100%">
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 inline-flex justify-center items-center px-8 py-4 bg-secondary-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {status === 'sending' ? 'A enviar...' : status === 'sent' ? 'Enviado!' : 'Enviar Mensagem'}
                  </button>
                  <a href={`https://wa.me/${c.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center px-8 py-4 bg-green-50 text-green-700 border border-green-200 rounded-lg font-semibold hover:bg-green-100 transition-colors">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Falar por WhatsApp
                  </a>
                </div>
              </Reveal>
            </form>
          </div>

          <div className="h-fit">
            <Reveal delay={0.4} width="100%">
              <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8">Contactos Diretos</h3>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 mr-4 text-gold-500">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Telefone</p>
                      <a href={`tel:${c.phone_raw}`} className="text-slate-900 font-medium hover:text-gold-500 transition-colors">
                        {c.phone}
                      </a>
                      <p className="text-xs text-slate-400 mt-1">(Chamada para rede móvel nacional)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 mr-4 text-gold-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Email</p>
                      <a href={`mailto:${c.email}`} className="text-slate-900 font-medium hover:text-gold-500 transition-colors">
                        {c.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 mr-4 text-gold-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Escritório</p>
                      <p className="text-slate-900 font-medium">{c.office_name}</p>
                      <p className="text-slate-700">{c.office_address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 rounded-xl overflow-hidden shadow-sm border border-slate-200 h-64 bg-slate-200 relative">
                  <iframe
                    src={c.maps_embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização RE/MAX Move Limiana"
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
