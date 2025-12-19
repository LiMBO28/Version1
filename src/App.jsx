import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, Instagram, MapPin, 
  Home, Key, TrendingUp, CheckCircle, ArrowRight,
  Shield, Award, Clock, ChevronDown, FileText, Heart, User, Star, Plus, ArrowLeft
} from 'lucide-react';

/**
 * BRADEN BRACCIO REAL ESTATE WEBSITE - GOOGLE FORM INTEGRATION FIXED
 */

// --- CONFIGURATION ---
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScKha6595csOHkAq_SGsF-iNoTL7cpFTrzvfOqQ4QwQI_YbLg/formResponse";

// Mapping your form's Entry IDs to our internal state keys
const FIELD_IDS = {
  type: "entry.1368322447",       // "Are you looking to"
  name: "entry.800145333",        // "Full name"
  email: "entry.1134295967",      // "Email address"
  phone: "entry.1232206198",      // "Phone number"
  contactMethod: "entry.691798325", // "Preferred contact method"
  
  // Buying Fields
  buyTimeline: "entry.2095125743", // "What is your timeline?"
  buyLocation: "entry.1815387174", // "Preferred location(s)"
  buyPrice: "entry.283551999",     // "Price range"
  buyType: "entry.1646078527",     // "Property type interested in"
  buyBedBath: "entry.1264040819",  // "How many bedrooms/bathrooms"
  buyMortgage: "entry.948379821",  // "Are you pre-approved"
  sellFirst: "entry.416090336",    // "Do you currently own a home..."
  
  // Selling Fields
  sellAddress: "entry.220710153",  // "Property address"
  sellType: "entry.591754101",     // "Property type"
  sellStats: "entry.1215922251",   // "Approximate square footage"
  sellBedBath: "entry.1733427046", // "Bedrooms / Bathrooms"
  sellYear: "entry.853949151",     // "Year built"
  sellTimeline: "entry.153080099", // "When do you need or want to sell by"
  sellReason: "entry.936796055",   // "Main reason for selling"
  buyAfter: "entry.308169242",     // "Do you plan to buy another home"
  sellUpdates: "entry.1866600196", // "Recent updates"
  
  // Catch-all
  finalNotes: "entry.1343311960"   // "How can I best help you?"
};

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
const Navbar = ({ onNavigate, onOpenQuestionnaire }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNavClick = (target, tab = null) => {
    setIsOpen(false);
    onNavigate(target, tab);
  };

  const LogoPlaceholder = ({ className }) => (
    <div className={`bg-[#0b2b20] flex items-center justify-center text-[#c5a059] font-serif font-bold text-xl ${className}`}>
      B
    </div>
  );

  return (
    <>
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-700 border-b border-[#0b2b20]/10 ${
        scrolled 
          ? 'bg-[#fdfbf7]/95 backdrop-blur-xl shadow-sm py-3 md:py-4' 
          : 'bg-[#fdfbf7] md:bg-transparent py-4 md:py-8 shadow-sm md:shadow-none'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          <a href="#" onClick={() => handleNavClick('home')} className="flex items-center gap-3 md:gap-4 relative group">
             <div className="w-10 h-10 md:w-12 md:h-12 border-[1.5px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] shadow-md rounded-full overflow-hidden p-0 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="logo.jpg" 
                  onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.classList.add('bg-[#0b2b20]'); e.target.parentNode.innerHTML = '<span class="text-[#c5a059] font-serif font-bold text-xl">B</span>'; }}
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

          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => handleNavClick('philosophy')} className="text-xs uppercase tracking-[0.15em] font-bold text-[#0b2b20] hover:text-[#c5a059] transition-colors duration-300 relative group overflow-hidden">
              <span className="relative z-10">Philosophy</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
            <button onClick={() => handleNavClick('process', 'buyer')} className="text-xs uppercase tracking-[0.15em] font-bold text-[#0b2b20] hover:text-[#c5a059] transition-colors duration-300 relative group overflow-hidden">
              <span className="relative z-10">For Buyers</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
            <button onClick={() => handleNavClick('process', 'seller')} className="text-xs uppercase tracking-[0.15em] font-bold text-[#0b2b20] hover:text-[#c5a059] transition-colors duration-300 relative group overflow-hidden">
              <span className="relative z-10">For Sellers</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
            <button onClick={() => handleNavClick('impact')} className="text-xs uppercase tracking-[0.15em] font-bold text-[#0b2b20] hover:text-[#c5a059] transition-colors duration-300 relative group overflow-hidden">
              <span className="relative z-10">Community Impact</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
            
            <button onClick={() => handleNavClick('contact')} className="relative px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-[#0b2b20] border border-[#0b2b20] overflow-hidden group transition-all duration-300 hover:text-[#fdfbf7]">
              <span className="absolute inset-0 w-full h-full bg-[#0b2b20] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
              <span className="relative z-10">Inquire</span>
            </button>
          </div>

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
         <div className="absolute inset-0 bg-[#0b2b20]"></div>
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>
         
         <button 
           className="absolute top-6 right-6 text-[#fdfbf7] p-2 hover:text-[#c5a059] transition-colors z-50"
           onClick={() => setIsOpen(false)}
           aria-label="Close Menu"
         >
            <X size={36} />
         </button>
         
         <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center px-6 pb-12">
           <div className="w-20 h-20 border-[1.5px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] rounded-full overflow-hidden p-0 mt-4 mb-8 shadow-2xl shrink-0">
             <img src="logo.jpg" onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML = '<span class="text-[#0b2b20] font-serif font-bold text-3xl">B</span>'}} alt="B Logo" className="w-full h-full object-contain" />
           </div>

           <div className="flex flex-col items-center space-y-6 w-full">
             <button onClick={() => handleNavClick('philosophy')} className="font-serif text-3xl text-[#fdfbf7] hover:text-[#c5a059] transition-colors">Philosophy</button>
             <button onClick={() => handleNavClick('process', 'buyer')} className="font-serif text-3xl text-[#fdfbf7] hover:text-[#c5a059] transition-colors">For Buyers</button>
             <button onClick={() => handleNavClick('process', 'seller')} className="font-serif text-3xl text-[#fdfbf7] hover:text-[#c5a059] transition-colors">For Sellers</button>
             <button onClick={() => handleNavClick('impact')} className="font-serif text-3xl text-[#fdfbf7] hover:text-[#c5a059] transition-colors">Community Impact</button>
             <button onClick={() => handleNavClick('contact')} className="font-serif text-3xl text-[#fdfbf7] hover:text-[#c5a059] transition-colors">Contact</button>
           </div>

           <div className="w-12 h-[1px] bg-[#c5a059]/50 my-8"></div>

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
                 <div className="mb-4 inline-block">
                    <img src="Untitled design (28).png" onError={(e) => e.target.style.display='none'} alt="Your Castle Real Estate" className="h-16 w-auto object-contain filter invert opacity-90" />
                 </div>
                 
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
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fdfbf7] pt-32 md:pt-0">
      <div className="absolute inset-0 bg-gradient-radial from-[#ffffff] via-[#f4f1ea] to-[#e6e2d6] z-0"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#0b2b20] opacity-[0.08] blur-[100px] animate-aurora-1 mix-blend-multiply"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#c5a059] opacity-[0.12] blur-[120px] animate-aurora-2 mix-blend-multiply"></div>
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-[#c5a059] opacity-[0.05] blur-[80px] animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none animate-grain" 
           style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")', backgroundSize: '200px 200px' }}>
      </div>
      
      <div className="absolute inset-4 md:inset-8 border border-[#0b2b20]/5 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 md:w-40 md:h-40 border-t-[3px] border-l-[3px] border-[#0b2b20]/20 animate-fade-in-delayed"></div>
          <div className="absolute top-4 left-4 w-12 h-12 md:w-32 md:h-32 border-t border-l border-[#c5a059]/50 animate-fade-in-delayed"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 md:w-40 md:h-40 border-b-[3px] border-r-[3px] border-[#0b2b20]/20 animate-fade-in-delayed"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 md:w-32 md:h-32 border-b border-r border-[#c5a059]/50 animate-fade-in-delayed"></div>
          <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent hidden md:block"></div>
          <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent hidden md:block"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pb-16 md:py-24">
        <Reveal>
          <div className="mx-auto mb-8 md:mb-12 w-36 h-36 md:w-56 md:h-56 border-[2px] md:border-[3px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] shadow-[0_30px_60px_-15px_rgba(11,43,32,0.3)] relative group overflow-hidden transition-all duration-700 hover:border-[#0b2b20] rounded-full p-0 animate-float-subtle">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff]/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 z-20"></div>
             <img src="logo.jpg" onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML = '<span class="text-[#0b2b20] font-serif font-bold text-6xl">B</span>'}} alt="Braden Braccio Logo" className="w-full h-full object-contain relative z-10 transition-transform duration-[2s] group-hover:scale-110" />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex justify-center items-center gap-4 md:gap-6 mb-8 md:mb-10">
             <span className="w-10 md:w-16 h-[2px] bg-[#0b2b20]/20"></span>
             <p className="text-[#0b2b20] uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">COLORADO</p>
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
            Moving from one home to the next is an important moment in life.<br className="hidden md:block" />
            <span className="md:hidden"> </span>
            We bring the experience, care, and effort you need.
          </p>
        </Reveal>
        
        <Reveal delay={800}>
          <div className="flex flex-col items-center gap-6">
            <a href="#contact" className="group relative inline-block overflow-hidden border-[1.5px] border-[#0b2b20] px-10 md:px-14 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-[#0b2b20] transition-colors duration-500 hover:text-[#fdfbf7] shadow-lg hover:shadow-2xl">
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

