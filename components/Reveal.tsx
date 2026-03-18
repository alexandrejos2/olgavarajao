
import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number; // Delay in seconds
  duration?: number; // Duration in milliseconds
  yOffset?: number; // Starting Y offset
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0, 
  duration = 800,
  yOffset = 24,
  className = ""
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing once visible to run animation only once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const transitionStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}s`,
    transitionProperty: 'opacity, transform, filter',
    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Quad ease-out for smooth landing
  };

  return (
    <div 
      ref={ref} 
      style={{ width }} 
      className={`${className} ${className.includes('h-full') ? 'h-full' : ''}`}
    >
      <div
        style={transitionStyle}
        className={`transform will-change-transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 blur-0' 
            : `opacity-0 blur-[2px]` 
        } ${!isVisible ? `translate-y-[${yOffset}px]` : ''} ${className.includes('h-full') ? 'h-full' : ''}`}
      >
        {/* We use inline style for Y translation when hidden to allow dynamic prop, 
            but Tailwind classes for the rest to ensure clean overriding if needed */}
        <div 
          style={{ transform: isVisible ? 'none' : `translateY(${yOffset}px)` }}
          className={className.includes('h-full') ? 'h-full' : ''}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Reveal;
