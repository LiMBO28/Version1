import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, MapPin, ArrowRight, CheckCircle, Award, Home, BookOpen, Users, Key, Star, Diamond } from 'lucide-react';

// --- Animation Hook ---
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) setIsVisible(true);
    }, options);
    
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

// --- Animated Section Component ---
const FadeIn = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- "Starlight" Dust Component (Gold & White Mix) ---
const StarlightDust = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(30)].map((_, i) => {
        const isGold = i % 2 === 0;
        return (
          <div
            key={i}
            className={`absolute rounded-full animate-float mix-blend-screen ${isGold ? 'bg-[#D4AF37] opacity-60' : 'bg-white opacity-40'}`}
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 15 + 15 + 's',
              animationDelay: Math.random() * 5 + 's',
              boxShadow: isGold ? '0 0 5px #D4AF37' : '0 0 5px rgba(255,255,255,0.5)'
            }}
          ></div>
        );
      })}
    </div>
  );
};

// --- "Living" Background Component ---
const LivingBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#012619]">
    {/* Rotating Conic Gradient for "Velvet Light" effect */}
    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-[spin_25s_linear_infinite] opacity-20"
         style={{ 
           background: 'conic-gradient(from 0deg at 50% 50%, #012619 0deg, #024A32 100deg, #012619 180deg, #003322 280deg, #012619 360deg)',
           filter: 'blur(80px)'
         }}>
    </div>
    {/* Static Pattern Overlay */}
    <div className="absolute inset-0 deco-pattern opacity-30 mix-blend-overlay"></div>
  </div>
);