// 4. Bio Section
const BioSection = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#fffefc] relative border-t border-[#c5a059]/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] to-[#f4f1ea] z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none animate-grain" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
        <Reveal className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md group">
                <div className="aspect-[3/4] bg-[#f0f0f0] relative overflow-hidden shadow-2xl border border-[#0b2b20]/10 z-10">
                    <img src="agent.jpg" onError={(e) => {e.target.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800';}} alt="Braden Braccio" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 sepia-[0.05]" />
                </div>
                <div className="absolute -top-6 -left-6 w-full h-full border border-[#0b2b20] opacity-10 z-0 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#c5a059] opacity-100 z-20"></div>
                <div className="absolute -bottom-12 -left-4 md:-left-8 bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[2px] border-[#c5a059] w-36 h-36 md:w-48 md:h-48 flex items-center justify-center overflow-hidden z-30 rounded-full p-0 transition-transform duration-500 hover:scale-105">
                    <img src="logo.jpg" onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML = '<span class="text-[#0b2b20] font-serif font-bold text-4xl">B</span>'}} alt="Logo Badge" className="w-full h-full object-contain" />
                </div>
            </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="mt-16 md:mt-0">
            <span className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#0b2b20]"></span> About Braden
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#0b2b20] mb-8 leading-tight font-medium">My Approach</h2>
            <div className="space-y-8 text-[#1c1c1c]/90 font-normal leading-relaxed text-lg font-sans">
              <p>Braden Braccio believes that buying or selling a home, especially in Colorado’s finest neighborhoods, should feel calm, confident, and deeply personal.</p>
              <p>As a former <strong>U.S. Veteran</strong>, he brings the same discipline, integrity, and commitment to real estate that he once brought to service. His promise is simple: every detail will be handled with care, every conversation kept in complete confidence, and your best interests placed above all else.</p>
              <p>To Braden, luxury is not just about the property, but about the way he conducts his business. Whether you are purchasing or selling a home, your real estate transaction should be stress free. It is about the peace of mind that comes from someone who is actually here to listen.</p>
              <p className="font-serif italic text-xl text-[#0b2b20] mt-4 border-l-4 border-[#c5a059] pl-6 py-2 bg-gradient-to-r from-[#c5a059]/5 to-transparent">"Luxury isn’t just the house. It’s having someone in your corner who’s disciplined enough to handle every detail and blunt enough to never waste your time."</p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#0b2b20]/10 pt-8">
              <div className="group cursor-pointer">
                <Shield className="text-[#0b2b20] mb-4 group-hover:text-[#c5a059] transition-colors duration-300 transform group-hover:-translate-y-1" size={32} strokeWidth={1.5} />
                <h4 className="font-serif text-xl mb-2 text-[#0b2b20] font-semibold">US Veteran</h4>
                <p className="text-sm text-[#1c1c1c]/70 font-medium">Here to Serve</p>
              </div>
              <div className="group cursor-pointer">
                <MapPin className="text-[#0b2b20] mb-4 group-hover:text-[#c5a059] transition-colors duration-300 transform group-hover:-translate-y-1" size={32} strokeWidth={1.5} />
                <h4 className="font-serif text-xl mb-2 text-[#0b2b20] font-semibold">Colorado Expert</h4>
                <p className="text-sm text-[#1c1c1c]/70 font-medium">Data. No Delays.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// 5. Interactive Process Section (Tabs)
