import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, MapPin, ArrowRight, CheckCircle, Award, Home, BookOpen, Users, Key, Star, Diamond } from 'lucide-react';

// --- Animation Hook ---
// This helper makes items fade in when they appear on screen
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

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
    <div className="min-h-screen bg-[#020408] text-[#E5E5E5] font-serif selection:bg-[#D4AF37] selection:text-[#020408]">
      {/* Advanced CSS for Luxury Effects & Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');
          
          :root {
            --gold-primary: #D4AF37;
            --navy-deep: #0B1221;
            --navy-subtle: #0F172A;
            --black-rich: #020408;
          }

          .font-heading { font-family: 'Cinzel', serif; }
          .font-body { font-family: 'Cormorant Garamond', serif; }
          
          /* Subtle Navy Gradient Background */
          .bg-midnight {
            background: radial-gradient(circle at 50% 0%, #1e293b 0%, #020408 60%);
          }

          /* Gold Gradient Text - Slower, more elegant shine */
          .text-gradient-gold {
            background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 8s linear infinite;
          }

          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }

          /* Card Styles with Navy Tint */
          .card-navy {
            background-color: rgba(11, 18, 33, 0.6);
            backdrop-filter: blur(10px);
            transition: all 0.5s ease;
          }
          
          .card-navy:hover {
            background-color: rgba(15, 23, 42, 0.8);
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
          }

          /* Ornate Borders */
          .border-ornate {
            border: 1px solid rgba(212, 175, 55, 0.15);
            position: relative;
          }
          
          .border-ornate::before, .border-ornate::after {
            content: '';
            position: absolute;
            width: 0px;
            height: 0px;
            border: 1px solid #D4AF37;
            transition: all 0.6s ease;
            opacity: 0;
          }
          
          .border-ornate::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
          .border-ornate::after { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }

          .card-navy:hover .border-ornate::before, 
          .card-navy:hover .border-ornate::after {
            width: 100%;
            height: 100%;
            opacity: 1;
          }

          /* Luxury Photo Filter */
          .luxury-filter {
            filter: sepia(0.15) contrast(1.1) brightness(0.9) saturate(0.9);
            transition: filter 0.7s ease;
          }
          .luxury-filter:hover {
            filter: sepia(0) contrast(1.05) brightness(1) saturate(1);
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
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
            opacity: 0.5;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#020408]/95 border-b border-[#D4AF37]/20 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-[fadeIn_1s_ease-out]">
            <div className="h-10 w-10 border border-[#D4AF37] flex items-center justify-center bg-[#0B1221]">
              <span className="font-heading font-bold text-xl text-[#D4AF37]">B</span>
            </div>
            <span className="font-heading tracking-[0.2em] text-sm text-[#D4AF37]">Braden Braccio</span>
          </div>
          
          <div className="hidden md:flex space-x-12">
            {['Strategy', 'Listing', 'Marketing', 'Closing'].map((item, idx) => (
              <a 
                key={item} 
                href={`#phase-${idx + 1}`}
                className="font-heading text-[10px] tracking-[0.2em] text-[#E5E5E5]/70 hover:text-[#D4AF37] uppercase transition-colors relative group"
                style={{ animation: `fadeIn 1s ease-out ${idx * 0.1}s backwards` }}
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 -translate-x-1/2 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <a href="#contact" className="animate-[fadeIn_1s_ease-out_0.5s_backwards] border border-[#D4AF37]/50 px-6 py-2 font-heading text-[10px] tracking-[0.2em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#020408] transition-all duration-300 bg-[#0B1221]/50">
            Inquire
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-[pulse_4s_ease-in-out_infinite]"></div>
        
        {/* Center Frame */}
        <FadeIn>
          <div className="relative z-10 p-12 md:p-20 border border-[#D4AF37]/20 max-w-4xl mx-4 bg-[#020408]/40 backdrop-blur-sm">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]"></div>

            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#D4AF37] opacity-60"></div>
                <span className="font-heading text-xs tracking-[0.3em] text-[#D4AF37]">Est. 2024</span>
                <div className="h-[1px] w-12 bg-[#D4AF37] opacity-60"></div>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight">
                <span className="block text-[#E5E5E5] text-3xl md:text-4xl mb-4 font-normal tracking-wide">The Art of</span>
                <span className="text-gradient-gold font-semibold filter drop-shadow-lg">Selling Your Home</span>
              </h1>

              <p className="font-body text-xl md:text-2xl text-[#E5E5E5]/70 max-w-2xl mx-auto italic leading-relaxed">
                "A compendium of strategy, sophistication, and stewardship for the distinguished seller."
              </p>

              <div className="pt-8">
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto animate-bounce"></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </header>

      {/* Introduction */}
      <section className="py-32 px-6 bg-[#020408] relative border-t border-[#1e293b]">
        {/* Subtle Navy Glow in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#0B1221] blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="mb-8 flex justify-center">
              <Award className="text-[#D4AF37]" strokeWidth={1} size={48} />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-[#E5E5E5] mb-10 tracking-wide">A Standard of Excellence</h2>
            <p className="font-body text-2xl text-[#E5E5E5]/80 leading-loose mb-12">
              Selling a home is the closing of one chapter and the intricate beginning of another. It requires a steady hand, deep market wisdom, and an unwavering commitment to your legacy.
            </p>
            
            {/* Signature Area */}
            <div className="flex flex-col items-center gap-3">
              <span className="font-heading text-2xl text-[#D4AF37]">Braden Braccio</span>
              <span className="font-heading text-[10px] tracking-[0.2em] text-[#E5E5E5]/40 uppercase">Your Castle Real Estate</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Phases Grid */}
      <div className="bg-[#020408] py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {phases.map((phase, index) => (
              <FadeIn key={phase.id} delay={index * 200}>
                <div className="card-navy p-8 md:p-12 border-ornate relative h-full group">
                  
                  {/* Phase Header */}
                  <div className="text-center mb-12 relative z-10">
                    <div className="flex justify-center mb-6 text-[#D4AF37]">
                      <div className="p-4 border border-[#D4AF37]/20 rounded-full bg-[#020408] group-hover:border-[#D4AF37] transition-colors duration-500">
                        {phase.icon}
                      </div>
                    </div>
                    <div className="font-heading text-[10px] tracking-[0.3em] text-[#D4AF37] mb-3">Phase 0{phase.id}</div>
                    <h3 className="font-heading text-3xl text-[#E5E5E5] mb-3">{phase.title.split(': ')[1]}</h3>
                    <p className="font-body text-lg text-[#E5E5E5]/50 italic">{phase.subtitle}</p>
                  </div>

                  {/* Phase Content */}
                  <div className="space-y-8 relative z-10">
                    {phase.content.map((block, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-4 mb-4">
                          <Diamond size={8} className="text-[#D4AF37] fill-[#D4AF37] opacity-60" />
                          <h4 className="font-heading text-lg text-[#E5E5E5] tracking-wide">{block.header}</h4>
                          <div className="h-[1px] flex-grow bg-[#D4AF37]/10"></div>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                          {block.points.map((point, pIdx) => (
                            <li key={pIdx} className="font-body text-[#E5E5E5]/60 text-lg flex items-start gap-3 group-hover:text-[#E5E5E5]/90 transition-colors duration-500">
                              <span className="text-[#D4AF37] mt-2 text-[10px] opacity-60">•</span>
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

      {/* Agent Profile - Navy Theme */}
      <section className="py-32 bg-[#050914] border-t border-[#D4AF37]/10 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-16">
              
              {/* Image Frame */}
              <div className="w-full md:w-5/12">
                <div className="relative p-4 border border-[#D4AF37]/30 bg-[#020408]">
                  <div className="relative aspect-[3/4] bg-[#0B1221] overflow-hidden">
                    {!imageError ? (
                      <img 
                        src="/agent.jpg" 
                        alt="Braden Braccio" 
                        className="w-full h-full object-cover luxury-filter transform hover:scale-105 transition-transform duration-1000"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#0B1221]">
                         <div className="text-[#D4AF37] font-heading text-6xl mb-4">B</div>
                         <p className="text-[#E5E5E5]/40 font-heading tracking-widest text-xs">Image Unavailable</p>
                      </div>
                    )}
                    {/* Navy Gradient Overlay on bottom of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-20 pointer-events-none"></div>
                  </div>
                  
                  {/* Floating Box */}
                  <div className="absolute -bottom-6 -right-6 bg-[#0B1221] border border-[#D4AF37] p-8 shadow-2xl">
                      <div className="font-heading text-5xl text-[#D4AF37]">B</div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-7/12 text-center md:text-left">
                <h2 className="font-heading text-4xl md:text-5xl text-[#E5E5E5] mb-8">
                  The Gentleman's Approach
                </h2>
                
                <div className="space-y-6 font-body text-xl text-[#E5E5E5]/70 leading-loose text-justify">
                  <p>
                    Braden Braccio is more than a Real Estate Agent; he is a steward of property and wealth. Specializing in the Denver area's premier estates, his practice is founded on the principles of discipline and integrity honed during his service as a US Veteran.
                  </p>
                  <p>
                    He understands that true luxury is not just a price point, but an experience. An experience defined by discretion, precision, and an unwavering fiduciary commitment to his clients.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-16 border-t border-[#D4AF37]/10 pt-8">
                  <div>
                    <div className="font-heading text-2xl text-[#D4AF37] mb-2">Veteran</div>
                    <div className="font-body text-[#E5E5E5]/50 text-sm uppercase tracking-wider">Discipline & Honor</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl text-[#D4AF37] mb-2">Expert</div>
                    <div className="font-body text-[#E5E5E5]/50 text-sm uppercase tracking-wider">Denver Market</div>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#020408] pt-24 pb-12 px-6 border-t border-[#D4AF37]/20">
        <FadeIn>
          <div className="container mx-auto max-w-3xl text-center">
            <div className="diamond-divider">
              <Diamond size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
            </div>
            
            <h2 className="font-heading text-3xl md:text-5xl text-[#E5E5E5] mb-6">Begin The Conversation</h2>
            <p className="font-body text-xl text-[#E5E5E5]/60 mb-12">Discrete. Professional. Exceptional.</p>

            <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
              <a href="mailto:bradenbraccio@yourcastle.com" className="group flex items-center gap-3 border border-[#E5E5E5]/20 bg-[#0B1221] px-10 py-5 hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-1">
                <Mail size={18} className="text-[#D4AF37]" />
                <span className="font-heading text-sm tracking-widest text-[#E5E5E5] group-hover:text-[#D4AF37] transition-colors">EMAIL</span>
              </a>
              <a href="tel:720-885-1613" className="group flex items-center gap-3 border border-[#E5E5E5]/20 bg-[#0B1221] px-10 py-5 hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-1">
                <Phone size={18} className="text-[#D4AF37]" />
                <span className="font-heading text-sm tracking-widest text-[#E5E5E5] group-hover:text-[#D4AF37] transition-colors">CALL</span>
              </a>
            </div>

            <div className="text-[#E5E5E5]/30 font-heading text-[10px] tracking-[0.3em]">
              <p className="mb-2">LIC #: FA.100107526</p>
              <p>&copy; {new Date().getFullYear()} BRADEN BRACCIO. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
};

export default App;