// --- Ornate "Grand Gateway" Transition ---
const OrnateDivider = ({ flip = false }) => (
  <div className={`w-full h-24 relative z-20 ${flip ? 'transform rotate-180 -mt-1' : '-mb-1'}`}>
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d drop-shadow-xl">
      {/* The Main Shape */}
      <path d="M0 80H1440V0C1440 0 1100 80 720 80C340 80 0 0 0 0V80Z" fill="#FFFFFF"/>
      
      {/* Intricate Gold Inlays */}
      <path d="M0 5C0 5 340 85 720 85C1100 85 1440 5 1440 5" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.8" fill="none"/>
      <path d="M0 15C0 15 340 95 720 95C1100 95 1440 15 1440 15" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
      
      {/* Central Decorative Jewel */}
      <path d="M720 80L710 65H730L720 80Z" fill="#D4AF37" />
    </svg>
  </div>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phases = [
    {
      id: 1,
      title: "Phase I: The Foundation",
      subtitle: "Strategy & Insight",
      icon: <BookOpen size={28} />,
      content: [
        {
          header: "Defining Success",
          points: [
            "Clarifying motivation & legacy goals.",
            "Establishing ideal transition timelines.",
            "Identifying your next chapter.",
            "Prioritizing family imperatives."
          ]
        },
        {
          header: "Market Intelligence",
          points: [
            "Macro vs. Micro dynamics.",
            "Supply & Demand balancing.",
            "Market forecasting & trends.",
            "Analysis of comparable estates."
          ]
        },
        {
          header: "The Strategic Plan",
          points: [
            "Architectural feature highlighting.",
            "Key differentiator analysis.",
            "Target buyer profiling.",
            "Bespoke attraction strategy."
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Phase II: The Curation",
      subtitle: "Preparation & Listing",
      icon: <Home size={28} />,
      content: [
        {
          header: "Listing Refinement",
          points: [
            "Comprehensive documentation.",
            "Property enhancement consult.",
            "Signature staging strategy.",
            "Architectural photography."
          ]
        },
        {
          header: "Preparing for Debut",
          points: [
            "Premium launch materials.",
            "Print & publication ads.",
            "Curated digital plan.",
            "Social media positioning."
          ]
        },
        {
          header: "Community Outreach",
          points: [
            "'Real Advantage' network.",
            "Exclusive open house events.",
            "Direct mail campaigns.",
            "Community engagement."
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Phase III: The Negotiation",
      subtitle: "Marketing & Offers",
      icon: <Users size={28} />,
      content: [
        {
          header: "The Grand Introduction",
          points: [
            "Launching the marketing plan.",
            "Vetting potential buyers.",
            "Private showings & tours.",
            "Monitoring interest & feedback."
          ]
        },
        {
          header: "Stewardship",
          points: [
            "Weekly executive reports.",
            "Proactive market adaptation.",
            "Strategic updates."
          ]
        },
        {
          header: "The Art of Agreement",
          points: [
            "Offer collection & analysis.",
            "Strategic counter-offers.",
            "Optimizing price & terms.",
            "Managing multiple offers."
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Phase IV: The Culmination",
      subtitle: "Closing & Transition",
      icon: <Key size={28} />,
      content: [
        {
          header: "The Closing Process",
          points: [
            "Executing final contracts.",
            "Completing disclosures.",
            "Managing contingencies.",
            "Fiduciary fulfillment."
          ]
        },
        {
          header: "The Transition",
          points: [
            "Transition assistance.",
            "Final documentation review.",
            "Closing day celebration."
          ]
        },
        {
          header: "An Enduring Partnership",
          points: [
            "Continued relationship.",
            "Investment resources.",
            "Referral-based practice.",
            "Client appreciation."
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#012619] text-[#E5E5E5] font-serif selection:bg-[#D4AF37] selection:text-[#012619]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
          
          :root {
            --green-deep: #012619;
            --green-rich: #024A32;
            --gold-primary: #D4AF37;
          }

          .font-heading { font-family: 'Cinzel', serif; }
          .font-body { font-family: 'Cormorant Garamond', serif; }
          
          /* Animated Gold Gradient Text */
          .text-gradient-gold {
            background: linear-gradient(to right, #BF953F, #FBF5B7, #AA771C, #FBF5B7, #BF953F);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 8s linear infinite;
          }

          @keyframes shine {
            to { background-position: 200% center; }
          }
          
          /* Floating Animation for Gold Dust */
          @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
          }
          
          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          /* Art Deco Background Pattern */
          .deco-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.08'%3E%3Cpath d='M40 80c0-22.09 17.91-40 40-40v40H40zm0 0c0-22.09-17.91-40-40-40v40h40zm0 0V40c22.09 0 40 17.91 40 40H40zm0 0V40c-22.09 0-40 17.91-40 40h40zM40 0c0 22.09 17.91 40 40 40V0H40zm0 0c0 22.09-17.91 40-40 40V0h40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }

          /* Enhanced White Card */
          .card-white {
            background-color: #FFFFFF;
            color: #012619;
            border: 1px solid rgba(1, 38, 25, 0.1);
            position: relative;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 4px; 
          }

          /* Intricate Inner Border */
          .card-inner-border {
            border: 1px solid rgba(212, 175, 55, 0.6); 
            height: 100%;
            width: 100%;
            position: relative;
            z-index: 10;
          }
          
          /* Decorative Corners */
          .card-inner-border::before, .card-inner-border::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border: 2px solid #D4AF37;
            transition: all 0.5s ease;
          }
          /* Top-Left L-shape */
          .card-inner-border::before { 
            top: -1px; left: -1px; 
            border-right: 0; border-bottom: 0; 
          }
          /* Bottom-Right L-shape */
          .card-inner-border::after { 
            bottom: -1px; right: -1px; 
            border-left: 0; border-top: 0; 
          }

          /* Hover Effects */
          .card-white:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px -12px rgba(1, 38, 25, 0.4);
          }
          
          .card-white:hover .card-inner-border {
            border-color: #012619;
            background-color: rgba(212, 175, 55, 0.05);
          }
          
          .card-white:hover .card-inner-border::before,
          .card-white:hover .card-inner-border::after {
             border-color: #012619;
             width: 100%;
             height: 100%;
             opacity: 0.1;
          }

          /* Luxury Photo Filter */
          .luxury-filter {
            filter: contrast(1.1) brightness(0.95) saturate(0.9);
            transition: filter 0.7s ease;
          }
          .luxury-filter:hover {
            filter: contrast(1.05) brightness(1.05) saturate(1);
          }

          /* Diamond Divider */
          .diamond-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
          }
          .diamond-divider::before, .diamond-divider::after {
            content: '';
            height: 1px;
            width: 100px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
            opacity: 0.8;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#012619]/95 shadow-xl py-3 border-b border-[#D4AF37]/40' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-[fadeIn_1s_ease-out]">
            {/* Logo Image */}
            <img 
              src="/logo.jpg" 
              alt="Braden Braccio"
              className="h-12 w-12 object-contain border-2 border-[#D4AF37] rounded-sm shadow-lg"
            />
            <span className="font-heading tracking-[0.25em] text-sm text-white font-semibold">Braden Braccio</span>
          </div>
          
          <div className="hidden md:flex space-x-12">
            {['Strategy', 'Listing', 'Marketing', 'Closing'].map((item, idx) => (
              <a 
                key={item} 
                href={`#phase-${idx + 1}`}
                className="font-heading text-[10px] tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors relative group"
                style={{ animation: `fadeIn 1s ease-out ${idx * 0.1}s backwards` }}
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 -translate-x-1/2 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <a href="#contact" className="animate-[fadeIn_1s_ease-out_0.5s_backwards] border border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-2 font-heading text-[10px] tracking-[0.2em] hover:bg-white hover:text-[#012619] transition-all duration-300 font-bold">
            Inquire
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <LivingBackground />
        <StarlightDust />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#012619] z-10"></div>
        
        <FadeIn>
          {/* The "Pearl & Emerald" Hero Card */}
          <div className="relative z-20 p-14 md:p-28 border border-[#D4AF37]/40 max-w-6xl mx-4 bg-[#012619]/40 backdrop-blur-md shadow-2xl">
            
            {/* Clever White Addition: Subtle White Inner Glow Border */}
            <div className="absolute inset-2 border border-white/10 pointer-events-none"></div>

            {/* Ornate Corner Designs - Gold */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-[#D4AF37]"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-[#D4AF37]"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-[#D4AF37]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-[#D4AF37]"></div>

            <div className="text-center space-y-12 relative z-30">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="h-[1px] w-20 bg-white/40"></div>
                <span className="font-heading text-xs tracking-[0.4em] text-[#D4AF37] uppercase font-bold">Est. 2024</span>
                <div className="h-[1px] w-20 bg-white/40"></div>
              </div>

              {/* Clever White Addition: White "The Art of" for sharp contrast */}
              <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl leading-none tracking-tight">
                <span className="block text-white text-2xl md:text-4xl mb-6 font-normal tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">The Art of</span>
                <span className="text-gradient-gold font-bold drop-shadow-2xl">Real Estate</span>
              </h1>

              <p className="font-body text-2xl md:text-4xl text-white/90 max-w-3xl mx-auto italic leading-relaxed">
                "Exclusive Client Compendium"
              </p>

              <div className="pt-12 flex justify-center">
                 <div className="p-4 border-2 rounded-full border-white/20 animate-bounce hover:border-[#D4AF37] transition-colors cursor-pointer bg-[#012619]/50 group">
                    <ArrowRight className="text-white group-hover:text-[#D4AF37] transition-colors" size={24} />
                 </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </header>

      {/* Ornate Transition */}
      <OrnateDivider />

      {/* Introduction */}
      <section className="py-32 px-6 bg-white text-[#012619] relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="mb-12 flex justify-center">
              <div className="p-6 rounded-full border-2 border-[#012619]/10 relative">
                <div className="absolute inset-2 border border-[#012619]/10 rounded-full"></div>
                <Award className="text-[#012619]" strokeWidth={1} size={64} />
              </div>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl text-[#012619] mb-14 tracking-wide font-medium">A Standard of Excellence</h2>
            
            <p className="font-body text-3xl md:text-4xl text-[#012619]/80 leading-loose mb-20 max-w-4xl mx-auto">
              Closing one chapter and composing the next is a delicate art. It demands uncommon expertise, unflinching discretion, and a singular devotion to protecting and advancing your family’s legacy.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-4xl text-[#D4AF37] font-bold border-b-4 border-[#D4AF37] pb-2 px-10">Braden Braccio</span>
              <span className="font-heading text-sm tracking-[0.3em] text-[#012619]/60 uppercase font-bold mt-2">Your Castle Real Estate</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Ornate Transition (Flipped) */}
      <OrnateDivider flip={true} />

      {/* Phases Grid */}
      <div className="relative py-32 px-4 overflow-hidden">
        <LivingBackground />
        <StarlightDust />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {phases.map((phase, index) => (
              <FadeIn key={phase.id} delay={index * 200}>
                {/* Enhanced Card Structure */}
                <div className="card-white rounded-sm shadow-2xl bg-[#FAFAFA]">
                  <div className="card-inner-border p-10 md:p-14 relative group">
                    
                    {/* Phase Number Watermark */}
                    <div className="absolute top-2 right-4 text-[140px] font-heading font-bold text-[#012619]/5 pointer-events-none select-none leading-none">
                      {phase.id}
                    </div>

                    <div className="text-center mb-12 relative z-10">
                      <div className="flex justify-center mb-10 text-[#D4AF37]">
                        <div className="p-6 border-2 border-[#012619]/5 rounded-full bg-white group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all duration-500 shadow-sm text-[#012619]">
                          {phase.icon}
                        </div>
                      </div>
                      <div className="font-heading text-xs tracking-[0.4em] text-[#D4AF37] mb-4 uppercase font-bold">Phase 0{phase.id}</div>
                      <h3 className="font-heading text-4xl text-[#012619] mb-4 group-hover:text-[#D4AF37] transition-colors">{phase.title.split(': ')[1]}</h3>
                      <p className="font-body text-xl text-[#012619]/70 italic">{phase.subtitle}</p>
                    </div>

                    <div className="space-y-10 relative z-10">
                      {phase.content.map((block, idx) => (
                        <div key={idx}>
                          <div className="flex items-center gap-4 mb-4">
                            <Diamond size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
                            <h4 className="font-heading text-xl text-[#012619] tracking-wide font-bold">{block.header}</h4>
                            <div className="h-[2px] flex-grow bg-[#012619]/10"></div>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            {block.points.map((point, pIdx) => (
                              <li key={pIdx} className="font-body text-[#012619]/80 text-lg flex items-start gap-3 group-hover:text-[#012619] transition-colors duration-500">
                                <span className="text-[#D4AF37] mt-2 text-[10px] opacity-100">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </FadeIn>
            ))}

          </div>
        </div>
      </div>

      <OrnateDivider />

      {/* Agent Profile */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-24">
              
              {/* Image Frame - Thicker, more pronounced */}
              <div className="w-full md:w-5/12">
                <div className="relative p-3 border-2 border-[#012619]/10 bg-white shadow-2xl">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#012619]">
                    {!imageError ? (
                      <img 
                        src="/agent.jpg" 
                        alt="Braden Braccio" 
                        className="w-full h-full object-cover luxury-filter hover:scale-105 transition-transform duration-1000"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#012619]">
                         <div className="text-[#D4AF37] font-heading text-6xl mb-4">B</div>
                         <p className="text-white/40 font-heading tracking-widest text-xs">Image Unavailable</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#012619] via-transparent to-transparent opacity-30 pointer-events-none"></div>
                  </div>
                  
                  {/* Offset Gold Box */}
                  <div className="absolute -bottom-8 -right-8 bg-[#012619] p-10 shadow-2xl border-2 border-[#D4AF37] z-20">
                      <div className="font-heading text-6xl text-[#D4AF37]">B</div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-7/12 text-center md:text-left">
                <h2 className="font-heading text-4xl md:text-6xl text-[#012619] mb-12">
                  The Gentleman's Approach
                </h2>
                
                <div className="space-y-10 font-body text-xl text-[#012619]/80 leading-loose text-justify">
                  <p>
                    Braden Braccio believes that buying or selling a home, especially in Colorado’s finest neighborhoods, should feel calm, confident, and deeply personal.
                  </p>
                  <p>
                    As a former U.S. Veteran, he brings the same discipline, integrity, and quiet strength to real estate that he once brought to service. His promise is simple: every detail will be handled with care, every conversation kept in complete confidence, and your best interests placed above all else.
                  </p>
                  <p>
                    To Braden, luxury is not just about the property. It is about the peace of mind that comes from working with someone who truly listens, anticipates your needs, and guides you with patience and precision from the first meeting to the closing table and beyond.
                  </p>
                  <div className="relative py-8 pl-8 border-l-4 border-[#D4AF37] bg-[#D4AF37]/5">
                    <p className="text-[#012619] font-semibold italic text-2xl relative z-10">
                      "You deserve an experience that feels as exceptional as the home itself. That is the Gentleman’s Approach."
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative pt-32 pb-16 px-6 border-t border-[#D4AF37]/30 overflow-hidden">
        <LivingBackground />
        <FadeIn>
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <div className="diamond-divider">
              <Diamond size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
            </div>
            
            <h2 className="font-heading text-3xl md:text-5xl text-[#E5E5E5] mb-8">Begin The Conversation</h2>
            <p className="font-body text-2xl text-[#E5E5E5]/60 mb-16 italic">Personal. Professional. Always in your corner.</p>

            <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
              <a href="mailto:bradenbraccio@yourcastle.com" className="group flex items-center gap-4 border-2 border-[#D4AF37]/50 px-12 py-6 hover:bg-[#D4AF37] transition-all duration-300">
                <Mail size={20} className="text-[#D4AF37] group-hover:text-[#012619]" />
                <span className="font-heading text-sm tracking-widest text-[#E5E5E5] group-hover:text-[#012619] transition-colors font-bold">EMAIL</span>
              </a>
              <a href="tel:720-885-1613" className="group flex items-center gap-4 border-2 border-[#D4AF37]/50 px-12 py-6 hover:bg-[#D4AF37] transition-all duration-300">
                <Phone size={20} className="text-[#D4AF37] group-hover:text-[#012619]" />
                <span className="font-heading text-sm tracking-widest text-[#E5E5E5] group-hover:text-[#012619] transition-colors font-bold">CALL</span>
              </a>
            </div>

            <div className="text-[#E5E5E5]/30 font-heading text-[10px] tracking-[0.3em]">
              <p className="mb-3">LIC #: FA.100107526</p>
              <p>&copy; {new Date().getFullYear()} BRADEN BRACCIO. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
};

export default App;