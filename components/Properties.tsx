
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Bed, Bath, Move, MapPin, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import Reveal from './Reveal';

interface PropertiesProps {
  activeTab: 'sell' | 'buy';
}

const properties: Property[] = [
  {
    id: 1,
    title: "Moradia Centenária em Pedra",
    location: "Ponte de Lima, Viana do Castelo",
    price: "435.000 €",
    beds: 3,
    baths: 1,
    area: "2.840 m²",
    imageUrl: "https://res.cloudinary.com/dxrk58emm/image/upload/v1774016005/moradia-centen%C3%A1ria_kk3fei.jpg",
    isFeatured: true,
    status: 'Vendido'
  },
  {
    id: 2,
    title: "Moradia T3 Moderna em Banda",
    location: "Arca, Ponte de Lima",
    price: "414.000 €",
    beds: 3,
    baths: 2,
    area: "371 m²",
    imageUrl: "https://res.cloudinary.com/dxrk58emm/image/upload/v1774015525/moradia-414_zi1ykn.jpg",
    isFeatured: true,
    status: 'Vendido'
  },
  {
    id: 3,
    title: "Apartamento T2 em Feitosa",
    location: "Ponte de Lima, Viana do Castelo",
    price: "195.000 €",
    beds: 2,
    baths: 1,
    area: "90 m²",
    imageUrl: "https://res.cloudinary.com/dxrk58emm/image/upload/v1774016051/apartamento_r055r6.jpg",
    isFeatured: false,
    status: 'Vendido'
  }
];

const CARD_WIDTH_VW = 85;
const GAP_PX = 16;
const AUTO_PLAY_MS = 3500;
const TRANSITION_MS = 500;

const PropertyCard: React.FC<{ property: Property; isBuy: boolean }> = ({ property, isBuy }) => (
  <div className="group bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500  flex flex-col h-full border border-gold-100/30">
    <div className="relative h-72 overflow-hidden">
      <div className="absolute top-4 left-4 z-20 flex gap-2 w-full pr-8">
        {isBuy ? (
          <span className="px-4 py-1.5 bg-remax-blue/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded border border-white/20 shadow-xl">
            Destaque / Oportunidade
          </span>
        ) : (
          <span className="px-4 py-1.5 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded border border-white/20 shadow-xl">
            Vendido
          </span>
        )}
      </div>
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[0.3] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-remax-blue/10 group-hover:bg-transparent transition-colors duration-500"></div>
    </div>
    <div className="p-8 flex-grow flex flex-col">
      <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
        <MapPin size={12} className="mr-1.5 text-gold-500" />
        {property.location}
      </div>
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 group-hover:text-gold-500 transition-colors">
        {property.title}
      </h3>
      <div className="flex justify-between items-center py-5 border-y border-slate-50 mt-auto">
        <div className="flex gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-2"><Bed size={16} className="text-slate-300" /> {property.beds}</span>
          <span className="flex items-center gap-2"><Bath size={16} className="text-slate-300" /> {property.baths}</span>
          <span className="flex items-center gap-2"><Move size={16} className="text-slate-300" /> {property.area}</span>
        </div>
      </div>
      <button className="w-full mt-6 py-4 border border-gold-500/30 flex items-center justify-center text-remax-blue font-medium text-xs tracking-widest uppercase hover:bg-gold-500 hover:text-white transition-all duration-300 group/btn">
        Ver Detalhes
        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const MobileCarousel: React.FC<{ isBuy: boolean }> = ({ isBuy }) => {
  const total = properties.length;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);

  const extendedItems = [properties[total - 1], ...properties, properties[0]];

  const getOffset = useCallback((index: number) => {
    const cardPx = (CARD_WIDTH_VW / 100) * window.innerWidth;
    const centerOffset = (window.innerWidth - cardPx) / 2;
    return -(index + 1) * (cardPx + GAP_PX) + centerOffset;
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = isTransitioning ? `transform ${TRANSITION_MS}ms ease` : 'none';
      trackRef.current.style.transform = `translateX(${getOffset(current)}px)`;
    }
  }, [current, isTransitioning, getOffset]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  const jumpIfNeeded = useCallback(() => {
    if (current >= total) {
      setIsTransitioning(false);
      setCurrent(0);
    } else if (current < 0) {
      setIsTransitioning(false);
      setCurrent(total - 1);
    }
  }, [current, total]);

  useEffect(() => {
    const timeout = setTimeout(jumpIfNeeded, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [jumpIfNeeded]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrent(prev => prev + 1);
    }, AUTO_PLAY_MS);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoPlay();
    touchStartRef.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaRef.current = e.touches[0].clientX - touchStartRef.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaRef.current < -threshold) {
      setIsTransitioning(true);
      setCurrent(prev => prev + 1);
    } else if (touchDeltaRef.current > threshold) {
      setIsTransitioning(true);
      setCurrent(prev => prev - 1);
    }
    startAutoPlay();
  };

  const realIndex = ((current % total) + total) % total;

  return (
    <div className="relative overflow-hidden -mx-6">
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: `${GAP_PX}px` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedItems.map((property, i) => (
          <div
            key={`${property.id}-${i}`}
            className="flex-shrink-0"
            style={{ width: `${CARD_WIDTH_VW}vw` }}
          >
            <PropertyCard property={property} isBuy={isBuy} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrent(index);
              stopAutoPlay();
              startAutoPlay();
            }}
            className={`transition-all duration-300 ${index === realIndex
              ? 'w-8 h-2 bg-gold-500'
              : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            aria-label={`Ver imóvel ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Properties: React.FC<PropertiesProps> = ({ activeTab }) => {
  const isBuy = activeTab === 'buy';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="imoveis" className="py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="w-full md:w-auto">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-gold-200 bg-gold-50/50">
                <div className="w-1.5 h-1.5 bg-gold-500"></div>
                <span className="text-xs font-semibold tracking-widest uppercase text-gold-700">Portfólio Selecionado</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight mb-4">
                {isBuy ? 'Imóveis em Destaque' : 'Resultados Reais: Imóveis Vendidos'}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-slate-600 text-lg max-w-2xl font-light">
                {isBuy
                  ? 'Encontre o imóvel ideal. Oportunidades selecionadas com qualidade, localização e valor que fazem a diferença.'
                  : 'Alguns exemplos recentes de imóveis acompanhados, com foco em posicionamento, negociação e fecho seguro.'}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <button className="hidden md:flex items-center text-gold-600 font-semibold hover:text-gold-700 transition-colors uppercase tracking-widest text-sm">
              Ver todos <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </Reveal>
        </div>

        {isMobile ? (
          <MobileCarousel isBuy={isBuy} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Reveal key={property.id} delay={index * 0.15} width="100%">
                <PropertyCard property={property} isBuy={isBuy} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
