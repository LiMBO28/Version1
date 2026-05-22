import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight } from 'lucide-react';

/**
 * REVIEWS â Leave a Review section
 * Matches the existing site palette: ivory #fafaf8, ink #0a0a0a, gold #a8854c
 * Three platform cards: Zillow, Realtor.com, Google
 */

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Eyebrow = ({ children, className = '' }) => (
  <span
    className={`block text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-medium text-[#0a0a0a]/70 ${className}`}
  >
    {children}
  </span>
);

const Reviews = () => {
  const platforms = [
    {
      name: 'Zillow',
      desc:
        "Zillow reviews are weighted heavily in agent rankings â they're often the first place buyers look when researching an agent.",
      url: 'https://www.zillow.com/reviews/write/?s=X1-ZUqh6ffpvwyq6h_61q4w',
      cta: 'Leave a Zillow Review',
    },
    {
      name: 'Realtor.com',
      desc:
        "A recommendation here shows up alongside my listings â the difference between a click and a call.",
      url: 'https://www.realtor.com/realestateagents/686fb39b0a01aebdc18819c0',
      cta: 'Leave a Realtor.com Review',
    },
    {
      name: 'Google',
      desc:
        'Google reviews influence local search rankings. Please mention me by name in your review so it ties back to me directly.',
      url:
        'https://www.google.com/maps/place//data=!4m7!3m6!1s0x876c7e7518bc9ae3:0x2cbe78715fde714b!8m2!3d39.6664268!4d-104.915993!9m1!1b1',
      cta: 'Leave a Google Review',
    },
  ];

  return (
    <section
      id="reviews"
      className="py-24 md:py-32 bg-[#fafaf8] border-t border-[#a8854c]/20"
    >
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <Eyebrow className="mb-5">Worked Together?</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-6xl text-[#0a0a0a] font-light tracking-tight">
              <span className="italic">Leave</span> a Review.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-[#0a0a0a]/65 mt-6 max-w-2xl mx-auto text-base md:text-[17px] leading-relaxed">
              If we&rsquo;ve worked together, your words mean more than any
              marketing ever could. Two minutes on any one of these helps me
              tremendously &mdash; and if you have time for all three, you&rsquo;ll be
              my favorite person of the week.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group border-t border-[#a8854c]/40 pt-10 h-full hover:bg-[#0a0a0a]/[0.02] transition-colors px-2 pb-8"
              >
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="text-[#a8854c]"
                      size={18}
                      strokeWidth={1.25}
                      fill="#a8854c"
                    />
                  ))}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] font-light mb-4">
                  <span className="italic">{p.name}</span>
                </h3>
                <p className="text-[#0a0a0a]/70 text-sm md:text-base leading-relaxed mb-8 min-h-[5rem]">
                  {p.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-medium text-[#0a0a0a] border-b border-[#a8854c] pb-1 group-hover:text-[#a8854c] transition-colors">
                  {p.cta}{' '}
                  <ArrowRight size={12} strokeWidth={1.5} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <p className="text-center text-[#0a0a0a]/50 text-[11px] tracking-[0.24em] uppercase mt-16">
            If anything ever felt off during our work together, please call me
            first &mdash; 720-885-1613.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Reviews;
