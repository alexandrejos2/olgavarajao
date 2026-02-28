
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Bed, Bath, Move, MapPin } from 'lucide-react';
import { Property } from '../types';
import Reveal from './Reveal';

interface PropertiesProps {
  activeTab: 'sell' | 'buy';
}

const properties: Property[] = [
  {
    id: 1,
    title: "Apartamento T2 em Azurém",
    location: "Coimbra",
    price: "Vendido",
    beds: 2,
    baths: 1,
    area: "126 m²",
    imageUrl: "https://res.cloudinary.com/dxrk58emm/image/upload/v1770808679/337d8182-ef57-429f-86c8-da71d69c9e75_ojdarn.jpg",
    isFeatured: true,
    status: 'Vendido'
  },
  {
    id: 2,
    title: "Moradia T3+1 em Banda",
    location: "Coimbra",
    price: "Vendido",
    beds: 3,
    baths: 2,
    area: "229 m²",
    imageUrl: "https://res.cloudinary.com/dxrk58emm/image/upload/v1770808769/892b2f06-bfd0-4af1-bc89-50871de0e287_bgldxp.jpg",
    isFeatured: true,
    status: 'Vendido'
  },
  {
    id: 3,
    title: "Moradia de Luxo",
    location: "Coimbra",
    price: "Vendido",
    beds: 4,
    baths: 4,
    area: "450 m²",
    imageUrl: "https://res.cloudinary.com/dxrk58emm/image/upload/v1770808770/379d1e84-f49f-4e5d-bc1c-96fc22bc4f9e_cqxchg.jpg",
    isFeatured: false,
    status: 'Vendido'
  }
];

const CARD_WIDTH_VW = 85;
const GAP_PX = 16;
const AUTO_PLAY_MS = 3500;
const TRANSITION_MS = 500;

const PropertyCard: React.FC<{ property: Property; isBuy: boolean }> = ({ property, isBuy }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
    <div className="relative h-72 overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        {isBuy ? (
          <span className="px-4 py-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded border border-white/20 shadow-xl">
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
      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
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
            className={`transition-all duration-300 rounded-full ${
              index === realIndex
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
    <section id="imoveis" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="w-full md:w-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                {isBuy ? 'Imóveis em Destaque' : 'Resultados Reais: Imóveis Vendidos'}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-slate-600 text-lg max-w-2xl font-light">
                {isBuy
                  ? 'Encontre o imóvel ideal em Coimbra. Oportunidades selecionadas com qualidade, localização e valor que fazem a diferença.'
                  : 'Alguns exemplos recentes de imóveis acompanhados, com foco em posicionamento, negociação e fecho seguro.'}
              </p>
            </Reveal>
          </div>
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
