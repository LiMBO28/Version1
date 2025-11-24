import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, MapPin, ArrowRight, CheckCircle, Award, Home, BookOpen, Users, Key, Star, Diamond } from 'lucide-react';

// --- Custom Hooks ---

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

// --- Animated Components ---

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

// --- "Cinematic" Background Components ---

const CinematicGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03]" 
       style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
  </div>
);

const LivingAurora = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Cream Base */}
      <div className="absolute inset-0 bg-[#F9F7F2]"></div>
      
      {/* Moving Aurora Blobs - Emerald & Gold */}
      <div className="absolute top-[-20%] left-[-20%] w-[90vw] h-[90vw] bg-[#012619] rounded-full mix-blend-multiply filter blur-[120px] opacity-5 animate-blob"></div>
      <div className="absolute top-[10%] right-[-30%] w-[80vw] h-[80vw] bg-[#C5A059] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-30%] left-[10%] w-[70vw] h-[70vw] bg-[#012619] rounded-full mix-blend-multiply filter blur-[150px] opacity-5 animate-blob animation-delay-4000"></div>
      
      {/* Grid Overlay - Dark Green Lines */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(#012619 1px, transparent 1px), linear-gradient(90deg, #012619 1px, transparent 1px)', 
             backgroundSize: '80px 80px' 
           }}>
      </div>
    </div>
  );
};

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-40 animate-float ${i % 2 === 0 ? 'bg-[#C5A059]' : 'bg-[#012619]'}`}
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDuration: Math.random() * 20 + 10 + 's',
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}
    </div>
  );
};

// --- 3D Page Tilt Wrapper ---
const Page3DWrapper = ({ children }) => {
  return (
    <div className="relative z-10">
      {children}
    </div>
  );
};

// --- Components ---

const EstateGateDivider = ({ flip = false }) => (
  <div className={`w-full h-16 md:h-24 relative z-20 ${flip ? 'transform rotate-180 -mt-1' : '-mb-1'}`}>
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d drop-shadow-sm">
      <path d="M0 80H1440V0C1440 0 1320 30 1180 30H260C120 30 0 0 0 0V80Z" fill="#F9F7F2"/>
      <path d="M0 5C0 5 120 35 260 35H1180C1320 35 1440 5 1440 5" stroke="#C5A059" strokeWidth="1.5" strokeOpacity="0.8" fill="none"/>
      <path d="M100 5C100 5 200 25 280 25H1160C1240 25 1340 5 1340 5" stroke="#012619" strokeWidth="0.5" strokeOpacity="0.2" fill="none"/>
      {!flip && (
        <rect x="718" y="35" width="4" height="45" fill="#C5A059" opacity="0.6" />
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
    <div className="min-h-screen bg-[#F9F7F2] text-[#012619] font-sans selection:bg-[#C5A059] selection:text-[#F9F7F2] overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;600&display=swap');
          
          :root {
            --cream-bg: #F9F7F2;
            --green-deep: #012619;
            --gold-accent: #C5A059;
          }

          .font-title { font-family: 'Cinzel Decorative', serif; }
          .font-heading { font-family: 'Playfair Display', serif; }
          .font-body { font-family: 'Manrope', sans-serif; }
          
          /* Metallic Gold Text Texture - Darker for Light Background */
          .text-metallic-gold {
            background: linear-gradient(
              to bottom,
              #D4AF37 0%,
              #B38728 25%,
              #FCD34D 50%,
              #B38728 75%,
              #926F1B 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            filter: drop-shadow(0 1px 0px rgba(0,0,0,0.1));
          }

          /* Animation Keyframes */
          @keyframes shine { to { background-position: 200% center; } }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 20s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
          }
          .animate-float { animation: float 20s ease-in-out infinite; }

          /* Card Style - Light Paper */
          .card-paper {
            background-color: #FFFFFF;
            border: 1px solid rgba(1, 38, 25, 0.1);
            box-shadow: 0 10px 30px -10px rgba(1, 38, 25, 0.05);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-paper:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -10px rgba(197, 160, 89, 0.2);
            border-color: #C5A059;
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
            background: linear-gradient(90deg, transparent, #C5A059, transparent);
            opacity: 0.6;
          }

          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #F9F7F2; }
          ::-webkit-scrollbar-thumb { background: #012619; border-radius: 4px; }
        `}
      </style>

      <LivingAurora />
      <FloatingParticles />
      <CinematicGrain />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#F9F7F2]/95 shadow-md py-3 border-b border-[#012619]/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-[fadeIn_1s_ease-out]">
            <img 
              src="/logo.jpg" 
              alt="Braden Braccio"
              className="h-10 w-10 md:h-12 md:w-12 object-contain border border-[#C5A059]/50 rounded-lg shadow-sm"
            />
            <span className={`font-heading tracking-[0.2em] text-xs md:text-sm font-semibold transition-colors ${scrolled ? 'text-[#012619]' : 'text-[#012619]'}`}>Braden Braccio</span>
          </div>
          
          <div className="hidden md:flex space-x-12">
            {['Strategy', 'Listing', 'Marketing', 'Closing'].map((item, idx) => (
              <a 
                key={item} 
                href={`#phase-${idx + 1}`}
                className={`font-body text-sm tracking-widest uppercase transition-all duration-300 hover:text-[#C5A059] font-medium ${scrolled ? 'text-[#012619]/80' : 'text-[#012619]/80'}`}
                style={{ animation: `fadeIn 1s ease-out ${idx * 0.1}s backwards` }}
              >
                {item}
              </a>
            ))}
          </div>

          <a href="#contact" className="animate-[fadeIn_1s_ease-out_0.5s_backwards] border border-[#012619] text-[#012619] px-6 py-2 md:px-8 font-heading text-[10px] tracking-[0.2em] hover:bg-[#012619] hover:text-[#F9F7F2] transition-all duration-300 font-bold rounded-sm">
            Inquire
          </a>
        </div>
      </nav>

      {/* 3D Page Wrapper */}
      <Page3DWrapper>
        
        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center justify-center">
          <FadeIn>
            {/* The Hero Card - Cream Paper Style */}
            <div className="relative z-20 p-8 md:p-28 border border-[#012619]/10 max-w-6xl mx-4 bg-white shadow-xl mt-20 md:mt-0 overflow-hidden">
              
              {/* Architectural Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.03]" 
                   style={{ 
                     backgroundImage: 'linear-gradient(#012619 1px, transparent 1px), linear-gradient(90deg, #012619 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                   }}>
              </div>

              {/* Decorative Corners - Green */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 border-t-[3px] border-l-[3px] border-[#012619]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t-[3px] border-r-[3px] border-[#012619]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b-[3px] border-l-[3px] border-[#012619]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 border-b-[3px] border-r-[3px] border-[#012619]"></div>

              <div className="text-center space-y-8 md:space-y-12 relative z-30">
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-8">
                  <div className="h-[1px] w-12 md:w-24 bg-[#C5A059]"></div>
                  <span className="font-heading text-[10px] md:text-xs tracking-[0.4em] text-[#C5A059] uppercase font-bold">Est. 2025</span>
                  <div className="h-[1px] w-12 md:w-24 bg-[#C5A059]"></div>
                </div>

                <h1 className="flex flex-col items-center leading-none tracking-tight relative">
                  <span className="font-heading text-[#012619] text-2xl md:text-5xl mb-6 font-normal tracking-[0.2em] uppercase italic opacity-90">The Art of</span>
                  <span className="font-title text-5xl md:text-8xl lg:text-9xl text-metallic-gold drop-shadow-sm relative z-10">Real Estate</span>
                </h1>

                <p className="font-body text-lg md:text-3xl text-[#012619]/70 max-w-3xl mx-auto font-light leading-relaxed px-4 tracking-wide">
                  "Exclusive Client Compendium"
                </p>

                <div className="pt-8 md:pt-12 flex justify-center">
                   <div className="p-3 md:p-4 border border-[#012619]/20 rounded-full animate-bounce hover:bg-[#012619] group transition-colors cursor-pointer">
                      <ArrowRight className="text-[#012619] group-hover:text-[#F9F7F2] transition-colors" size={24} />
                   </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </header>

        <EstateGateDivider />

        {/* Introduction */}
        <section className="py-20 md:py-32 px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <div className="mb-8 md:mb-12 flex justify-center">
                <div className="p-5 md:p-6 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10">
                  <Award className="text-[#C5A059]" strokeWidth={1.5} size={48} />
                </div>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl text-[#012619] mb-8 md:mb-14 tracking-wide font-medium">A Standard of Excellence</h2>
              
              <p className="font-body text-xl md:text-3xl text-[#012619]/80 leading-loose mb-12 md:mb-20 max-w-4xl mx-auto font-light">
                Closing one chapter and composing the next is a delicate art. It demands uncommon expertise, unflinching discretion, and a singular devotion to protecting and advancing your family’s legacy.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <span className="font-heading text-2xl md:text-4xl text-[#C5A059] font-bold border-b-2 border-[#C5A059]/60 pb-2 px-10">Braden Braccio</span>
                <span className="font-heading text-xs md:text-sm tracking-[0.3em] text-[#012619]/60 uppercase font-bold mt-2">Your Castle Real Estate</span>
              </div>
            </FadeIn>
          </div>
        </section>

        <EstateGateDivider flip={true} />

        {/* Phases Grid */}
        <div className="relative py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-7xl relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
              
              {phases.map((phase, index) => (
                <FadeIn key={phase.id} delay={index * 200}>
                  <div className="card-paper rounded-xl p-8 md:p-16 h-full group relative overflow-hidden">
                    
                    {/* Phase Number Watermark */}
                    <div className="absolute top-4 right-6 text-[80px] md:text-[120px] font-heading font-bold text-[#012619]/5 pointer-events-none select-none leading-none">
                      {phase.id}
                    </div>

                    <div className="text-center mb-10 md:mb-14 relative z-10">
                      <div className="flex justify-center mb-8 md:mb-10 text-[#C5A059]">
                        <div className="p-5 md:p-6 border border-[#012619]/10 rounded-full bg-[#F9F7F2] group-hover:border-[#C5A059] group-hover:scale-110 transition-all duration-500 shadow-sm text-[#012619]">
                          {phase.icon}
                        </div>
                      </div>
                      <div className="font-heading text-xs tracking-[0.4em] text-[#C5A059] mb-4 uppercase font-bold">Phase 0{phase.id}</div>
                      <h3 className="font-heading text-3xl md:text-4xl text-[#012619] mb-4 group-hover:text-[#C5A059] transition-colors">{phase.title.split(': ')[1]}</h3>
                      <p className="font-body text-lg md:text-xl text-[#012619]/70 font-light">{phase.subtitle}</p>
                    </div>

                    <div className="space-y-8 md:space-y-10 relative z-10">
                      {phase.content.map((block, idx) => (
                        <div key={idx}>
                          <div className="flex items-center gap-4 mb-4">
                            <Diamond size={10} className="text-[#C5A059] fill-[#C5A059]" />
                            <h4 className="font-heading text-lg md:text-xl text-[#012619] tracking-wide font-bold">{block.header}</h4>
                            <div className="h-[1px] flex-grow bg-[#012619]/10"></div>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            {block.points.map((point, pIdx) => (
                              <li key={pIdx} className="font-body text-[#012619]/80 text-base md:text-lg flex items-start gap-3 group-hover:text-[#012619] transition-colors duration-500 font-light">
                                <span className="text-[#C5A059] mt-1.5 text-[8px]">●</span>
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
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <FadeIn>
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                
                <div className="w-full md:w-5/12">
                  <div className="relative p-3 bg-white shadow-xl border border-[#012619]/10 transition-transform duration-700 hover:scale-105">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#012619]">
                      {!imageError ? (
                        <img 
                          src="/agent.jpg" 
                          alt="Braden Braccio" 
                          className="w-full h-full object-cover filter contrast-105 brightness-100"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#012619]">
                           <div className="text-[#C5A059] font-heading text-6xl mb-4">B</div>
                           <p className="text-[#F9F7F2]/60 font-heading tracking-widest text-xs">Image Unavailable</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Logo Watermark - Full Frame Bottom Right */}
                    <div className="absolute -bottom-6 right-0 md:-bottom-8 md:-right-8 z-30 drop-shadow-2xl">
                        <img 
                          src="/logo.jpg" 
                          alt="Braden Braccio"
                          className="w-24 h-24 md:w-32 md:h-32 object-contain"
                        />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-7/12 text-center md:text-left">
                  <h2 className="font-heading text-3xl md:text-5xl text-[#012619] mb-8 md:mb-12">
                    The Gentleman's Approach
                  </h2>
                  
                  <div className="space-y-6 md:space-y-10 font-body text-lg md:text-2xl text-[#012619]/80 leading-loose text-justify font-light">
                    <p>
                      Braden Braccio believes that buying or selling a home, especially in Colorado’s finest neighborhoods, should feel calm, confident, and deeply personal.
                    </p>
                    <p>
                      As a former U.S. Veteran, he brings the same discipline, integrity, and quiet strength to real estate that he once brought to service. His promise is simple: every detail will be handled with care, every conversation kept in complete confidence, and your best interests placed above all else.
                    </p>
                    <p>
                      To Braden, luxury is not just about the property. It is about the peace of mind that comes from working with someone who truly listens, anticipates your needs, and guides you with patience and precision from the first meeting to the closing table and beyond.
                    </p>
                    <div className="relative py-6 md:py-8 pl-6 md:pl-8 border-l-2 border-[#C5A059] bg-[#C5A059]/10 rounded-r-lg">
                      <p className="text-[#012619] font-semibold italic text-xl md:text-2xl relative z-10 font-heading">
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
        <footer id="contact" className="relative pt-32 pb-16 px-6 bg-[#012619] border-t border-[#C5A059]/30">
          <FadeIn>
            <div className="container mx-auto max-w-3xl text-center relative z-20">
              <div className="diamond-divider">
                <Diamond size={20} className="text-[#C5A059] fill-[#C5A059]" />
              </div>
              
              <h2 className="font-heading text-3xl md:text-5xl text-[#F9F7F2] mb-8">Begin The Conversation</h2>
              <p className="font-body text-xl md:text-2xl text-[#F9F7F2]/70 mb-16 italic font-light">Personal. Professional. Always in your corner.</p>

              <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-20">
                <a href="mailto:bradenbraccio@yourcastle.com" className="group flex items-center justify-center gap-4 border border-[#C5A059]/50 px-12 py-6 hover:bg-[#C5A059] transition-all duration-300 bg-[#012619] w-full md:w-auto rounded-lg">
                  <Mail size={20} className="text-[#C5A059] group-hover:text-[#012619]" />
                  <span className="font-heading text-sm tracking-widest text-[#F9F7F2] group-hover:text-[#012619] transition-colors font-bold">EMAIL</span>
                </a>
                <a href="tel:720-885-1613" className="group flex items-center justify-center gap-4 border border-[#C5A059]/50 px-12 py-6 hover:bg-[#C5A059] transition-all duration-300 bg-[#012619] w-full md:w-auto rounded-lg">
                  <Phone size={20} className="text-[#C5A059] group-hover:text-[#012619]" />
                  <span className="font-heading text-sm tracking-widest text-[#F9F7F2] group-hover:text-[#012619] transition-colors font-bold">CALL</span>
                </a>
              </div>

              <div className="text-[#F9F7F2]/40 font-heading text-[10px] tracking-[0.3em]">
                <p className="mb-3">LIC #: FA.100107526</p>
                <p>&copy; {new Date().getFullYear()} BRADEN BRACCIO. ALL RIGHTS RESERVED.</p>
              </div>
            </div>
          </FadeIn>
        </footer>

      </Page3DWrapper>
    </div>
  );
};

export default App;