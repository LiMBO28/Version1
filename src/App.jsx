import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Menu, X, Phone, Mail, Instagram, MapPin,
  Home, Key, TrendingUp, CheckCircle, ArrowRight, ArrowLeft,
  Shield, Award, Clock, ChevronDown, ChevronLeft, ChevronRight,
  FileText, Heart, User
} from 'lucide-react';
import HeroSlideshow from './HeroSlideshow.jsx';
import HomeSearch from './HomeSearch.jsx';
import JoinMyTeam from './JoinMyTeam.jsx';

/**
 * BRADEN BRACCIO REAL ESTATE — LIV SOTHEBY'S-INSPIRED EDITION
 * Monochrome black / ivory / refined gold • Cormorant Garamond / Inter
 */

const GOOGLE_SHEETS_API_URL = "https://script.google.com/macros/s/AKfycby94kzu2mv7oshAWB_B2Dzt-eBlFYWitTR3Qj6rKczd04jFef0rXku-jiSQhxQE_Gff/exec";

// ---------- helpers ----------
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const Eyebrow = ({ children, className = "" }) => (
  <span className={`block text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-medium text-[#0a0a0a]/70 ${className}`}>
    {children}
  </span>
);

// ---------- 1. NAVBAR (LIV-style: search left, centered wordmark, menu right) ----------
const Navbar = ({ onNavigate, onOpenQuestionnaire }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : 'unset'; }, [open]);

  const go = (target, tab = null) => { setOpen(false); onNavigate(target, tab); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#fafaf8]/95 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(10,10,10,0.06)]' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-3 items-center">
          {/* Left: search */}
          <div className="flex items-center">
            <button onClick={() => go('search')} aria-label="Search" className="text-[#0a0a0a] hover:text-[#a8854c] transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>
          {/* Center: wordmark */}
          <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }} className="flex flex-col items-center group">
            <span className="font-display text-[13px] md:text-[15px] tracking-[0.42em] text-[#0a0a0a] font-medium leading-tight">BRADEN BRACCIO</span>
            <span className="font-display text-[8.5px] md:text-[9px] tracking-[0.6em] text-[#a8854c] uppercase mt-1">Real Estate</span>
          </a>
          {/* Right: menu */}
          <div className="flex justify-end">
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-[#0a0a0a] hover:text-[#a8854c] transition-colors">
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div className={`fixed inset-0 z-[100] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-6 right-6 text-[#fafaf8] hover:text-[#a8854c] z-50 p-2">
          <X size={28} strokeWidth={1.5} />
        </button>
        <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center justify-center px-6 py-16">
          <div className="font-display text-[10px] tracking-[0.6em] text-[#a8854c] uppercase mb-10">Menu</div>
          <div className="flex flex-col items-center space-y-7 w-full max-w-md">
            <button onClick={() => go('home')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Home</button>
            <button onClick={() => go('communities')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Communities</button>
            <button onClick={() => go('philosophy')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">About</button>
            <button onClick={() => go('process', 'buyer')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Buying</button>
            <button onClick={() => go('process', 'seller')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Selling</button>
            <button onClick={() => go('search')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Search Homes</button>
            <button onClick={() => go('join')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Join My Team</button>
            <button onClick={() => go('impact')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Community Impact</button>
            <button onClick={() => go('contact')} className="font-serif text-3xl md:text-4xl text-[#fafaf8] hover:text-[#a8854c] transition-colors italic font-light">Connect</button>
          </div>
          <div className="w-12 h-px bg-[#a8854c]/40 my-10"></div>
          <div className="flex flex-col items-center space-y-4">
            <a href="tel:720-885-1613" className="font-serif text-xl text-[#fafaf8] hover:text-[#a8854c]">720-885-1613</a>
            <a href="mailto:bradenbraccio@yourcastle.com" className="text-sm text-[#fafaf8]/70 hover:text-[#a8854c]">bradenbraccio@yourcastle.com</a>
            <div className="flex space-x-6 pt-2">
              <a href="https://www.instagram.com/youragentbraden" target="_blank" rel="noopener noreferrer" className="text-[#a8854c] hover:text-[#fafaf8]"><Instagram size={20} strokeWidth={1.5} /></a>
              <a href="mailto:bradenbraccio@yourcastle.com" className="text-[#a8854c] hover:text-[#fafaf8]"><Mail size={20} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ---------- 2. HERO (LIV-style: big serif headline + tab bar + search + full-bleed image) ----------
const Hero = ({ onNavigate, onOpenQuestionnaire }) => {
  const [tab, setTab] = useState('CONNECT');
  const tabs = ['BUYING', 'SELLING', 'ABOUT', 'CONNECT'];
  const placeholderForTab = {
    BUYING: 'Search by area, ZIP, or neighborhood',
    SELLING: "Your property address",
    ABOUT: 'What would you like to know?',
    CONNECT: 'Your name or how to reach you',
  };
  return (
    <div id="home" className="relative min-h-screen pt-32 md:pt-28 pb-0 bg-[#fafaf8]">
      {/* Headline */}
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <Reveal>
          <Eyebrow className="mb-6">Colorado · Real Estate</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-[#0a0a0a] leading-[1.02] tracking-tight font-light mb-10 md:mb-14">
            <span className="italic font-light">Local Expertise.</span><br />
            <span className="font-normal">A Higher Standard.</span>
          </h1>
        </Reveal>

        {/* Tab bar */}
        <Reveal delay={300}>
          <div className="flex justify-center gap-8 md:gap-12 mb-6">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium pb-2 transition-all ${tab === t ? 'text-[#0a0a0a] border-b-2 border-[#a8854c]' : 'text-[#0a0a0a]/50 hover:text-[#0a0a0a]'}`}>
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Search bar */}
        <Reveal delay={400}>
          <div className="max-w-3xl mx-auto mb-12 md:mb-16">
            <form onSubmit={(e) => { e.preventDefault(); document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center border-b border-[#0a0a0a]/30 focus-within:border-[#a8854c] transition-colors py-3">
              <Search size={18} strokeWidth={1.5} className="text-[#0a0a0a]/60 mr-4" />
              <input type="text" placeholder={placeholderForTab[tab]} className="flex-1 bg-transparent outline-none font-serif italic text-lg md:text-xl text-[#0a0a0a] placeholder-[#0a0a0a]/40" />
              <button type="submit" aria-label="Continue" className="text-[#0a0a0a] hover:text-[#a8854c] transition-colors">
                <ArrowRight size={22} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </Reveal>
      </div>

      {/* LIV-style slideshow of featured Colorado luxury listings */}
      <Reveal delay={500}>
        <HeroSlideshow onNavigate={onNavigate} />
      </Reveal>
    </div>
  );
};

// ---------- 3. FEATURED COMMUNITIES (LIV-style category cards) ----------
const Communities = () => {
  const cats = ['FRONT RANGE', 'MOUNTAINS', 'METRO DENVER', 'LUXURY'];
  const [cat, setCat] = useState('FRONT RANGE');
  const data = {
    'FRONT RANGE': [
      { name: 'Highlands Ranch', area: 'Douglas County', desc: 'Estate-style living with trails and award-winning schools.' },
      { name: 'Castle Rock', area: 'Douglas County', desc: 'Mountain views, master-planned communities, and small-town charm.' },
    ],
    'MOUNTAINS': [
      { name: 'Evergreen', area: 'Jefferson County', desc: 'Pine-shaded retreats minutes from Denver yet a world away.' },
      { name: 'Vail Valley', area: 'Eagle County', desc: 'World-class skiing, alpine architecture, year-round living.' },
    ],
    'METRO DENVER': [
      { name: 'Cherry Creek', area: 'Denver', desc: 'Walkable luxury at Denver\'s most refined shopping address.' },
      { name: 'Washington Park', area: 'Denver', desc: 'Historic bungalows and tree-lined streets around the park.' },
    ],
    'LUXURY': [
      { name: 'Cherry Hills Village', area: 'Arapahoe County', desc: 'Estate properties and equestrian land minutes from downtown.' },
      { name: 'Boulder Foothills', area: 'Boulder County', desc: 'Mountain-front homes overlooking the Flatirons.' },
    ],
  };

  return (
    <section id="communities" className="py-24 md:py-32 bg-[#fafaf8]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <Reveal><Eyebrow className="mb-5">Featured</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-6xl text-[#0a0a0a] font-light tracking-tight">
              <span className="italic">Distinctive</span> Communities
            </h2>
          </Reveal>
        </div>

        {/* Category tabs */}
        <Reveal delay={200}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 md:mb-16 border-b border-[#0a0a0a]/10 pb-2">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`text-[11px] md:text-xs tracking-[0.3em] uppercase font-medium pb-3 -mb-[1px] border-b-2 transition-all ${cat === c ? 'text-[#0a0a0a] border-[#a8854c]' : 'text-[#0a0a0a]/45 hover:text-[#0a0a0a] border-transparent'}`}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {data[cat].map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe9e2]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#2a2a2a]"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[#a8854c]/30">
                    <Home size={96} strokeWidth={0.75} />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-[9px] tracking-[0.25em] uppercase bg-[#fafaf8]/95 text-[#0a0a0a] font-medium">Featured</span>
                  </div>
                </div>
                <div className="pt-5">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#0a0a0a] font-light"><span className="italic">{p.name}</span></h3>
                  <p className="text-[#0a0a0a]/55 text-xs tracking-[0.22em] uppercase mt-1 mb-3">{p.area}</p>
                  <p className="text-[#0a0a0a]/75 text-base leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium text-[#0a0a0a] border-b border-[#0a0a0a] pb-1 hover:text-[#a8854c] hover:border-[#a8854c] transition-colors">
            Inquire About a Community <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ---------- 4. LOCAL EXPERTISE (full-bleed landscape + nav rows) ----------
const LocalExpertise = ({ onOpenQuestionnaire }) => (
  <section className="relative bg-[#fafaf8]">
    <div className="text-center pt-24 md:pt-32 pb-12 md:pb-16">
      <Reveal><Eyebrow className="mb-5">Local Expertise</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="font-serif text-4xl md:text-6xl text-[#0a0a0a] font-light tracking-tight">
          <span className="italic">Rooted</span> in Colorado
        </h2>
      </Reveal>
    </div>
    {/* Full-bleed image */}
    <Reveal>
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1677219810381-b6b63ecb0354?auto=format&fit=crop&q=80&w=2000" alt="Colorado mountains" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent"></div>
      </div>
    </Reveal>
    <div className="max-w-[1100px] mx-auto px-6 -mt-6">
      <div className="bg-[#fafaf8] pt-10">
        <div className="text-center pb-10">
          <Eyebrow className="mb-2">Colorado</Eyebrow>
          <p className="font-serif text-2xl md:text-3xl text-[#0a0a0a] italic font-light">Denver Metro &amp; The Front Range</p>
        </div>
        {/* Nav rows */}
        <div className="divide-y divide-[#0a0a0a]/12 border-t border-b border-[#0a0a0a]/12">
          {[
            { h: 'Market Insights & Trends', s: 'Latest data on the Colorado real estate market.', a: 'philosophy' },
            { h: 'Meet Braden', s: 'A disciplined, client-first approach to luxury real estate.', a: 'philosophy' },
            { h: "Find Your Home", s: 'Start a personalized search tailored to your goals.', a: 'contact', cta: true },
          ].map(({ h, s, a, cta }) => (
            <a key={h} href={`#${a}`}
              onClick={cta ? (e) => { e.preventDefault(); onOpenQuestionnaire(); } : undefined}
              className="group flex items-center justify-between py-7 md:py-9 px-2 md:px-4 transition-colors hover:bg-[#0a0a0a]/[0.025]">
              <div>
                <h3 className="font-serif text-xl md:text-3xl text-[#0a0a0a] font-light"><span className="italic">{h}</span></h3>
                <p className="text-[#0a0a0a]/60 text-sm mt-1 hidden md:block">{s}</p>
              </div>
              <ArrowRight size={22} strokeWidth={1.5} className="text-[#a8854c] group-hover:translate-x-2 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ---------- 5. BIO / ABOUT (editorial layout) ----------
const BioSection = () => (
  <section id="philosophy" className="py-24 md:py-36 bg-[#fafaf8]">
    <div className="max-w-[1300px] mx-auto px-6 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
      <Reveal className="md:col-span-5 order-2 md:order-1">
        <div className="relative w-full">
          <div className="aspect-[3/4] overflow-hidden bg-[#ebe9e2]">
            <img src="agent.jpg" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=900'; }} alt="Braden Braccio" className="w-full h-full object-cover" />
          </div>
        </div>
      </Reveal>
      <Reveal delay={150} className="md:col-span-7 order-1 md:order-2 md:pt-10">
        <Eyebrow className="mb-6">About Braden</Eyebrow>
        <div className="w-14 h-px bg-[#a8854c] mb-8"></div>
        <h2 className="font-serif text-5xl md:text-7xl text-[#0a0a0a] leading-[1.05] tracking-tight font-light mb-10">
          <span className="italic">A Higher</span> Standard.
        </h2>
        <div className="space-y-6 text-[#0a0a0a]/85 text-base md:text-[17px] leading-[1.75] max-w-xl">
          <p>Braden Braccio believes that buying or selling a home, especially in Colorado&rsquo;s finest neighborhoods, should feel calm, confident, and deeply personal.</p>
          <p>As a former <strong className="text-[#0a0a0a]">U.S. Veteran</strong>, he brings the same discipline, integrity, and commitment to real estate that he once brought to service. His promise is simple: every detail will be handled with care, every conversation kept in complete confidence, and your best interests placed above all else.</p>
          <p>To Braden, luxury is not about the house. It is about the way the work is done.</p>
        </div>
        <blockquote className="font-serif italic text-xl md:text-2xl text-[#0a0a0a] mt-10 pl-6 border-l-2 border-[#a8854c] leading-relaxed max-w-xl">
          &ldquo;Disciplined enough to handle every detail. Blunt enough to never waste your time.&rdquo;
        </blockquote>
        <div className="mt-12 grid grid-cols-2 gap-10 max-w-xl">
          <div>
            <Shield className="text-[#a8854c] mb-3" size={28} strokeWidth={1.25} />
            <h4 className="font-serif text-xl text-[#0a0a0a] font-medium">US Veteran</h4>
            <p className="text-sm text-[#0a0a0a]/60 mt-1">Here to serve.</p>
          </div>
          <div>
            <MapPin className="text-[#a8854c] mb-3" size={28} strokeWidth={1.25} />
            <h4 className="font-serif text-xl text-[#0a0a0a] font-medium">Colorado Expert</h4>
            <p className="text-sm text-[#0a0a0a]/60 mt-1">Data. No delays.</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ---------- 6. PROCESS (buyer/seller phases) ----------
const ProcessSection = ({ activeTab }) => {
  const [tab, setTab] = useState('buyer');
  useEffect(() => { if (activeTab) setTab(activeTab); }, [activeTab]);
  const buyer = [
    { t: 'Identifying Goals', d: 'We clarify your motivation, timeline, and must-haves. Lender selection, approval, exclusive agreement.', I: CheckCircle },
    { t: 'Sourcing The Home', d: 'On and off-market access. Open houses, micro-market analysis, a winning offer strategy.', I: Home },
    { t: 'Negotiation & Inspection', d: 'We present to win. Inspections, disclosures, repairs — your investment protected.', I: Shield },
    { t: 'Closing & Beyond', d: 'Final walk-throughs, signing, celebration. Resources after move-in. We stay in touch.', I: Key },
  ];
  const seller = [
    { t: 'Defining A Win', d: 'Understanding motivation and ideal moving date. Supply vs. demand. A strategic plan for your buyer.', I: TrendingUp },
    { t: 'Listing & Launch', d: 'Staging, photography, and The Real Advantage. Working backwards from launch for perfection.', I: Award },
    { t: 'Marketing & Showings', d: 'Digital plans, social strategy, open houses. Weekly feedback. Adapting to the market.', I: Instagram },
    { t: 'Negotiation To Close', d: 'Deep offer analysis, multiple-offer strategy. Maximizing price and terms.', I: Clock },
  ];
  const phases = tab === 'buyer' ? buyer : seller;

  return (
    <section id="process" className="py-24 md:py-32 bg-[#0a0a0a] text-[#fafaf8] border-t border-[#a8854c]/40">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal><Eyebrow className="text-[#a8854c] mb-5">The Methodology</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-6xl text-[#fafaf8] font-light tracking-tight">
              <span className="italic">The</span> Real Estate Process
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex justify-center gap-10 mt-10">
              {['buyer', 'seller'].map(k => (
                <button key={k} onClick={() => setTab(k)} className={`text-xs uppercase tracking-[0.3em] font-medium pb-2 border-b-2 transition-all ${tab === k ? 'text-[#a8854c] border-[#a8854c]' : 'text-[#fafaf8]/45 border-transparent hover:text-[#fafaf8]'}`}>
                  {k === 'buyer' ? 'Buying' : 'Selling'}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {phases.map((p, i) => (
            <Reveal key={p.t} delay={i * 120}>
              <div className="border-t border-[#a8854c]/30 pt-8 group">
                <p.I className="text-[#a8854c] mb-6 transition-transform group-hover:-translate-y-1" size={28} strokeWidth={1.25} />
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8854c] font-medium mb-2">Phase 0{i + 1}</p>
                <h3 className="font-serif text-2xl text-[#fafaf8] font-light mb-3"><span className="italic">{p.t}</span></h3>
                <p className="text-[#fafaf8]/65 text-sm leading-relaxed">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- 7. IMPACT ----------
const ImpactSection = () => (
  <section id="impact" className="py-24 md:py-32 bg-[#fafaf8]">
    <div className="max-w-[1300px] mx-auto px-6">
      <div className="text-center mb-16">
        <Reveal><Eyebrow className="mb-5">Giving Back</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0a0a0a] font-light tracking-tight">
            <span className="italic">Community</span> Impact
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[#0a0a0a]/65 mt-6 max-w-2xl mx-auto">Service extends beyond real estate. We support organizations that provide vital assistance to veterans, first responders, and those in need.</p>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {[
          { I: Heart, t: 'Wounded Warrior Project', d: 'Supporting veterans who incurred a physical or mental injury while serving in the military.', l: 'https://support.woundedwarriorproject.org/', cta: 'Donate Now' },
          { I: Shield, t: 'First Responders Foundation', d: 'Essential equipment, training, and financial support to the men and women who serve as first responders.', l: 'https://www.firstrespondersfoundation.org/', cta: 'Support Now' },
          { I: Phone, t: 'Veteran Crisis Line', d: 'Free, confidential support for Veterans in crisis and their families and friends. Available 24/7/365.', l: 'https://www.veteranscrisisline.net/', cta: 'Get Help' },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 120}>
            <div className="border-t border-[#a8854c]/40 pt-10 group">
              <c.I className="text-[#a8854c] mb-6" size={36} strokeWidth={1.25} />
              <h3 className="font-serif text-2xl md:text-3xl text-[#0a0a0a] font-light mb-4"><span className="italic">{c.t}</span></h3>
              <p className="text-[#0a0a0a]/70 text-sm leading-relaxed mb-6">{c.d}</p>
              <a href={c.l} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase font-medium text-[#0a0a0a] border-b border-[#a8854c] pb-1 hover:text-[#a8854c]">{c.cta} <ArrowRight size={12} /></a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ---------- 8. TESTIMONIALS ----------
const Testimonials = () => (
  <section className="py-24 md:py-32 bg-[#0a0a0a] text-[#fafaf8]">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-16">
        <Reveal><Eyebrow className="text-[#a8854c] mb-5">Client Stories</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-serif text-4xl md:text-5xl text-[#fafaf8] font-light tracking-tight">
            <span className="italic">Trusted</span> by Families.
          </h2>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {[
          { q: 'Braden has been excellent to work with. He&rsquo;s very helpful, knowledgeable, and made the whole house hunting to closing experience a pleasure. We&rsquo;d recommend him to anyone.', n: 'Denise & Keith Grace' },
          { q: 'Braden was an excellent realtor. Prompt, organized, and always on time. He went above and beyond, taking extra steps to help me close on the house because I lived too far away. He is the realtor I will reach out to next time.', n: 'Aaron Barnett', s: 'US Army' },
        ].map((t, i) => (
          <Reveal key={t.n} delay={i * 150}>
            <div className="border-t border-[#a8854c]/40 pt-10">
              <p className="font-serif text-xl md:text-[22px] italic text-[#fafaf8]/90 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: '&ldquo;' + t.q + '&rdquo;' }}></p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#a8854c] flex items-center justify-center text-[#0a0a0a] font-medium">{t.n[0]}</div>
                <div>
                  <p className="font-serif text-lg text-[#fafaf8]">{t.n}</p>
                  {t.s && <p className="text-[10px] uppercase tracking-[0.3em] text-[#a8854c] mt-0.5">{t.s}</p>}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ---------- 9. CONTACT ----------
const Contact = ({ onOpenQuestionnaire }) => (
  <section id="contact" className="py-24 md:py-36 bg-[#fafaf8]">
    <div className="max-w-[1100px] mx-auto px-6 text-center">
      <Reveal><Eyebrow className="mb-5">Let&rsquo;s Connect</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="font-serif text-5xl md:text-7xl text-[#0a0a0a] font-light tracking-tight mb-10">
          <span className="italic">Begin</span> the Conversation.
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-[#0a0a0a]/70 text-lg max-w-xl mx-auto mb-14">Your goals become my mission. Tell me about your move and I&rsquo;ll respond personally within 24 hours.</p>
      </Reveal>
      <Reveal delay={300}>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
          <a href="tel:720-885-1613" className="group border border-[#0a0a0a]/15 hover:border-[#a8854c] p-8 transition-all bg-[#fafaf8] hover:bg-white">
            <Phone className="text-[#0a0a0a] group-hover:text-[#a8854c] transition-colors mx-auto mb-4" size={22} strokeWidth={1.25} />
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8854c] mb-2">Call or Text</p>
            <p className="font-serif text-xl md:text-2xl text-[#0a0a0a]">720-885-1613</p>
          </a>
          <a href="mailto:bradenbraccio@yourcastle.com" className="group border border-[#0a0a0a]/15 hover:border-[#a8854c] p-8 transition-all bg-[#fafaf8] hover:bg-white">
            <Mail className="text-[#0a0a0a] group-hover:text-[#a8854c] transition-colors mx-auto mb-4" size={22} strokeWidth={1.25} />
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8854c] mb-2">Email</p>
            <p className="font-serif text-base md:text-lg text-[#0a0a0a]">bradenbraccio@yourcastle.com</p>
          </a>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <button onClick={onOpenQuestionnaire} className="inline-flex items-center gap-3 px-10 py-5 bg-[#0a0a0a] text-[#fafaf8] text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#a8854c] transition-colors">
          <FileText size={14} strokeWidth={1.5} /> Start the Questionnaire
        </button>
        <p className="text-[#0a0a0a]/45 text-xs mt-4">A two-minute brief — no obligation.</p>
      </Reveal>
    </div>
  </section>
);

// ---------- 10. QUESTIONNAIRE MODAL (same logic as before, restyled) ----------
const QuestionnaireModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(null);
  const [ans, setAns] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep(0); setType(null); setAns({}); setSubmitting(false); }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const inp = (k, v) => setAns(p => ({ ...p, [k]: v }));
  const pick = (t) => { setType(t); setStep(1); };
  const next = () => {
    if (step === 1 && (!ans.name || !ans.email)) { alert('Please provide your name and email so we can reach you.'); return; }
    setStep(s => s + 1);
  };
  const prev = () => setStep(s => s - 1);

  const submit = async () => {
    setSubmitting(true);
    let note = '';
    if (type === 'buy' || type === 'both') note += `\n-- BUYING --\nTimeline: ${ans.buyTimeline || ''}\nLocation: ${ans.buyLocation || ''}\nPrice: ${ans.buyPrice || ''}\nType: ${ans.buyType || ''}\nBed/Bath: ${ans.buyBedBath || ''}\nMortgage: ${ans.buyMortgage || ''}`;
    if (type === 'sell' || type === 'both') note += `\n-- SELLING --\nAddress: ${ans.sellAddress || ''}\nSqFt: ${ans.sellSqFt || ''}\nYear: ${ans.sellYear || ''}\nBed/Bath: ${ans.sellBedBath || ''}\nTimeline: ${ans.sellTimeline || ''}\nReason: ${ans.sellReason || ''}`;
    if (ans.finalNotes) note += `\n-- NOTES --\n${ans.finalNotes}`;

    const payload = { name: ans.name, email: ans.email, phone: ans.phone || '', type: (type || 'general').toUpperCase(), note: note.trim() };
    try {
      await fetch(GOOGLE_SHEETS_API_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setTimeout(() => { setSubmitting(false); onClose(); alert('Thank you. Your information has been sent to Braden.'); }, 800);
    } catch (e) {
      const body = `Name: ${ans.name}\nEmail: ${ans.email}\nPhone: ${ans.phone || ''}\n\n${note}`;
      window.location.href = `mailto:bradenbraccio@yourcastle.com?subject=${encodeURIComponent('New Website Inquiry')}&body=${encodeURIComponent(body)}`;
      setSubmitting(false); onClose();
    }
  };

  const Btn = ({ children, ...rest }) => <button {...rest} className="w-full p-4 border border-[#0a0a0a]/20 hover:border-[#a8854c] hover:bg-[#a8854c]/5 text-left text-[#0a0a0a] transition-all">{children}</button>;
  const Input = (props) => <input {...props} className="w-full p-4 border border-[#0a0a0a]/20 bg-transparent outline-none focus:border-[#a8854c] text-[#0a0a0a] placeholder-[#0a0a0a]/45" />;
  const Sel = ({ children, ...rest }) => <select {...rest} className="w-full p-4 border border-[#0a0a0a]/20 bg-transparent outline-none focus:border-[#a8854c] text-[#0a0a0a]">{children}</select>;
  const Submit = ({ children, ...rest }) => <button {...rest} className="w-full bg-[#0a0a0a] hover:bg-[#a8854c] text-[#fafaf8] py-4 text-xs uppercase tracking-[0.3em] font-medium transition-colors">{children}</button>;

  const Header = ({ children }) => (
    <div className="flex items-center gap-4 mb-2">
      <button onClick={prev} className="text-[#0a0a0a]/50 hover:text-[#0a0a0a]"><ArrowLeft size={20} /></button>
      <h3 className="font-serif text-2xl text-[#0a0a0a] italic font-light">{children}</h3>
    </div>
  );

  const content = (() => {
    if (step === 0) return (
      <div className="space-y-8">
        <h3 className="font-serif text-3xl md:text-4xl text-[#0a0a0a] text-center italic font-light">How can I help?</h3>
        <div className="grid grid-cols-2 gap-3">
          {[{ k: 'buy', I: Home, l: 'Buy' }, { k: 'sell', I: TrendingUp, l: 'Sell' }, { k: 'both', I: Key, l: 'Buy & Sell' }, { k: 'join', I: User, l: 'Join Team' }].map(o => (
            <button key={o.k} onClick={() => pick(o.k)} className="group p-8 border border-[#0a0a0a]/20 hover:border-[#a8854c] hover:bg-[#a8854c]/5 transition-all flex flex-col items-center">
              <o.I className="text-[#0a0a0a] mb-3 group-hover:text-[#a8854c]" size={24} strokeWidth={1.25} />
              <span className="text-xs tracking-[0.3em] uppercase font-medium">{o.l}</span>
            </button>
          ))}
        </div>
      </div>
    );

    if (step === 1) return (
      <div className="space-y-5">
        <Header>Basic Info</Header>
        <Input placeholder="Full Name *" value={ans.name || ''} onChange={(e) => inp('name', e.target.value)} />
        <Input placeholder="Email Address *" value={ans.email || ''} onChange={(e) => inp('email', e.target.value)} />
        <Input placeholder="Phone Number" value={ans.phone || ''} onChange={(e) => inp('phone', e.target.value)} />
        <Submit onClick={next}>Continue</Submit>
      </div>
    );

    if (type === 'buy' || type === 'both') {
      if (step === 2) return (<div className="space-y-4"><Header>Buying Timeline</Header>{['Ready Now (0-30 days)', '1-3 Months', '3-6 Months', '6+ Months'].map(o => <Btn key={o} onClick={() => { inp('buyTimeline', o); next(); }}>{o}</Btn>)}</div>);
      if (step === 3) return (<div className="space-y-4"><Header>Location & Price</Header><Input placeholder="Preferred Locations" onChange={(e) => inp('buyLocation', e.target.value)} /><Sel onChange={(e) => inp('buyPrice', e.target.value)}><option value="">Price Range</option><option>Under $400k</option><option>$400k - $600k</option><option>$600k - $800k</option><option>$800k - $1M</option><option>$1M+</option></Sel><Submit onClick={next}>Continue</Submit></div>);
      if (step === 4) return (<div className="space-y-4"><Header>Property Details</Header><Sel onChange={(e) => inp('buyType', e.target.value)}><option>Single Family</option><option>Condo/Townhome</option><option>Multi-Family</option><option>Land</option></Sel><Input placeholder="Bed / Bath" onChange={(e) => inp('buyBedBath', e.target.value)} /><Submit onClick={next}>Continue</Submit></div>);
      if (step === 5) return (<div className="space-y-4"><Header>Financing</Header>{['Pre-approved', 'Planning to', 'Paying cash', 'Not yet'].map(o => <Btn key={o} onClick={() => { inp('buyMortgage', o); type === 'both' ? next() : setStep(100); }}>{o}</Btn>)}</div>);
    }

    if (type === 'sell' || type === 'both') {
      const eff = type === 'both' ? step - 4 : step;
      if (eff === 2) return (<div className="space-y-4"><Header>{type === 'both' ? 'Selling Side' : 'Property Address'}</Header><Input placeholder="Property Address" onChange={(e) => inp('sellAddress', e.target.value)} /><Submit onClick={next}>Continue</Submit></div>);
      if (eff === 3) return (<div className="space-y-4"><Header>Property Details</Header><div className="grid grid-cols-2 gap-3"><Input placeholder="Sq Ft" onChange={(e) => inp('sellSqFt', e.target.value)} /><Input placeholder="Year Built" onChange={(e) => inp('sellYear', e.target.value)} /></div><Input placeholder="Bed / Bath" onChange={(e) => inp('sellBedBath', e.target.value)} /><Submit onClick={next}>Continue</Submit></div>);
      if (eff === 4) return (<div className="space-y-4"><Header>Timeline & Motivation</Header><Sel onChange={(e) => inp('sellTimeline', e.target.value)}><option value="">Sell By?</option><option>ASAP</option><option>Within 30 Days</option><option>1-3 Months</option><option>6+ Months</option></Sel><Sel onChange={(e) => inp('sellReason', e.target.value)}><option value="">Main Reason?</option><option>Upsizing</option><option>Downsizing</option><option>Relocation</option><option>Financial</option><option>Life Event</option></Sel><Submit onClick={() => setStep(100)}>Review &amp; Submit</Submit></div>);
    }

    if (type === 'join') {
      if (step === 2) return (<div className="space-y-4"><Header>License Status</Header><Btn onClick={() => { inp('hasLicense', 'Yes'); next(); }}>Yes (Active CO License)</Btn><Btn onClick={() => { inp('hasLicense', 'No'); setStep(100); }}>No, but interested</Btn></div>);
      if (step === 3) return (<div className="space-y-4"><Header>Experience</Header>{['New', '< 2 Years', '2-5 Years', '5-10 Years', '10+ Years'].map(o => <Btn key={o} onClick={() => { inp('experience', o); setStep(100); }}>{o}</Btn>)}</div>);
    }

    if (step === 100) return (
      <div className="space-y-5">
        <h3 className="font-serif text-2xl text-[#0a0a0a] italic font-light border-b border-[#a8854c]/30 pb-4">One Last Thing</h3>
        <p className="text-sm text-[#0a0a0a]/70">Any specific needs or questions I should know?</p>
        <textarea rows="4" className="w-full p-4 border border-[#0a0a0a]/20 bg-transparent outline-none focus:border-[#a8854c] text-[#0a0a0a]" placeholder="Tell me more..." onChange={(e) => inp('finalNotes', e.target.value)}></textarea>
        <Submit onClick={submit} disabled={submitting}>{submitting ? 'Sending...' : 'Submit'}</Submit>
        <p className="text-[10px] text-center text-[#0a0a0a]/50">I&rsquo;ll respond within 24 hours. For faster service, text 720-885-1613.</p>
      </div>
    );

    return null;
  })();

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#fafaf8] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#0a0a0a]/60 hover:text-[#a8854c]"><X size={26} /></button>
        <div className="absolute top-0 left-0 w-full h-px bg-[#0a0a0a]/10">
          <div className="h-full bg-[#a8854c] transition-all duration-500" style={{ width: `${(step / 12) * 100}%` }}></div>
        </div>
        {content}
      </div>
    </div>
  );
};

// ---------- 11. FOOTER ----------
const Footer = () => (
  <footer className="bg-[#0a0a0a] text-[#fafaf8] pt-20 pb-10">
    <div className="max-w-[1300px] mx-auto px-6">
      <div className="text-center pb-14 border-b border-[#a8854c]/20">
        <span className="font-display text-[15px] md:text-[18px] tracking-[0.42em] text-[#fafaf8] font-medium">BRADEN BRACCIO</span>
        <p className="font-display text-[9.5px] tracking-[0.6em] text-[#a8854c] uppercase mt-2">Real Estate Agent</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12 py-14 text-center md:text-left">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8854c] font-medium mb-5">Brokerage</p>
          <p className="font-serif text-lg italic text-[#fafaf8]/85">Your Castle Real Estate</p>
          <p className="text-sm text-[#fafaf8]/55 mt-2">License #: FA.100107526</p>
          <p className="text-sm text-[#fafaf8]/55">Colorado</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8854c] font-medium mb-5">Direct</p>
          <p className="font-serif text-lg text-[#fafaf8]">720-885-1613</p>
          <p className="text-sm text-[#fafaf8]/70 mt-1">bradenbraccio@yourcastle.com</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8854c] font-medium mb-5">Follow</p>
          <div className="flex md:justify-start justify-center space-x-5">
            <a href="https://www.instagram.com/youragentbraden" target="_blank" rel="noopener noreferrer" className="text-[#a8854c] hover:text-[#fafaf8]"><Instagram size={20} strokeWidth={1.5} /></a>
            <a href="mailto:bradenbraccio@yourcastle.com" className="text-[#a8854c] hover:text-[#fafaf8]"><Mail size={20} strokeWidth={1.5} /></a>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#fafaf8]/45 mt-4">@YOURAGENTBRADEN</p>
        </div>
      </div>
      <div className="border-t border-[#a8854c]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[#fafaf8]/45">
        <p>&copy; {new Date().getFullYear()} Braden Braccio. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#a8854c]">Privacy</a>
          <a href="#" className="hover:text-[#a8854c]">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

// ---------- MAIN APP ----------
const App = () => {
  const [activeTab, setActiveTab] = useState('buyer');
  const [qOpen, setQOpen] = useState(false);

  useEffect(() => { document.title = "Braden Braccio | Real Estate Agent"; }, []);

  const navigate = (id, tab = null) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (tab) setActiveTab(tab);
  };

  return (
    <div className="bg-[#fafaf8] text-[#0a0a0a] font-sans antialiased selection:bg-[#a8854c]/40 selection:text-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Cormorant Garamond', 'Times New Roman', serif; letter-spacing: 0.005em; }
        .font-display { font-family: 'Cinzel', 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', 'Helvetica Neue', system-ui, sans-serif; }
      `}</style>

      <Navbar onNavigate={navigate} onOpenQuestionnaire={() => setQOpen(true)} />
      <Hero onNavigate={navigate} onOpenQuestionnaire={() => setQOpen(true)} />
      <HomeSearch />
      <Communities />
      <LocalExpertise onOpenQuestionnaire={() => setQOpen(true)} />
      <BioSection />
      <ProcessSection activeTab={activeTab} />
      <JoinMyTeam onOpenQuestionnaire={() => setQOpen(true)} />
      <ImpactSection />
      <Testimonials />
      <Contact onOpenQuestionnaire={() => setQOpen(true)} />
      <Footer />

      <QuestionnaireModal isOpen={qOpen} onClose={() => setQOpen(false)} />
    </div>
  );
};

export default App;
