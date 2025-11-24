import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, Instagram, MapPin, 
  Home, Key, TrendingUp, CheckCircle, ArrowRight,
  Shield, Award, Clock, ChevronDown
} from 'lucide-react';

/**
 * BRADEN BRACCIO REAL ESTATE WEBSITE - FINAL POLISH
 * * Fixes: 
 * - Logo Side Borders: Added 'bg-[#fdfbf7]' to logo container to hide green background gaps.
 * - Mobile Menu Design: Updated to match IMG_9460 (Green background, full contact info).
 * - Layout: Filled out menu with contact details & brokerage info.
 */

// --- Components ---

// 1. Reveal on Scroll Component
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// 2. Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'For Buyers', href: '#buyers' },
    { name: 'For Sellers', href: '#sellers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-700 border-b border-[#0b2b20]/10 ${
        scrolled 
          ? 'bg-[#fdfbf7]/95 backdrop-blur-xl shadow-sm py-3 md:py-4' 
          : 'bg-[#fdfbf7] md:bg-transparent py-4 md:py-8 shadow-sm md:shadow-none'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          {/* Logo + Name Section */}
          <a href="#" className="flex items-center gap-3 md:gap-4 relative group">
             {/* Navbar Logo - Set bg to cream to match logo background */}
             <div className="w-10 h-10 md:w-12 md:h-12 border-[1.5px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] shadow-md rounded-full overflow-hidden p-0 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="logo.jpg" 
                  alt="B Logo" 
                  className="w-full h-full object-contain" 
                />
             </div>
             <div className="flex flex-col">
                <span className="font-serif text-lg md:text-2xl tracking-widest text-[#0b2b20] font-semibold leading-tight">
                  BRADEN BRACCIO
                </span>
                <span className="block text-[0.6rem] md:text-[0.65rem] font-sans tracking-[0.2em] text-[#c5a059] uppercase group-hover:text-[#0b2b20] transition-colors font-bold mt-0.5">
                  Real Estate Agent
                </span>
             </div>
          </a>

          {/* Desktop Nav - STRICTLY HIDDEN ON MOBILE */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs uppercase tracking-[0.15em] font-bold text-[#0b2b20] hover:text-[#c5a059] transition-colors duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </a>
            ))}
            <a href="#contact" className="relative px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-[#0b2b20] border border-[#0b2b20] overflow-hidden group transition-all duration-300 hover:text-[#fdfbf7]">
              <span className="absolute inset-0 w-full h-full bg-[#0b2b20] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
              <span className="relative z-10">Inquire</span>
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className={`md:hidden text-[#0b2b20] transition-opacity duration-300 hover:text-[#c5a059] p-2 relative z-[40] ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 z-[100] flex flex-col pt-12 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
         {/* Dark Green Background to match screenshot */}
         <div className="absolute inset-0 bg-[#0b2b20]"></div>
         
         {/* Texture Overlay */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>
         
         {/* CLOSE BUTTON */}
         <button 
            className="absolute top-6 right-6 text-[#fdfbf7] p-2 hover:text-[#c5a059] transition-colors z-50"
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
         >
            <X size={36} />
         </button>
         
         {/* Content Container */}
         <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center px-6 pb-12">
           
           {/* Menu Logo - White Background to hide green borders */}
           <div className="w-20 h-20 border-[1.5px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] rounded-full overflow-hidden p-0 mt-4 mb-8 shadow-2xl shrink-0">
              <img src="logo.jpg" alt="B Logo" className="w-full h-full object-contain" />
           </div>

           {/* Navigation Links */}
           <div className="flex flex-col items-center space-y-6 w-full">
             {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-3xl text-[#fdfbf7] hover:text-[#c5a059] transition-colors"
                >
                  {link.name}
                </a>
              ))}
           </div>

           {/* Divider */}
           <div className="w-12 h-[1px] bg-[#c5a059]/50 my-8"></div>

           {/* BROKERAGE INFO (From Screenshot) */}
           <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex space-x-8">
                 <a href="https://www.instagram.com/youragentbraden" target="_blank" className="text-[#c5a059] hover:text-white">
                    <Instagram size={24} strokeWidth={1.5} />
                 </a>
                 <a href="mailto:bradenbraccio@yourcastle.com" className="text-[#c5a059] hover:text-white">
                    <Mail size={24} strokeWidth={1.5} />
                 </a>
              </div>

              <div className="space-y-2">
                 <h4 className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold mb-2">Brokerage</h4>
                 <p className="text-[#fdfbf7]/80 font-light text-sm">Your Castle Real Estate</p>
                 <p className="text-[#fdfbf7]/80 font-light text-sm">License #: FA.100107526</p>
                 <p className="text-[#fdfbf7]/80 font-light text-sm">Colorado</p>
              </div>

              <div className="space-y-2">
                 <h4 className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold mb-2">Direct Contact</h4>
                 <a href="tel:720-885-1613" className="text-[#fdfbf7] text-xl font-serif block hover:text-[#c5a059]">720-885-1613</a>
                 <a href="mailto:bradenbraccio@yourcastle.com" className="text-[#fdfbf7]/60 text-sm block hover:text-[#c5a059]">bradenbraccio@yourcastle.com</a>
              </div>
           </div>

         </div>
      </div>
    </>
  );
};

// 3. Hero Section
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fdfbf7] pt-32 md:pt-0">
      
      {/* --- LIVING BACKGROUND --- */}
      <div className="absolute inset-0 bg-gradient-radial from-[#ffffff] via-[#f4f1ea] to-[#e6e2d6] z-0"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#0b2b20] opacity-[0.08] blur-[100px] animate-aurora-1 mix-blend-multiply"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#c5a059] opacity-[0.12] blur-[120px] animate-aurora-2 mix-blend-multiply"></div>
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-[#c5a059] opacity-[0.05] blur-[80px] animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none animate-grain" 
           style={{ 
             backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")',
             backgroundSize: '200px 200px'
           }}>
      </div>
      
      {/* 4. Decorative Border Frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#0b2b20]/5 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 md:w-40 md:h-40 border-t-[3px] border-l-[3px] border-[#0b2b20]/20 animate-fade-in-delayed"></div>
          <div className="absolute top-4 left-4 w-12 h-12 md:w-32 md:h-32 border-t border-l border-[#c5a059]/50 animate-fade-in-delayed"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 md:w-40 md:h-40 border-b-[3px] border-r-[3px] border-[#0b2b20]/20 animate-fade-in-delayed"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 md:w-32 md:h-32 border-b border-r border-[#c5a059]/50 animate-fade-in-delayed"></div>
          <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent hidden md:block"></div>
          <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent hidden md:block"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pb-16 md:py-24">
        
        {/* LOGO HERO - BG CREAM TO FIX BORDERS */}
        <Reveal>
          <div className="mx-auto mb-8 md:mb-12 w-36 h-36 md:w-56 md:h-56 border-[2px] md:border-[3px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] shadow-[0_30px_60px_-15px_rgba(11,43,32,0.3)] relative group overflow-hidden transition-all duration-700 hover:border-[#0b2b20] rounded-full p-0 animate-float-subtle">
             {/* Shine effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff]/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 z-20"></div>
             
             {/* Actual Image Logo */}
             <img 
               src="logo.jpg" 
               alt="Braden Braccio Logo" 
               className="w-full h-full object-contain relative z-10 transition-transform duration-[2s] group-hover:scale-110" 
             />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex justify-center items-center gap-4 md:gap-6 mb-8 md:mb-10">
             <span className="w-10 md:w-16 h-[2px] bg-[#0b2b20]/20"></span>
             <p className="text-[#0b2b20] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
               Est. 2024 &bull; Colorado
             </p>
             <span className="w-10 md:w-16 h-[2px] bg-[#0b2b20]/20"></span>
          </div>
        </Reveal>
        
        <Reveal delay={400}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#0b2b20] mb-8 md:mb-10 leading-[1.1] tracking-wide drop-shadow-sm font-medium">
            <span className="block text-[#0b2b20] italic font-normal text-4xl md:text-6xl mb-4 opacity-80">A Higher</span>
            Standard of Living
          </h1>
        </Reveal>
        
        <Reveal delay={600}>
          <p className="text-[#0b2b20]/80 text-base md:text-2xl font-normal mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-serif relative px-2">
            <span className="absolute -top-6 -left-2 md:-left-4 text-4xl md:text-6xl text-[#c5a059]/20 font-serif">"</span>
            Moving from one home to the next is an important moment in life. We bring the experience, care, and effort you need.
            <span className="absolute -bottom-8 md:-bottom-10 -right-2 md:-right-4 text-4xl md:text-6xl text-[#c5a059]/20 font-serif">"</span>
          </p>
        </Reveal>
        
        <Reveal delay={800}>
          <div className="flex flex-col items-center gap-6">
            <a 
              href="#contact" 
              className="group relative inline-block overflow-hidden border-[1.5px] border-[#0b2b20] px-10 md:px-14 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-[#0b2b20] transition-colors duration-500 hover:text-[#fdfbf7] shadow-lg hover:shadow-2xl"
            >
              <span className="absolute inset-0 translate-y-[101%] bg-[#0b2b20] transition-transform duration-500 group-hover:translate-y-0"></span>
              <span className="relative z-10">Start the Conversation</span>
            </a>
            
            <a href="#philosophy" className="animate-bounce mt-4 md:mt-8 text-[#0b2b20]/40 hover:text-[#c5a059] transition-colors">
              <ChevronDown size={28} md:size={32} strokeWidth={1} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

// 4. Bio / Philosophy Section
const BioSection = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#fffefc] relative border-t border-[#c5a059]/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] to-[#f4f1ea] z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none animate-grain" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
        <Reveal className="relative flex justify-center md:justify-end">
            {/* HEADSHOT CONTAINER */}
            <div className="relative w-full max-w-md group">
                <div className="aspect-[3/4] bg-[#f0f0f0] relative overflow-hidden shadow-2xl border border-[#0b2b20]/10 z-10">
                    <img 
                      src="agent.jpg" 
                      alt="Braden Braccio" 
                      className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 sepia-[0.05]"
                    />
                </div>
                <div className="absolute -top-6 -left-6 w-full h-full border border-[#0b2b20] opacity-10 z-0 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#c5a059] opacity-100 z-20"></div>
                
                {/* Logo Badge - Set bg to cream */}
                <div className="absolute -bottom-12 -left-4 md:-left-8 bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[2px] border-[#c5a059] w-36 h-36 md:w-48 md:h-48 flex items-center justify-center overflow-hidden z-30 rounded-full p-0 transition-transform duration-500 hover:scale-105">
                    <img 
                      src="logo.jpg" 
                      alt="Logo Badge" 
                      className="w-full h-full object-contain" 
                    />
                </div>
            </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="mt-16 md:mt-0">
            <span className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#0b2b20]"></span> About Braden
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#0b2b20] mb-8 leading-tight font-medium">
              My Approach
            </h2>
            <div className="space-y-8 text-[#1c1c1c]/90 font-normal leading-relaxed text-lg font-sans">
              <p>
                Braden Braccio believes that buying or selling a home, especially in Colorado’s finest neighborhoods, should feel calm, confident, and deeply personal.
              </p>
              <p>
                As a former <strong>U.S. Veteran</strong>, he brings the same discipline, integrity, and quiet strength to real estate that he once brought to service. His promise is simple: every detail will be handled with care, every conversation kept in complete confidence, and your best interests placed above all else.
              </p>
              <p>
                To Braden, luxury is not just about the property. It is about the peace of mind that comes from working with someone who truly listens, anticipates your needs, and guides you with patience and precision.
              </p>
              <p className="font-serif italic text-xl text-[#0b2b20] mt-4 border-l-4 border-[#c5a059] pl-6 py-2 bg-gradient-to-r from-[#c5a059]/5 to-transparent">
                "You deserve an experience that feels as exceptional as the home itself."
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#0b2b20]/10 pt-8">
              <div className="group cursor-pointer">
                <Shield className="text-[#0b2b20] mb-4 group-hover:text-[#c5a059] transition-colors duration-300 transform group-hover:-translate-y-1" size={32} strokeWidth={1.5} />
                <h4 className="font-serif text-xl mb-2 text-[#0b2b20] font-semibold">US Veteran</h4>
                <p className="text-sm text-[#1c1c1c]/70 font-medium">Disciplined & Trustworthy.</p>
              </div>
              <div className="group cursor-pointer">
                <MapPin className="text-[#0b2b20] mb-4 group-hover:text-[#c5a059] transition-colors duration-300 transform group-hover:-translate-y-1" size={32} strokeWidth={1.5} />
                <h4 className="font-serif text-xl mb-2 text-[#0b2b20] font-semibold">Colorado Expert</h4>
                <p className="text-sm text-[#1c1c1c]/70 font-medium">Local Market Mastery.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// 5. Interactive Process Section (Tabs)
const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState('buyer');

  // Data extracted from PDFs
  const buyerPhases = [
    {
      id: 1,
      title: "Identifying Goals",
      desc: "We clarify your motivation, timeline, and must-haves. This includes selecting a lender, obtaining approval, and signing our exclusive agreement.",
      icon: <CheckCircle />
    },
    {
      id: 2,
      title: "Sourcing The Home",
      desc: "Access to on and off-market listings. We attend open houses, analyze micro-market trends, and draft a winning offer strategy.",
      icon: <Home />
    },
    {
      id: 3,
      title: "Negotiation & Inspection",
      desc: "We present your offer to win. Once accepted, we navigate inspections, disclosures, and negotiate repairs to protect your investment.",
      icon: <Shield />
    },
    {
      id: 4,
      title: "Closing & Beyond",
      desc: "Final walk-throughs, signing, and celebration. But it doesn't end there; we provide resources for your new home and stay in touch.",
      icon: <Key />
    }
  ];

  const sellerPhases = [
    {
      id: 1,
      title: "Defining A Win",
      desc: "Understanding your motivation and ideal moving date. We analyze supply vs. demand and create a strategic plan for your target buyer.",
      icon: <TrendingUp />
    },
    {
      id: 2,
      title: "Listing & Launch",
      desc: "Staging strategy, professional photography, and creating 'The Real Advantage'. We work backwards from the launch date to ensure perfection.",
      icon: <Award />
    },
    {
      id: 3,
      title: "Marketing & Showing",
      desc: "Digital plans, social media strategy, and open houses. We monitor feedback weekly and adapt to changes in the marketplace.",
      icon: <Instagram />
    },
    {
      id: 4,
      title: "Negotiation to Close",
      desc: "Deep offer analysis and multiple offer strategies. We maximize your price and terms, managing the contingency periods smoothly.",
      icon: <Clock />
    }
  ];

  const activePhases = activeTab === 'buyer' ? buyerPhases : sellerPhases;

  return (
    <section id="process" className="py-24 bg-[#0b2b20] text-[#fdfbf7] overflow-hidden relative border-t-4 border-[#c5a059]">
      {/* Texture overlay - kept dark for contrast in this specific section */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none animate-grain" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#163a2c] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold">The Methodology</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-6 text-[#fdfbf7] font-medium">Concierge Real Estate</h2>
            <div className="w-24 h-1 bg-[#c5a059] mx-auto mt-8"></div>
          </Reveal>
          
          <Reveal delay={200} className="flex justify-center mt-12 space-x-6 md:space-x-12">
            <button 
              onClick={() => setActiveTab('buyer')}
              className={`text-sm md:text-base uppercase tracking-[0.2em] font-bold pb-3 transition-all duration-300 ${activeTab === 'buyer' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-[#fdfbf7]/40 hover:text-[#fdfbf7]'}`}
            >
              Buying
            </button>
            <button 
              onClick={() => setActiveTab('seller')}
              className={`text-sm md:text-base uppercase tracking-[0.2em] font-bold pb-3 transition-all duration-300 ${activeTab === 'seller' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-[#fdfbf7]/40 hover:text-[#fdfbf7]'}`}
            >
              Selling
            </button>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {activePhases.map((phase, index) => (
            <Reveal key={phase.id} delay={index * 150}>
              <div className="bg-[#163a2c]/40 backdrop-blur-sm p-8 h-full border border-[#c5a059]/20 hover:border-[#c5a059] transition-all duration-500 group shadow-lg hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] relative overflow-hidden rounded-sm">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                    <div className="text-[#c5a059] mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                    {phase.icon}
                    </div>
                    <h3 className="font-serif text-2xl mb-2 text-[#fdfbf7] font-medium"><span className="text-[#c5a059] text-[10px] font-sans block mb-2 tracking-[0.3em] font-bold uppercase">Phase 0{phase.id}</span> {phase.title}</h3>
                    <p className="text-[#e6e4dc]/80 text-sm leading-relaxed mt-4 font-normal">
                    {phase.desc}
                    </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Contact / CTA Section
const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#fdfbf7] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#ffffff] to-[#e6e2d6] z-0"></div>
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none animate-grain" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-24 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-[#0b2b20]/10 relative">
          
          <div className="text-center">
            <Reveal>
               <h2 className="font-serif text-4xl md:text-6xl text-[#0b2b20] mb-8 font-medium">Let's Work Together</h2>
               <p className="text-[#1c1c1c]/80 mb-12 max-w-lg mx-auto font-normal">
                 Whether you are looking to acquire your next home or list a property, expect a seamless, disciplined experience.
               </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="flex flex-col items-center p-10 bg-[#f9f8f5] border border-[#0b2b20]/5 transition-all hover:border-[#c5a059] hover:bg-white group cursor-pointer shadow-sm hover:shadow-md">
                  <Phone className="text-[#0b2b20] mb-4 group-hover:text-[#c5a059] transition-colors" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-3">Call or Text</span>
                  <a href="tel:720-885-1613" className="font-serif text-xl md:text-2xl text-[#0b2b20] hover:text-[#c5a059] transition-colors font-medium">
                    720-885-1613
                  </a>
                </div>
                <div className="flex flex-col items-center p-10 bg-[#f9f8f5] border border-[#0b2b20]/5 transition-all hover:border-[#c5a059] hover:bg-white group cursor-pointer shadow-sm hover:shadow-md">
                  <Mail className="text-[#0b2b20] mb-4 group-hover:text-[#c5a059] transition-colors" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-3">Email</span>
                  <a href="mailto:bradenbraccio@yourcastle.com" className="font-serif text-lg md:text-xl text-[#0b2b20] hover:text-[#c5a059] transition-colors font-medium break-all">
                    bradenbraccio@<br className="md:hidden"/>yourcastle.com
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <form className="space-y-8 text-left max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" className="peer w-full bg-transparent border-b border-[#0b2b20]/20 py-3 focus:outline-none focus:border-[#c5a059] transition-colors text-[#0b2b20] placeholder-transparent font-medium" id="name" placeholder="Name" />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-[#c5a059] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0b2b20]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#c5a059] peer-focus:text-xs">Name</label>
                  </div>
                  <div className="relative group">
                    <input type="tel" className="peer w-full bg-transparent border-b border-[#0b2b20]/20 py-3 focus:outline-none focus:border-[#c5a059] transition-colors text-[#0b2b20] placeholder-transparent font-medium" id="phone" placeholder="Phone" />
                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-[#c5a059] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0b2b20]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#c5a059] peer-focus:text-xs">Phone</label>
                  </div>
                </div>
                <div className="relative group">
                    <input type="email" className="peer w-full bg-transparent border-b border-[#0b2b20]/20 py-3 focus:outline-none focus:border-[#c5a059] transition-colors text-[#0b2b20] placeholder-transparent font-medium" id="email" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-[#c5a059] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0b2b20]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#c5a059] peer-focus:text-xs">Email</label>
                </div>
                <div className="relative group">
                    <textarea rows="4" className="peer w-full bg-transparent border-b border-[#0b2b20]/20 py-3 focus:outline-none focus:border-[#c5a059] transition-colors text-[#0b2b20] placeholder-transparent font-medium" id="msg" placeholder="Message"></textarea>
                    <label htmlFor="msg" className="absolute left-0 -top-3.5 text-xs text-[#c5a059] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0b2b20]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#c5a059] peer-focus:text-xs">Message</label>
                </div>
                <div className="text-center mt-12">
                  <button type="button" className="bg-[#0b2b20] text-[#fdfbf7] px-14 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#163a2c] transition-all duration-300 shadow-xl w-full md:w-auto border border-[#0b2b20] hover:shadow-[0_10px_30px_-5px_rgba(11,43,32,0.3)] relative overflow-hidden group">
                    <span className="absolute inset-0 bg-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
                    <span className="relative z-10">Send Message</span>
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. Footer
const Footer = () => {
  return (
    <footer className="bg-[#0b2b20] text-[#e6e4dc] py-20 border-t border-[#c5a059]/50 relative">
      {/* Footer Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
             {/* Small Logo Icon - UPDATED to Gold/Black */}
            <div className="mb-6 w-16 h-16 border-[1.5px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] overflow-hidden p-0 rounded-full">
                <img src="logo.jpg" alt="Footer Logo" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif text-3xl text-[#fdfbf7] tracking-widest mb-4">BRADEN BRACCIO</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] mb-8 font-bold">Real Estate Agent</p>
            <div className="flex space-x-6">
              {/* UPDATED INSTAGRAM LINK */}
              <a 
                href="https://www.instagram.com/youragentbraden" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#c5a059] hover:text-white transition-colors transform hover:scale-110"
              >
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-[#c5a059] hover:text-white transition-colors transform hover:scale-110"><Mail size={24} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Brokerage Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#c5a059] text-xs uppercase tracking-[0.2em] font-bold mb-6">Brokerage</h4>
            <div className="space-y-2 text-[#e6e4dc]/80 font-light">
                <p>Your Castle Real Estate</p>
                <p>License #: FA.100107526</p>
                <p>Colorado</p>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col items-center md:items-start">
             <h4 className="text-[#c5a059] text-xs uppercase tracking-[0.2em] font-bold mb-6">Direct Contact</h4>
             <div className="space-y-2 text-[#e6e4dc]/80 font-light">
                <p className="text-lg">720-885-1613</p>
                <p>bradenbraccio@yourcastle.com</p>
                <p className="pt-2 text-[#c5a059]/60 text-xs tracking-widest">@YOURAGENTBRADEN</p>
             </div>
          </div>
        </div>

        <div className="border-t border-[#c5a059]/20 mt-16 pt-8 text-center text-[10px] uppercase tracking-widest text-[#e6e4dc]/40 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Braden Braccio. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-8">
             <a href="#" className="hover:text-[#c5a059] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#c5a059] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-[#fdfbf7] text-[#1c1c1c] font-sans selection:bg-[#c5a059] selection:text-[#0b2b20]">
      {/* Global Font Imports via Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'Lato', sans-serif;
        }

        /* CUSTOM ANIMATIONS */
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.05; transform: scale(1); }
            50% { opacity: 0.1; transform: scale(1.1); }
        }
        @keyframes grain {
            0%, 100% { transform: translate(0,0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
        }
        
        @keyframes aurora-1 {
            0% { transform: translate(0,0) scale(1); }
            33% { transform: translate(50px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0,0) scale(1); }
        }
        
        @keyframes aurora-2 {
            0% { transform: translate(0,0) scale(1); }
            33% { transform: translate(-30px, 30px) scale(1.1); }
            66% { transform: translate(40px, -40px) scale(0.95); }
            100% { transform: translate(0,0) scale(1); }
        }
        
        @keyframes float-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-delayed {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        .animate-float {
            animation: float 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-grain {
            animation: grain 8s steps(10) infinite;
        }
        .animate-aurora-1 {
            animation: aurora-1 20s ease-in-out infinite;
        }
        .animate-aurora-2 {
            animation: aurora-2 25s ease-in-out infinite;
        }
        .animate-float-subtle {
            animation: float-subtle 6s ease-in-out infinite;
        }
        .animate-fade-in-delayed {
            animation: fade-in-delayed 2s ease-out forwards;
        }
      `}</style>

      <Navbar />
      <Hero />
      <BioSection />
      <ProcessSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;