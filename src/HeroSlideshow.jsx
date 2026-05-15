import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import featured from './featuredListings.json';

/**
 * HeroSlideshow — LIV Sotheby's-inspired luxury listing slideshow.
 * Replaces the agent headshot full-bleed feature image with a rotating
 * gallery of featured Colorado luxury listings. Reads from
 * src/featuredListings.json. Auto-advances every 6s.
 */
const HeroSlideshow = ({ onNavigate }) => {
  const slides = (featured && featured.listings) || [];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const s = slides[idx];

  const go = (delta) => setIdx(i => (i + delta + slides.length) % slides.length);

  return (
    <div
      className="relative w-full h-[60vh] md:h-[78vh] overflow-hidden bg-[#0a0a0a] group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.address}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2400'; }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-out ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/75 via-[#0a0a0a]/10 to-transparent pointer-events-none"></div>

      {/* Listing details — bottom left */}
      <div className="absolute bottom-8 left-6 md:bottom-14 md:left-16 right-6 md:right-auto text-[#fafaf8] max-w-2xl">
        <span className="block text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-medium text-[#fafaf8]/70 mb-3">
          Featured · {s.city}
        </span>
        <h3 className="font-serif text-3xl md:text-5xl text-[#fafaf8] italic font-light leading-[1.05] mb-3">
          {s.address}
        </h3>
        <div className="text-[#a8854c] font-serif text-xl md:text-2xl mb-2 tracking-wide">
          {s.price}
        </div>
        <div className="text-[#fafaf8]/80 text-xs md:text-sm tracking-[0.18em] uppercase mb-5">
          {s.beds} BD · {s.baths} BA · {s.sqft} SF
          {s.tagline ? <span className="ml-3 text-[#fafaf8]/60 normal-case tracking-normal italic font-serif">— {s.tagline}</span> : null}
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-[#fafaf8] hover:text-[#a8854c] transition-colors border-b border-[#fafaf8]/40 hover:border-[#a8854c] pb-1"
          >
            View Listing <ArrowRight size={14} strokeWidth={1.5} />
          </a>
          <button
            onClick={() => onNavigate && onNavigate('search')}
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-[#fafaf8]/80 hover:text-[#a8854c] transition-colors"
          >
            Search All Homes <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Slide controls — right side */}
      <div className="absolute bottom-8 right-6 md:bottom-14 md:right-16 flex items-center gap-4 text-[#fafaf8]">
        <button
          onClick={() => go(-1)}
          aria-label="Previous listing"
          className="p-2 hover:text-[#a8854c] transition-colors"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <span className="font-display text-xs tracking-[0.32em] tabular-nums">
          {String(idx + 1).padStart(2, '0')} <span className="text-[#fafaf8]/50">/ {String(slides.length).padStart(2, '0')}</span>
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Next listing"
          className="p-2 hover:text-[#a8854c] transition-colors"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Dot indicators — top right */}
      <div className="absolute top-6 right-6 md:top-10 md:right-16 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[2px] transition-all duration-500 ${i === idx ? 'w-10 bg-[#a8854c]' : 'w-5 bg-[#fafaf8]/40 hover:bg-[#fafaf8]/70'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
