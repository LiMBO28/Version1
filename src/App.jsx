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

// --- "Gilded Stardust" Component (Gold & White Mix) ---
const GildedStardust = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(40)].map((_, i) => {
        const isGold = i % 2 === 0;
        return (
          <div
            key={i}
            className={`absolute rounded-full animate-float mix-blend-screen ${isGold ? 'bg-[#EAB308] opacity-70' : 'bg-white opacity-50'}`}
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 15 + 15 + 's',
              animationDelay: Math.random() * 5 + 's',
              boxShadow: isGold ? '0 0 8px #EAB308' : '0 0 8px rgba(255,255,255,0.6)'
            }}
          ></div>
        );
      })}
    </div>
  );
};

// --- "Tech-Luxury" Background Component ---
const ModernBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#020403]">
    {/* 1. The Architectural Grid */}
    <div className="absolute inset-0 opacity-20" 
         style={{ 
           backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)', 
           backgroundSize: '60px 60px' 
         }}>
    </div>

    {/* 2. The "Aurora" Glows - Slightly warmer/brighter green to mix with gold */}
    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#005c3e] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#003829] rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-float-slow"></div>
    
    {/* 3. Subtle Vignette */}
    <div className="absolute inset-0 bg-radial-gradient-fade pointer-events-none"></div>
  </div>
);

