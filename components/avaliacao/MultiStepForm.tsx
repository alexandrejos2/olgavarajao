import React, { useState, useRef } from 'react';
import { ArrowRight, CheckCircle, MessageCircle, ChevronDown } from 'lucide-react';
import { useSiteContent } from '../../lib/hooks';
import { supabase } from '../../lib/supabase';

interface FormData {
  zona: string;
  tipologia: string;
  estado: string;
  nome: string;
  telefone: string;
  email: string;
}

interface Errors {
  [key: string]: string;
}

const tipologias = [
  'Moradia',
  'Apartamento',
  'Prédio',
  'Quinta',
  'Terreno',
  'Loja',
  'Armazém',
  'Escritório',
  'Outros',
];

const estadosImovel = [
  'Novo',
  'Bom estado',
  'A necessitar de obras',
];

const steps = ['Imóvel', 'Contacto', 'Avaliação'];

const MultiStepForm: React.FC = () => {
  const raw = useSiteContent('avaliacao_form');
  const WHATSAPP_NUMBER = raw.whatsapp_number || '351927411641';
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const [formData, setFormData] = useState<FormData>({
    zona: '',
    tipologia: '',
    estado: '',
    nome: '',
    telefone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [privacidade, setPrivacidade] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.zona.trim()) newErrors.zona = 'Campo obrigatório';
    if (!formData.tipologia) newErrors.tipologia = 'Selecione uma opção';
    if (!formData.estado) newErrors.estado = 'Selecione uma opção';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!formData.telefone.trim()) newErrors.telefone = 'Campo obrigatório';
    else if (!/^[\d\s+()-]{9,}$/.test(formData.telefone)) newErrors.telefone = 'Número inválido';
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!privacidade) newErrors.privacidade = 'É necessário aceitar para continuar';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (next: 1 | 2 | 3, direction: 'left' | 'right') => {
    setSlideDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 250);
  };

  const handleStep1Submit = () => {
    if (validateStep1()) goToStep(2, 'left');
  };

  const handleStep2Submit = async () => {
    if (!validateStep2()) return;
    await supabase.from('form_submissions').insert({
      type: 'avaliacao',
      data: formData,
    });
    goToStep(3, 'left');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá Olga! Pedi uma análise para o meu imóvel:\n• Zona: ${formData.zona}\n• Tipo: ${formData.tipologia}\n• Estado: ${formData.estado}\n\nO meu nome é ${formData.nome}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const progressPercent = step === 1 ? 0 : step === 2 ? 50 : 100;

  return (
    <section id="formulario" className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-500 mb-3">
            Análise gratuita
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Vamos começar pelo essencial.
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="px-8 pt-8 pb-0">
            <div className="flex items-center justify-between mb-2">
              {steps.map((label, i) => {
                const stepNum = i + 1;
                const isActive = stepNum === step;
                const isCompleted = stepNum < step;
                return (
                  <div key={label} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isCompleted
                          ? 'bg-gold-500 text-white'
                          : isActive
                            ? 'bg-remax-blue text-white'
                            : 'bg-slate-100 text-slate-400'
                          }`}
                      >
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNum}
                      </div>
                      <span
                        className={`text-xs font-medium transition-colors ${isActive ? 'text-slate-900' : isCompleted ? 'text-gold-500' : 'text-slate-400'
                          }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 mx-3 h-[2px] mb-5 bg-slate-100 relative" style={{ minWidth: 40 }}>
                        <div
                          className="absolute inset-y-0 left-0 bg-gold-500 transition-all duration-500"
                          style={{ width: isCompleted ? '100%' : '0%' }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-1 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gold-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div
            ref={formRef}
            className={`px-8 pb-10 transition-all duration-250 ${animating ? (slideDir === 'left' ? 'opacity-0 -translate-x-4' : 'opacity-0 translate-x-4') : 'opacity-100 translate-x-0'
              }`}
            style={{ transition: 'opacity 0.25s ease, transform 0.25s ease' }}
          >
            {step === 1 && (
              <div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Zona ou morada do imóvel
                    </label>
                    <input
                      type="text"
                      value={formData.zona}
                      onChange={(e) => handleChange('zona', e.target.value)}
                      placeholder="Ex: Mafamude, Canidelo..."
                      className={`w-full px-4 py-3.5 rounded-xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all ${errors.zona ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                        }`}
                    />
                    {errors.zona && <p className="mt-1.5 text-xs text-red-500">{errors.zona}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tipo de imóvel
                    </label>
                    <div className="relative">
                      <select
                        value={formData.tipologia}
                        onChange={(e) => handleChange('tipologia', e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl border text-slate-900 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all ${errors.tipologia ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                          } ${!formData.tipologia ? 'text-slate-400' : 'text-slate-900'}`}
                      >
                        <option value="" disabled>Selecione o tipo</option>
                        {tipologias.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors.tipologia && <p className="mt-1.5 text-xs text-red-500">{errors.tipologia}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Estado do imóvel
                    </label>
                    <div className="relative">
                      <select
                        value={formData.estado}
                        onChange={(e) => handleChange('estado', e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all ${errors.estado ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                          } ${!formData.estado ? 'text-slate-400' : 'text-slate-900'}`}
                      >
                        <option value="" disabled>Selecione o estado</option>
                        {estadosImovel.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors.estado && <p className="mt-1.5 text-xs text-red-500">{errors.estado}</p>}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleStep1Submit}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-remax-blue hover:bg-slate-800 text-white rounded-xl font-bold text-base transition-all duration-300 group"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    Esta informação permite analisar corretamente o mercado local.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-slate-500 text-sm mb-5">
                  Para lhe enviar a análise personalizada, preciso dos seus dados de contacto.
                </p>
                <div className="flex items-center gap-4 bg-gold-50 border border-gold-100 rounded-xl px-4 py-4 mb-6">
                  <img
                    src="https://res.cloudinary.com/dxrk58emm/image/upload/v1772799577/olga-varajao_ywiaiw.png"
                    alt="Olga Varajão"
                    className="w-14 h-14 rounded-full object-cover object-top flex-shrink-0 border-2 border-gold-400 shadow-md"
                  />
                  <p className="text-sm text-slate-700 leading-snug font-medium">
                    Análise realizada diretamente por{' '}
                    <span className="font-bold text-slate-900">Olga Varajão</span>
                    , especialista no Alto Minho.
                  </p>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleChange('nome', e.target.value)}
                      placeholder="O seu nome completo"
                      className={`w-full px-4 py-3.5 rounded-xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all ${errors.nome ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                        }`}
                    />
                    {errors.nome && <p className="mt-1.5 text-xs text-red-500">{errors.nome}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => handleChange('telefone', e.target.value)}
                      placeholder="+351 9XX XXX XXX"
                      className={`w-full px-4 py-3.5 rounded-xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all ${errors.telefone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                        }`}
                    />
                    {errors.telefone && <p className="mt-1.5 text-xs text-red-500">{errors.telefone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="o.seu.email@exemplo.com"
                      className={`w-full px-4 py-3.5 rounded-xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
                        }`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={privacidade}
                      onChange={(e) => {
                        setPrivacidade(e.target.checked);
                        if (e.target.checked && errors.privacidade) {
                          setErrors((prev) => { const next = { ...prev }; delete next.privacidade; return next; });
                        }
                      }}
                      className="mt-0.5 w-4 h-4 flex-shrink-0 accent-gold-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                      Autorizo o contacto por parte de{' '}
                      <span className="font-semibold text-slate-700">Olga Varajão</span>
                      , representante da RE/MAX Move Limiana, para efeitos da análise solicitada, nos termos da política de privacidade.
                    </span>
                  </label>
                  {errors.privacidade && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.privacidade}</p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleStep2Submit}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-gold-500/30 group"
                  >
                    Receber Análise
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => goToStep(1, 'right')}
                    className="w-full py-3 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    ← Voltar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  Pedido recebido com sucesso.
                </h3>
                <p className="text-slate-600 leading-relaxed mb-2">
                  Obrigado pelo seu pedido.
                </p>
                <p className="text-slate-600 leading-relaxed mb-2">
                  Entrarei em contacto nas próximas horas através do número indicado para compreender melhor a sua situação e agendar uma visita ao imóvel.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  A avaliação é sempre realizada de forma presencial, garantindo uma análise rigorosa e ajustada à realidade do mercado.
                </p>

                <div className="bg-slate-50 rounded-xl p-5 text-left mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Resumo do pedido</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Zona</span>
                      <span className="text-sm font-medium text-slate-800">{formData.zona}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Tipo</span>
                      <span className="text-sm font-medium text-slate-800">{formData.tipologia}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Estado</span>
                      <span className="text-sm font-medium text-slate-800">{formData.estado}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-xl font-bold text-base transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;