const ProcessSection = ({ activeTab }) => {
  const [currentTab, setCurrentTab] = useState('buyer');

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const buyerPhases = [
    { id: 1, title: "Identifying Goals", desc: "We clarify your motivation, timeline, and must-haves. This includes selecting a lender, obtaining approval, and signing our exclusive agreement.", icon: <CheckCircle /> },
    { id: 2, title: "Sourcing The Home", desc: "Access to on and off-market listings. We attend open houses, analyze micro-market trends, and draft a winning offer strategy.", icon: <Home /> },
    { id: 3, title: "Negotiation & Inspection", desc: "We present your offer to win. Once accepted, we navigate inspections, disclosures, and negotiate repairs to protect your investment.", icon: <Shield /> },
    { id: 4, title: "Closing & Beyond", desc: "Final walk-throughs, signing, and celebration. But it doesn't end there; we provide resources for your new home and stay in touch.", icon: <Key /> }
  ];

  const sellerPhases = [
    { id: 1, title: "Defining A Win", desc: "Understanding your motivation and ideal moving date. We analyze supply vs. demand and create a strategic plan for your target buyer.", icon: <TrendingUp /> },
    { id: 2, title: "Listing & Launch", desc: "Staging strategy, professional photography, and creating 'The Real Advantage'. We work backwards from the launch date to ensure perfection.", icon: <Award /> },
    { id: 3, title: "Marketing & Showing", desc: "Digital plans, social media strategy, and open houses. We monitor feedback weekly and adapt to changes in the marketplace.", icon: <Instagram /> },
    { id: 4, title: "Negotiation to Close", desc: "Deep offer analysis and multiple offer strategies. We maximize your price and terms, managing the contingency periods smoothly.", icon: <Clock /> }
  ];

  const activePhases = currentTab === 'buyer' ? buyerPhases : sellerPhases;

  return (
    <section id="process" className="py-24 bg-[#0b2b20] text-[#fdfbf7] overflow-hidden relative border-t-4 border-[#c5a059]">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none animate-grain" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#163a2c] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold">The Methodology</span>
            <h2 className="font-serif text-4xl md:text-6xl mt-6 text-[#fdfbf7] font-medium">Real Estate</h2>
            <div className="w-24 h-1 bg-[#c5a059] mx-auto mt-8"></div>
          </Reveal>
          
          <Reveal delay={200} className="flex justify-center mt-12 space-x-6 md:space-x-12">
            <button onClick={() => setCurrentTab('buyer')} className={`text-sm md:text-base uppercase tracking-[0.2em] font-bold pb-3 transition-all duration-300 ${currentTab === 'buyer' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-[#fdfbf7]/40 hover:text-[#fdfbf7]'}`}>Buying</button>
            <button onClick={() => setCurrentTab('seller')} className={`text-sm md:text-base uppercase tracking-[0.2em] font-bold pb-3 transition-all duration-300 ${currentTab === 'seller' ? 'text-[#c5a059] border-b-2 border-[#c5a059]' : 'text-[#fdfbf7]/40 hover:text-[#fdfbf7]'}`}>Selling</button>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {activePhases.map((phase, index) => (
            <Reveal key={phase.id} delay={index * 150}>
              <div className="bg-[#163a2c]/40 backdrop-blur-sm p-8 h-full border border-[#c5a059]/20 hover:border-[#c5a059] transition-all duration-500 group shadow-lg hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="text-[#c5a059] mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                    {phase.icon}
                    </div>
                    <h3 className="font-serif text-2xl mb-2 text-[#fdfbf7] font-medium"><span className="text-[#c5a059] text-[10px] font-sans block mb-2 tracking-[0.3em] font-bold uppercase">Phase 0{phase.id}</span> {phase.title}</h3>
                    <p className="text-[#e6e4dc]/80 text-sm leading-relaxed mt-4 font-normal">{phase.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Community Impact Section
const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-[#fdfbf7] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold">Giving Back</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-6 text-[#0b2b20] font-medium">Community Impact</h2>
            <p className="text-[#1c1c1c]/70 mt-6 max-w-2xl mx-auto">
              Service extends beyond real estate. We are proud to support organizations that provide vital assistance to veterans, first responders, and those in need.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal delay={100}>
            <div className="bg-white border border-[#0b2b20]/10 p-8 text-center hover:border-[#c5a059] transition-all shadow-sm">
              <Heart className="text-[#c5a059] w-12 h-12 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-[#0b2b20] mb-4">Wounded Warrior Project</h3>
              <p className="text-sm text-[#1c1c1c]/70 mb-6">Supporting veterans and service members who incurred a physical or mental injury, illness, or wound while serving in the military.</p>
              <a href="https://support.woundedwarriorproject.org/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#0b2b20] border-b border-[#c5a059] hover:text-[#c5a059]">Donate Now</a>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="bg-white border border-[#0b2b20]/10 p-8 text-center hover:border-[#c5a059] transition-all shadow-sm">
              <Shield className="text-[#c5a059] w-12 h-12 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-[#0b2b20] mb-4">First Responders Funding</h3>
              <p className="text-sm text-[#1c1c1c]/70 mb-6">Providing essential equipment, training, and financial support to the brave men and women who serve as first responders in our communities.</p>
              <a href="https://www.firstrespondersfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#0b2b20] border-b border-[#c5a059] hover:text-[#c5a059]">Support Now</a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="bg-white border border-[#0b2b20]/10 p-8 text-center hover:border-[#c5a059] transition-all shadow-sm">
              <Phone className="text-[#c5a059] w-12 h-12 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-[#0b2b20] mb-4">Veteran Crisis Line</h3>
              <p className="text-sm text-[#1c1c1c]/70 mb-6">Free, confidential support for Veterans in crisis and their families and friends. Available 24/7/365.</p>
              <a href="https://www.veteranscrisisline.net/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#0b2b20] border-b border-[#c5a059] hover:text-[#c5a059]">Get Help / Donate</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// 7. Testimonials Section
const Testimonials = () => {
  return (
    <section className="py-24 bg-[#0b2b20] text-[#fdfbf7] border-t border-[#c5a059]/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#c5a059] text-xs uppercase tracking-[0.25em] font-bold">Client Stories</span>
          <h2 className="font-serif text-4xl mt-4">Trusted by Families</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="bg-[#163a2c]/50 p-10 border border-[#c5a059]/20 relative">
              <div className="absolute top-6 left-6 text-[#c5a059]/20 text-6xl font-serif">"</div>
              <p className="relative z-10 text-lg font-light leading-relaxed italic mb-6">
                Braden has been excellent to work with. He’s very helpful, knowledgeable, and made the whole house hunting to closing experience a pleasure. We’d recommend him to anyone.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c5a059] flex items-center justify-center text-[#0b2b20] font-bold">D</div>
                <div>
                  <p className="font-serif text-lg">Denise and Keith Grace</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-[#163a2c]/50 p-10 border border-[#c5a059]/20 relative">
              <div className="absolute top-6 left-6 text-[#c5a059]/20 text-6xl font-serif">"</div>
              <p className="relative z-10 text-lg font-light leading-relaxed italic mb-6">
                Braden was an excellent realtor. He was prompt, organized, and always on time. He was willing to go above and beyond taking extra steps to help me close on the house because I lived too far away to do it myself. Braden was the 4th realtor I have worked with and will be the one I reach out to next time I go to purchase a home.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c5a059] flex items-center justify-center text-[#0b2b20] font-bold">A</div>
                <div>
                  <p className="font-serif text-lg">Aaron Barnett</p>
                  <p className="text-xs uppercase tracking-wider text-[#c5a059]">US Army</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// 8. Contact Section
const Contact = ({ onOpenQuestionnaire }) => {
  return (
    <section id="contact" className="py-24 bg-[#fdfbf7] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#ffffff] to-[#e6e2d6] z-0"></div>
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-24 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-[#0b2b20]/10 relative">
          
          <div className="text-center">
            <Reveal>
               <h2 className="font-serif text-4xl md:text-6xl text-[#0b2b20] mb-8 font-medium">Let's Work Together</h2>
               <p className="text-[#1c1c1c]/80 mb-12 max-w-lg mx-auto font-normal">
                 Your goals become my mission. Simple as that.
               </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-lg md:text-xl text-[#0b2b20] font-medium">bradenbraccio</span>
                    <a href="mailto:bradenbraccio@yourcastle.com" className="text-sm text-[#0b2b20]/60 hover:text-[#c5a059] transition-colors font-sans">@yourcastle.com</a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="text-center mb-12">
                 <button 
                   onClick={onOpenQuestionnaire}
                   className="inline-flex items-center gap-3 px-10 py-5 border border-[#0b2b20] bg-[#0b2b20] text-[#fdfbf7] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#c5a059] hover:border-[#c5a059] transition-all duration-300 group shadow-lg"
                 >
                    <FileText size={16} className="group-hover:scale-110 transition-transform" />
                    <span>Start Questionnaire</span>
                 </button>
                 <p className="text-[#0b2b20]/40 text-xs mt-4 tracking-wide">Tell us about your needs in 2 minutes.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// 9. ADAPTIVE QUESTIONNAIRE WIZARD (FIXED SUBMISSION)
const QuestionnaireModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0); 
  const [type, setType] = useState(null); // 'buy', 'sell', 'both', 'join'
  const [answers, setAnswers] = useState({});
  const [licenseStatus, setLicenseStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // RESET ON CLOSE
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setType(null);
        setAnswers({});
        setLicenseStatus(null);
        setIsSubmitting(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectType = (selected) => {
    setType(selected);
    setStep(1); 
  };

  const nextStep = () => {
    // Basic Validation for Step 1
    if (step === 1) {
        if (!answers.name || !answers.email) {
            alert("Please provide your name and email so we can contact you.");
            return;
        }
    }
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleInput = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // --- SUBMISSION HANDLER (FIXED) ---
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Use URLSearchParams for application/x-www-form-urlencoded
    // This is more reliable for Google Forms than FormData
    const formData = new URLSearchParams();
    
    // Helper to safely append data
    const append = (key, value) => {
        if (value && FIELD_IDS[key]) {
            formData.append(FIELD_IDS[key], value);
        }
    };
    
    // 1. Common Fields
    append('type', type ? type.toUpperCase() : 'General');
    append('name', answers.name);
    append('email', answers.email);
    append('phone', answers.phone);
    append('contactMethod', answers.contactMethod);
    append('finalNotes', answers.finalNotes);

    // 2. Buying Fields
    if (type === 'buy' || type === 'both') {
        append('buyTimeline', answers.buyTimeline);
        append('buyLocation', answers.buyLocation);
        append('buyPrice', answers.buyPrice);
        append('buyType', answers.buyType);
        append('buyBedBath', answers.buyBedBath);
        append('buyMortgage', answers.buyMortgage);
        append('sellFirst', answers.sellFirst);
    }
    
    // 3. Selling Fields
    if (type === 'sell' || type === 'both') {
        append('sellAddress', answers.sellAddress);
        append('sellType', answers.sellType);
        append('sellStats', answers.sellSqFt); // Correctly mapped to sellStats
        append('sellBedBath', answers.sellBedBath);
        append('sellYear', answers.sellYear);
        append('sellTimeline', answers.sellTimeline);
        append('sellReason', answers.sellReason);
        append('buyAfter', answers.buyAfter);
        append('sellUpdates', answers.sellUpdates);
    }

    if (type === 'join') {
      const joinNote = `
        --- AGENT APPLICATION ---
        Licensed: ${answers.hasLicense || 'N/A'}
        Experience: ${answers.experience || 'N/A'}
        Transactions (12mo): ${answers.transactions || 'N/A'}
        GCI: ${answers.gci || 'N/A'}
        Focus Area: ${answers.focusArea || 'N/A'}
        Interests: ${answers.joinReason ? answers.joinReason.join(', ') : 'N/A'}
        Preference: ${answers.workPreference || 'N/A'}
        Previous Team: ${answers.prevTeam || 'N/A'}
        Source: ${answers.source || 'N/A'}
        Notes: ${answers.finalNotes || 'None'}
      `;
      // Override final notes for Join flow
      formData.delete(FIELD_IDS.finalNotes);
      formData.append(FIELD_IDS.finalNotes, joinNote);
    }

    try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
            method: 'POST',
            mode: 'no-cors', // standard for Google Forms from client-side
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        // Success Handler
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            alert("Thank you! Your information has been sent to Braden.");
        }, 1000);
        
    } catch (error) {
        console.error("Submission error", error);
        // Fallback to mailto if fetch fails
        const recipient = "bradenbraccio@yourcastle.com";
        const subject = `New Website Inquiry: ${type ? type.toUpperCase() : 'General'}`;
        let body = `Name: ${answers.name}\nEmail: ${answers.email}\nPhone: ${answers.phone}\n\n`;
        body += `Notes: ${answers.finalNotes || 'Please check Google Sheet for full details.'}`;
        
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setIsSubmitting(false);
        onClose();
    }
  };

  // --- RENDER CONTENT BASED ON STEP & TYPE (WIZARD MODE) ---
  const renderContent = () => {
    
    // STEP 0: INITIAL SELECTION
    if (step === 0) {
      return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
          <h3 className="font-serif text-3xl md:text-4xl text-[#0b2b20] text-center">How can I help you today?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => handleSelectType('buy')} className="group p-8 border border-[#0b2b20]/20 hover:border-[#c5a059] hover:bg-[#f9f8f5] transition-all flex flex-col items-center">
              <Home className="text-[#0b2b20] w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">Buy a Home</span>
            </button>
            <button onClick={() => handleSelectType('sell')} className="group p-8 border border-[#0b2b20]/20 hover:border-[#c5a059] hover:bg-[#f9f8f5] transition-all flex flex-col items-center">
              <TrendingUp className="text-[#0b2b20] w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">Sell a Home</span>
            </button>
            <button onClick={() => handleSelectType('both')} className="group p-8 border border-[#0b2b20]/20 hover:border-[#c5a059] hover:bg-[#f9f8f5] transition-all flex flex-col items-center">
              <Key className="text-[#0b2b20] w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">Buy & Sell</span>
            </button>
            <button onClick={() => handleSelectType('join')} className="group p-8 border border-[#0b2b20]/20 hover:border-[#c5a059] hover:bg-[#f9f8f5] transition-all flex flex-col items-center">
              <User className="text-[#0b2b20] w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">Join My Team</span>
            </button>
          </div>
        </div>
      );
    }

    // --- STEP 1: BASIC INFO ---
    if (step === 1) {
      return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
           <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Basic Info</h3></div>
           <input required placeholder="Full Name *" value={answers.name || ''} onChange={(e) => handleInput('name', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
           <input required placeholder="Email Address *" value={answers.email || ''} onChange={(e) => handleInput('email', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
           <input placeholder="Phone Number" value={answers.phone || ''} onChange={(e) => handleInput('phone', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
           <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059]">Next</button>
        </div>
      );
    }

    // --- STEP 2: CONTACT METHOD ---
    if (step === 2) {
       return (
         <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Preferred Contact</h3></div>
            <div className="space-y-3">
               {['Email', 'Phone Call', 'Text'].map(opt => (
                  <button key={opt} onClick={() => { handleInput('contactMethod', opt); nextStep(); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] text-left">{opt}</button>
               ))}
            </div>
         </div>
       );
    }

    // --- JOIN TEAM BRANCH ---
    if (type === 'join') {
       if (step === 3) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">License Status</h3></div>
               <p>Do you currently hold an active Colorado real estate license?</p>
               <button onClick={() => { handleInput('hasLicense', 'Yes'); nextStep(); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] text-left">Yes (License #: ________)</button>
               <button onClick={() => { handleInput('hasLicense', 'No'); setStep(999); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] text-left">No, but interested</button>
               <button onClick={() => { handleInput('hasLicense', 'No'); setStep(999); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] text-left">No, just exploring</button>
             </div>
          );
       }
       if (step === 999) {
          return (
             <div className="bg-[#fdfbf7] border-l-4 border-[#c5a059] p-8 shadow-sm animate-in fade-in duration-500">
               <h4 className="font-serif text-xl mb-4 text-[#0b2b20]">Thank you for your interest!</h4>
               <p className="text-sm text-[#1c1c1c]/80 mb-4">Since you're not yet licensed, one of our experienced team members will reach out to you within 24-48 hours to personally guide you through the next steps.</p>
               {/* Finish Button now just closes modal, NO EMAIL SENT */}
               <button onClick={onClose} className="bg-[#0b2b20] text-white px-8 py-3 uppercase text-xs font-bold hover:bg-[#c5a059]">Finish</button>
            </div>
          );
       }
       // If Licensed, continue to Step 4...
       if (step === 4) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Experience</h3></div>
               {['New to Industry', '< 2 Years', '2-5 Years', '5-10 Years', '10+ Years'].map(opt => (
                  <button key={opt} onClick={() => { handleInput('experience', opt); nextStep(); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] text-left">{opt}</button>
               ))}
             </div>
          );
       }
       if (step === 5) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Production (Last 12mo)</h3></div>
               <input placeholder="# of Transactions" onChange={(e) => handleInput('transactions', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none mb-4" />
               <input placeholder="Approx GCI" onChange={(e) => handleInput('gci', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
               <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059]">Next</button>
             </div>
          );
       }
       if (step === 6) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Focus Area</h3></div>
               <input placeholder="What areas do you serve? (e.g. Denver Metro)" onChange={(e) => handleInput('focusArea', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
               <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] mt-4">Next</button>
             </div>
          );
       }
       if (step === 7) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Why Join?</h3></div>
               <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
               <div className="space-y-2">
                 {['Leads & Marketing', 'Mentorship', 'Team Culture', 'Tools', 'Growth'].map(opt => (
                    <label key={opt} className="flex items-center gap-3 p-3 border border-gray-200 cursor-pointer hover:bg-gray-50">
                       <input type="checkbox" onChange={(e) => { 
                          const current = answers.joinReason || [];
                          if(e.target.checked) handleInput('joinReason', [...current, opt]);
                          else handleInput('joinReason', current.filter(x => x !== opt));
                       }} className="accent-[#c5a059] w-5 h-5" /> 
                       <span>{opt}</span>
                    </label>
                 ))}
               </div>
               <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] mt-4">Next</button>
             </div>
          );
       }
       if (step === 8) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Work Preference</h3></div>
               {['Buyers', 'Sellers', 'Both'].map(opt => (
                  <button key={opt} onClick={() => { handleInput('workPreference', opt); nextStep(); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] text-left">{opt}</button>
               ))}
             </div>
          );
       }
       if (step === 9) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex items-center gap-4 mb-2"><button onClick={prevStep}><ArrowLeft/></button><h3 className="font-serif text-2xl">Final Details</h3></div>
               <input placeholder="Have you worked on a team before? (Details)" onChange={(e) => handleInput('prevTeam', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none mb-4" />
               <input placeholder="How did you hear about us?" onChange={(e) => handleInput('source', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none mb-4" />
               <textarea placeholder="Any questions or links (LinkedIn/Resume)..." onChange={(e) => handleInput('finalNotes', e.target.value)} rows="3" className="w-full p-4 border border-gray-300 bg-transparent outline-none"></textarea>
               <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] mt-4 disabled:opacity-50">
                   {isSubmitting ? 'Sending...' : 'Submit Application'}
               </button>
             </div>
          );
       }
    }

    // --- BUYER FLOW ---
    if (type === 'buy' || (type === 'both' && step <= 5)) {
       let currentStep = step;
       if (type === 'both') currentStep = step; // Normal flow

       if (currentStep === 2) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">Buying Timeline</h3>
                </div>
                <div className="space-y-3">
                   {['Ready Now (0-30 days)', '1-3 Months', '3-6 Months', '6+ Months'].map(opt => (
                      <button key={opt} onClick={() => { handleInput('buyTimeline', opt); nextStep(); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] hover:bg-[#f9f8f5] text-left font-medium transition-all">{opt}</button>
                   ))}
                </div>
             </div>
          );
       }
       if (currentStep === 3) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">Location & Price</h3>
                </div>
                <input placeholder="Preferred Locations (City, Zip, Neighborhood)" onChange={(e) => handleInput('buyLocation', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none mb-4" />
                <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest font-bold">Price Range</label>
                   <select onChange={(e) => handleInput('buyPrice', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none">
                      <option value="">Select Range...</option>
                      <option>Under $400k</option>
                      <option>$400k - $600k</option>
                      <option>$600k - $800k</option>
                      <option>$800k - $1M</option>
                      <option>$1M+</option>
                   </select>
                </div>
                <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] transition-colors mt-4">Next</button>
             </div>
          );
       }
       if (currentStep === 4) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">Property Details</h3>
                </div>
                <select onChange={(e) => handleInput('buyType', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none mb-4">
                   <option>Single Family Home</option>
                   <option>Condo/Townhome</option>
                   <option>Multi-Family</option>
                   <option>Land</option>
                </select>
                <input placeholder="Bed / Bath Count" onChange={(e) => handleInput('buyBedBath', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
                <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] transition-colors mt-4">Next</button>
             </div>
          );
       }
       if (currentStep === 5) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">Financing</h3>
                </div>
                <p>Are you pre-approved for a mortgage?</p>
                <div className="space-y-3">
                   {['Yes', 'No, but planning to', 'Paying Cash', 'Not yet'].map(opt => (
                      <button key={opt} onClick={() => { handleInput('buyMortgage', opt); type === 'both' ? nextStep() : setStep(100); }} className="w-full p-4 border border-gray-300 hover:border-[#c5a059] hover:bg-[#f9f8f5] text-left font-medium transition-all">{opt}</button>
                   ))}
                </div>
             </div>
          );
       }
    }

    // --- SELLER FLOW ---
    if (type === 'sell' || type === 'both') {
       // Adjust steps for Sell flow
       // If type is sell, steps start at 2. If both, steps start at 6 (after buy flow)
       let effectiveStep = step; 
       if (type === 'sell') effectiveStep = step; 
       if (type === 'both') effectiveStep = step - 4; // Shift logic for both

       if (effectiveStep === 2) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">{type === 'both' ? 'Selling Side' : 'Property Address'}</h3>
                </div>
                <input placeholder="Property Address" onChange={(e) => handleInput('sellAddress', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
                <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] transition-colors mt-4">Next</button>
             </div>
          );
       }
       if (effectiveStep === 3) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">Property Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <input placeholder="Approx Sq Ft" onChange={(e) => handleInput('sellSqFt', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
                   <input placeholder="Year Built" onChange={(e) => handleInput('sellYear', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
                </div>
                <input placeholder="Bedrooms / Bathrooms" onChange={(e) => handleInput('sellBedBath', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none" />
                <button onClick={nextStep} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] transition-colors mt-4">Next</button>
             </div>
          );
       }
       if (effectiveStep === 4) {
          return (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-2">
                   <button onClick={prevStep} className="text-[#0b2b20]/50 hover:text-[#0b2b20]"><ArrowLeft size={20} /></button>
                   <h3 className="font-serif text-2xl text-[#0b2b20]">Timeline & Motivation</h3>
                </div>
                <select onChange={(e) => handleInput('sellTimeline', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none mb-4">
                   <option value="">Sell By?</option>
                   <option>ASAP</option>
                   <option>Within 30 Days</option>
                   <option>1-3 Months</option>
                   <option>6+ Months</option>
                </select>
                <select onChange={(e) => handleInput('sellReason', e.target.value)} className="w-full p-4 border border-gray-300 bg-transparent outline-none">
                   <option value="">Main Reason?</option>
                   <option>Upsizing</option>
                   <option>Downsizing</option>
                   <option>Relocation</option>
                   <option>Financial</option>
                   <option>Life Event</option>
                </select>
                <button onClick={() => setStep(100)} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] transition-colors mt-4">Review & Submit</button>
             </div>
          );
       }
    }

    // --- FINAL SUBMISSION SCREEN ---
    if (step === 100) {
       return (
         <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="font-serif text-2xl text-[#0b2b20] border-b border-[#c5a059]/30 pb-4">One Last Thing</h3>
            <p className="text-sm text-gray-600">Any specific needs, questions, or updates I should know about?</p>
            <textarea 
               rows="4" 
               className="w-full p-4 border border-gray-300 bg-transparent outline-none focus:border-[#c5a059]" 
               placeholder="Tell me more..."
               onChange={(e) => handleInput('finalNotes', e.target.value)}
            ></textarea>
            
            <div className="pt-4">
               <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-[#0b2b20] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c5a059] transition-colors shadow-lg disabled:opacity-50">
                   {isSubmitting ? 'Submitting...' : 'Submit Information'}
               </button>
               <p className="text-[10px] text-center text-gray-500 mt-3">
                  I'll reach out within 24 hours. For faster response, text (720) 885-1613.
               </p>
            </div>
         </div>
       );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#fdfbf7] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl rounded-sm">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#0b2b20] hover:text-[#c5a059] transition-colors">
          <X size={28} />
        </button>
        
        {/* Progress Indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
           <div 
             className="h-full bg-[#c5a059] transition-all duration-500 ease-out" 
             style={{ width: `${(step / 16) * 100}%` }} 
           ></div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

// 10. Footer
const Footer = () => {
  return (
    <footer className="bg-[#0b2b20] text-[#e6e4dc] py-20 border-t border-[#c5a059]/50 relative">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6 w-16 h-16 border-[1.5px] border-[#c5a059] flex items-center justify-center bg-[#fdfbf7] overflow-hidden p-0 rounded-full">
                <img src="logo.jpg" onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML = '<span class="text-[#0b2b20] font-serif font-bold text-3xl">B</span>'}} alt="Footer Logo" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif text-3xl text-[#fdfbf7] tracking-widest mb-4">BRADEN BRACCIO</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] mb-8 font-bold">Real Estate Agent</p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/youragentbraden" target="_blank" rel="noopener noreferrer" className="text-[#c5a059] hover:text-white transition-colors transform hover:scale-110">
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-[#c5a059] hover:text-white transition-colors transform hover:scale-110"><Mail size={24} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Brokerage Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#c5a059] text-xs uppercase tracking-[0.2em] font-bold mb-6">Brokerage</h4>
            {/* Removed white box/padding so logo fills out space */}
            <div className="mb-6">
               <img src="Untitled design (28).png" onError={(e) => e.target.style.display='none'} alt="Your Castle Real Estate" className="h-16 w-auto object-contain filter invert" />
            </div>
            <div className="space-y-2 text-[#e6e4dc]/80 font-light">
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

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('buyer');
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  useEffect(() => {
    document.title = "Braden Braccio | Real Estate Agent";
  }, []);

  const handleNavigate = (targetId, tab = null) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    if (tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="bg-[#fdfbf7] text-[#1c1c1c] font-sans selection:bg-[#c5a059] selection:text-[#0b2b20]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }

        /* ANIMATIONS */
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } 100% { transform: translateY(0px) rotate(0deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.05; transform: scale(1); } 50% { opacity: 0.1; transform: scale(1.1); } }
        @keyframes grain { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-5%, -10%); } 20% { transform: translate(-15%, 5%); } 30% { transform: translate(7%, -25%); } 40% { transform: translate(-5%, 25%); } 50% { transform: translate(-15%, 10%); } 60% { transform: translate(15%, 0%); } 70% { transform: translate(0%, 15%); } 80% { transform: translate(3%, 35%); } 90% { transform: translate(-10%, 10%); } }
        @keyframes aurora-1 { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes aurora-2 { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(-30px, 30px) scale(1.1); } 66% { transform: translate(40px, -40px) scale(0.95); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes float-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fade-in-delayed { 0% { opacity: 0; } 100% { opacity: 1; } }

        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-grain { animation: grain 8s steps(10) infinite; }
        .animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; }
        .animate-float-subtle { animation: float-subtle 6s ease-in-out infinite; }
        .animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out forwards; }
      `}</style>

      <Navbar onNavigate={handleNavigate} onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} />
      <Hero />
      <BioSection />
      <ProcessSection activeTab={activeTab} />
      <ImpactSection />
      <Testimonials />
      <Contact onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} />
      <Footer />
      
      <QuestionnaireModal isOpen={isQuestionnaireOpen} onClose={() => setIsQuestionnaireOpen(false)} />
    </div>
  );
};

export default App;