// --- Estate Gate Transition (Dark Version + White Hints) ---
const EstateGateDivider = ({ flip = false }) => (
  <div className={`w-full h-16 md:h-24 relative z-20 ${flip ? 'transform rotate-180 -mt-1' : '-mb-1'}`}>
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d drop-shadow-2xl">
      {/* Background Match */}
      <path d="M0 80H1440V0C1440 0 1320 30 1180 30H260C120 30 0 0 0 0V80Z" fill="#050A07"/>
      
      {/* Glowing Gold Trim */}
      <path d="M0 5C0 5 120 35 260 35H1180C1320 35 1440 5 1440 5" stroke="#EAB308" strokeWidth="1.5" strokeOpacity="0.9" fill="none" className="drop-shadow-gold"/>
      
      {/* White Accent Line for Detail */}
      <path d="M100 5C100 5 200 25 280 25H1160C1240 25 1340 5 1340 5" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
      
      {!flip && (
        <rect x="718" y="35" width="4" height="45" fill="#EAB308" opacity="0.6" className="drop-shadow-gold" />
      )}
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
      icon: <BookOpen size={32} />,
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
      icon: <Home size={32} />,
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
      icon: <Users size={32} />,
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
      icon: <Key size={32} />,
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
    <div className="min-h-screen bg-[#020403] text-[#E5E5E5] font-sans selection:bg-[#EAB308] selection:text-[#020403]">
      <style>
        {`
          /* IMPORT: Serif for Headings (Old Money), Sans-Serif for Body (Modern Tech) */
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Manrope:wght@300;400;600&display=swap');
          
          :root {
            --black-bg: #020403;
            --glass-bg: rgba(10, 20, 15, 0.6);
            --gold-primary: #EAB308; /* Brighter Gold */
            --green-glow: #005c3e;
          }

          .font-heading { font-family: 'Cinzel', serif; }
          .font-body { font-family: 'Manrope', sans-serif; }
          
          /* Modern Gradient Text: Gold to Tech Green + White Hint */
          .text-gradient-modern {
            background: linear-gradient(135deg, #EAB308 0%, #FEF08A 30%, #EAB308 60%, #4ADE80 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 300% auto;
            animation: shine 8s linear infinite;
          }

          @keyframes shine {
            to { background-position: 200% center; }
          }
          
          /* Animations for the Aurora Blobs */
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 10s ease-in-out infinite;
          }

          @keyframes float-slow {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-30px, -30px); }
          }
          
          .animate-float-slow {
            animation: float-slow 15s ease-in-out infinite;
          }

          /* Glassmorphism Card (The Tech Look) */
          .card-glass {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(234, 179, 8, 0.2);
            border-top: 1px solid rgba(255, 255, 255, 0.15); /* White top highlight */
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Glow Hover Effect */
          .card-glass:hover {
            transform: translateY(-8px);
            border-color: rgba(234, 179, 8, 0.6);
            box-shadow: 0 0 30px rgba(0, 92, 62, 0.5); /* Green Glow */
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
            width: 60px;
            background: linear-gradient(90deg, transparent, #EAB308, transparent);
            opacity: 0.8;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #020403; }
          ::-webkit-scrollbar-thumb { background: #EAB308; border-radius: 4px; }
          
          /* Drop Shadows for Text */
          .drop-shadow-gold { filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.4)); }
          .bg-radial-gradient-fade {
             background: radial-gradient(circle, transparent 0%, #020403 90%);
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#020403]/90 backdrop-blur-xl border-b border-[#EAB308]/20 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-[fadeIn_1s_ease-out]">
            <img 
              src="/logo.jpg" 
              alt="Braden Braccio"
              className="h-10 w-10 md:h-12 md:w-12 object-contain border border-[#EAB308]/50 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            />
            <span className="font-heading tracking-[0.2em] text-xs md:text-sm text-white font-semibold drop-shadow-md">Braden Braccio</span>
          </div>
          
          <div className="hidden md:flex space-x-12">
            {['Strategy', 'Listing', 'Marketing', 'Closing'].map((item, idx) => (
              <a 
                key={item} 
                href={`#phase-${idx + 1}`}
                className="font-body text-sm tracking-widest text-white/70 hover:text-[#EAB308] uppercase transition-all duration-300 hover:drop-shadow-gold"
                style={{ animation: `fadeIn 1s ease-out ${idx * 0.1}s backwards` }}
              >
                {item}
              </a>
            ))}
          </div>

          <a href="#contact" className="animate-[fadeIn_1s_ease-out_0.5s_backwards] border border-[#EAB308]/50 bg-[#EAB308]/10 backdrop-blur-md text-[#EAB308] px-6 py-2 md:px-8 font-heading text-[10px] tracking-[0.2em] hover:bg-[#EAB308] hover:text-[#020403] transition-all duration-300 font-bold rounded-sm shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            Inquire
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ModernBackground />
        <GildedStardust />
        
        <FadeIn>
          {/* The Hero Card - Glassmorphism */}
          <div className="relative z-20 p-8 md:p-28 border border-[#EAB308]/20 max-w-6xl mx-4 card-glass rounded-2xl mt-20 md:mt-0 overflow-hidden">
            
            {/* Top Light Beam Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#EAB308] to-transparent opacity-60"></div>

            <div className="text-center space-y-8 md:space-y-12 relative z-30">
              <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-8">
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#EAB308]"></div>
                <span className="font-heading text-[10px] md:text-xs tracking-[0.4em] text-[#EAB308] uppercase font-bold drop-shadow-gold">Est. 2024</span>
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#EAB308]"></div>
              </div>

              <h1 className="font-heading text-4xl md:text-7xl lg:text-9xl leading-none tracking-tight">
                <span className="block text-white text-xl md:text-4xl mb-4 md:mb-6 font-normal tracking-[0.3em] uppercase opacity-90 drop-shadow-lg">The Art of</span>
                <span className="text-gradient-modern font-bold drop-shadow-2xl">Real Estate</span>
              </h1>

              <p className="font-body text-lg md:text-3xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed px-4 tracking-wide">
                "Exclusive Client Compendium"
              </p>

              <div className="pt-8 md:pt-12 flex justify-center">
                 <div className="p-3 md:p-4 border border-[#EAB308]/40 rounded-full animate-bounce hover:bg-[#EAB308]/20 transition-colors cursor-pointer backdrop-blur-sm group shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <ArrowRight className="text-[#EAB308] group-hover:text-white transition-colors" size={24} />
                 </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </header>

      {/* Gate Transition (Dark) */}
      <EstateGateDivider />

      {/* Introduction - Dark Section */}
      <section className="py-20 md:py-32 px-6 bg-[#050A07] relative z-10">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <FadeIn>
            <div className="mb-8 md:mb-12 flex justify-center">
              <div className="p-5 md:p-6 rounded-full border border-[#EAB308]/30 bg-[#EAB308]/5 shadow-[0_0_30px_rgba(234,179,8,0.15)]">
                <Award className="text-[#EAB308]" strokeWidth={1.5} size={48} />
              </div>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl text-white mb-8 md:mb-14 tracking-wide font-medium drop-shadow-md">A Standard of Excellence</h2>
            
            {/* Updated Body Font for Readability */}
            <p className="font-body text-xl md:text-3xl text-[#E5E5E5]/90 leading-loose mb-12 md:mb-20 max-w-4xl mx-auto font-light">
              Closing one chapter and composing the next is a delicate art. It demands uncommon expertise, unflinching discretion, and a singular devotion to protecting and advancing your family’s legacy.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-2xl md:text-4xl text-[#EAB308] font-bold border-b-2 border-[#EAB308]/50 pb-2 px-10 shadow-[0_10px_20px_-10px_rgba(234,179,8,0.3)]">Braden Braccio</span>
              <span className="font-heading text-xs md:text-sm tracking-[0.3em] text-white/60 uppercase font-bold mt-2">Your Castle Real Estate</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gate Transition (Flipped) */}
      <EstateGateDivider flip={true} />

      {/* Phases Grid - With "Aurora" Background */}
      <div className="relative py-20 md:py-32 px-4 overflow-hidden">
        <ModernBackground />
        <GildedStardust />
        
        <div className="container mx-auto max-w-7xl relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            
            {phases.map((phase, index) => (
              <FadeIn key={phase.id} delay={index * 200}>
                {/* Modern Glass Card */}
                <div className="card-glass rounded-xl p-8 md:p-16 h-full group relative overflow-hidden">
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#EAB308] rounded-full opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500"></div>

                  {/* Phase Number Watermark */}
                  <div className="absolute top-4 right-6 text-[80px] md:text-[120px] font-heading font-bold text-white/5 pointer-events-none select-none leading-none">
                    {phase.id}
                  </div>

                  <div className="text-center mb-10 md:mb-14 relative z-10">
                    <div className="flex justify-center mb-8 md:mb-10 text-[#EAB308]">
                      <div className="p-5 md:p-6 border border-[#EAB308]/20 rounded-full bg-white/5 group-hover:border-[#EAB308] group-hover:scale-110 transition-all duration-500 shadow-lg text-[#EAB308]">
                        {phase.icon}
                      </div>
                    </div>
                    <div className="font-heading text-xs tracking-[0.4em] text-[#EAB308] mb-4 uppercase font-bold">Phase 0{phase.id}</div>
                    <h3 className="font-heading text-3xl md:text-4xl text-white mb-4 group-hover:text-[#EAB308] transition-colors">{phase.title.split(': ')[1]}</h3>
                    <p className="font-body text-lg md:text-xl text-white/70 font-light">{phase.subtitle}</p>
                  </div>

                  <div className="space-y-8 md:space-y-10 relative z-10">
                    {phase.content.map((block, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-4 mb-4">
                          <Diamond size={10} className="text-[#EAB308] fill-[#EAB308]" />
                          <h4 className="font-heading text-lg md:text-xl text-white tracking-wide font-bold">{block.header}</h4>
                          <div className="h-[1px] flex-grow bg-[#EAB308]/20"></div>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                          {block.points.map((point, pIdx) => (
                            <li key={pIdx} className="font-body text-white/90 text-base md:text-lg flex items-start gap-3 group-hover:text-white transition-colors duration-500 font-light">
                              <span className="text-[#EAB308] mt-1.5 text-[8px]">●</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>
              </FadeIn>
            ))}

          </div>
        </div>
      </div>

      <EstateGateDivider />

      {/* Agent Profile */}
      <section className="py-20 md:py-32 bg-[#050A07] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#EAB308 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <GildedStardust />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              
              {/* Image Frame - Modern Glass Style */}
              <div className="w-full md:w-5/12">
                <div className="relative p-2 card-glass rounded-lg">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#020403]">
                    {!imageError ? (
                      <img 
                        src="/agent.jpg" 
                        alt="Braden Braccio" 
                        className="w-full h-full object-cover filter contrast-110 brightness-90 hover:scale-105 transition-transform duration-1000"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#020403]">
                         <div className="text-[#EAB308] font-heading text-6xl mb-4">B</div>
                         <p className="text-white/40 font-heading tracking-widest text-xs">Image Unavailable</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-transparent opacity-40 pointer-events-none"></div>
                  </div>
                  
                  {/* Logo Watermark */}
                  <div className="absolute -bottom-6 right-0 md:-bottom-8 md:-right-8 z-30 drop-shadow-2xl">
                      <img 
                        src="/logo.jpg" 
                        alt="Braden Braccio"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-full border-2 border-[#EAB308] shadow-lg"
                      />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-7/12 text-center md:text-left">
                <h2 className="font-heading text-3xl md:text-5xl text-white mb-8 md:mb-12 drop-shadow-gold">
                  The Gentleman's Approach
                </h2>
                
                <div className="space-y-6 md:space-y-10 font-body text-lg md:text-2xl text-white/80 leading-loose text-justify font-light">
                  <p>
                    Braden Braccio believes that buying or selling a home, especially in Colorado’s finest neighborhoods, should feel calm, confident, and deeply personal.
                  </p>
                  <p>
                    As a former U.S. Veteran, he brings the same discipline, integrity, and quiet strength to real estate that he once brought to service. His promise is simple: every detail will be handled with care, every conversation kept in complete confidence, and your best interests placed above all else.
                  </p>
                  <p>
                    To Braden, luxury is not just about the property. It is about the peace of mind that comes from working with someone who truly listens, anticipates your needs, and guides you with patience and precision from the first meeting to the closing table and beyond.
                  </p>
                  <div className="relative py-6 md:py-8 pl-6 md:pl-8 border-l-2 border-[#EAB308] bg-gradient-to-r from-[#EAB308]/10 to-transparent rounded-r-lg">
                    <p className="text-[#EAB308] font-semibold italic text-xl md:text-2xl relative z-10">
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
      <footer id="contact" className="relative pt-32 pb-16 px-6 border-t border-[#EAB308]/20 overflow-hidden">
        <ModernBackground />
        <FadeIn>
          <div className="container mx-auto max-w-3xl text-center relative z-20">
            <div className="diamond-divider">
              <Diamond size={20} className="text-[#EAB308] fill-[#EAB308]" />
            </div>
            
            <h2 className="font-heading text-3xl md:text-5xl text-white mb-8">Begin The Conversation</h2>
            <p className="font-body text-xl md:text-2xl text-white/70 mb-16 italic font-light">Personal. Professional. Always in your corner.</p>

            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-20">
              <a href="mailto:bradenbraccio@yourcastle.com" className="group flex items-center justify-center gap-4 border border-[#EAB308]/50 px-12 py-6 hover:bg-[#EAB308] transition-all duration-300 card-glass w-full md:w-auto rounded-lg">
                <Mail size={20} className="text-[#EAB308] group-hover:text-[#020403]" />
                <span className="font-heading text-sm tracking-widest text-white group-hover:text-[#020403] transition-colors font-bold">EMAIL</span>
              </a>
              <a href="tel:720-885-1613" className="group flex items-center justify-center gap-4 border border-[#EAB308]/50 px-12 py-6 hover:bg-[#EAB308] transition-all duration-300 card-glass w-full md:w-auto rounded-lg">
                <Phone size={20} className="text-[#EAB308] group-hover:text-[#020403]" />
                <span className="font-heading text-sm tracking-widest text-white group-hover:text-[#020403] transition-colors font-bold">CALL</span>
              </a>
            </div>

            <div className="text-white/40 font-heading text-[10px] tracking-[0.3em]">
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