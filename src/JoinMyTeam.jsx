import React from 'react';
import { ArrowRight, Award, Users, TrendingUp, Compass } from 'lucide-react';

/**
 * JoinMyTeam — recruiting section for The Aston Group.
 * General, welcoming description. No commission specifics,
 * no agent-tier segmentation.
 */
const JoinMyTeam = ({ onOpenQuestionnaire }) => {
  const pillars = [
    {
      icon: Compass,
      title: 'Team-Led Development',
      body: "In-house training, structured 1:1 coaching, and a real development plan. We don't hand you a license and a wish of good luck. We invest in you, learn what you want from this career, and design the path that leads there.",
    },
    {
      icon: TrendingUp,
      title: 'Built to Grow',
      body: "A boutique team designed for sustained production, not burnout. Predictable systems, weekly accountability, and the freedom to focus on what actually moves your business forward.",
    },
    {
      icon: Users,
      title: 'Leads Built In',
      body: "You won't be cold-prospecting your way into a career here unless you want to. Online lead partnerships through Realtor.com and Zillow Premier are routed fairly through our shift system — and you'll learn the full lifecycle.",
    },
    {
      icon: Award,
      title: 'Top Producer Trip',
      body: "Each year we host a fully paid retreat for our top-producing agents — a real trip, not a sales rally. Cabo, Grand Cayman, Costa Rica. The work is the reward. The trip is the receipt.",
    },
  ];

  const training = [
    'Cold approach · Cold calling · Vector 7 mastery',
    'FSBO outreach · Expired listings · Scripts & cadence',
    'CRM mastery · Buyer & seller consultations',
    'Negotiation · Contract craft · Client experience',
  ];

  return (
    <section id="join" className="py-24 md:py-32 bg-[#fafaf8] text-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#a8854c]"></div>

      <div className="max-w-[1300px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="block text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-medium text-[#0a0a0a]/70 mb-5">
            The Aston Group · At Your Castle Real Estate
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#0a0a0a] font-light tracking-tight leading-[1.05]">
            <span className="italic">Join</span> My Team.
          </h2>
          <p className="font-serif italic text-lg md:text-2xl text-[#0a0a0a]/75 max-w-3xl mx-auto mt-8 leading-relaxed">
            A boutique team, built on training and trust — for agents who treat this as a craft.
          </p>
        </div>

        {/* Vision statement */}
        <div className="max-w-3xl mx-auto mb-20 md:mb-28 border-l-2 border-[#a8854c] pl-8 md:pl-10">
          <span className="block text-[10px] tracking-[0.32em] uppercase font-medium text-[#a8854c] mb-4">
            The Vision
          </span>
          <p className="font-serif text-xl md:text-2xl text-[#0a0a0a]/85 leading-[1.45]">
            A high-touch, training-driven boutique team where every agent has the support, systems, and mentorship to do their best work. We're redefining excellence in Colorado real estate — and we're hiring with intention.
          </p>
        </div>

        {/* Four pillars */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <span className="block text-[10px] tracking-[0.32em] uppercase font-medium text-[#a8854c] mb-4">What You Get</span>
            <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight">
              <span className="italic">A Different</span> Kind of Team.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-[#0a0a0a]/15 pt-8">
                <Icon size={26} strokeWidth={1.25} className="text-[#a8854c] mb-5" />
                <h4 className="font-serif text-2xl md:text-3xl font-light italic mb-4">{title}</h4>
                <p className="text-[#0a0a0a]/75 leading-relaxed text-[15px] md:text-base">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Training delivered */}
        <div className="bg-[#0a0a0a] text-[#fafaf8] p-10 md:p-16 mb-20 md:mb-28 relative">
          <span className="block text-[10px] tracking-[0.32em] uppercase font-medium text-[#a8854c] mb-4">
            Training Delivered
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light italic tracking-tight mb-8 leading-[1.1]">
            Two live group classes a month.<br />
            <span className="not-italic font-normal text-[#fafaf8]/85">Recorded for the library, always.</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            {training.map((t, i) => (
              <div key={i} className="flex items-start gap-4 border-t border-[#fafaf8]/15 pt-4">
                <span className="font-display text-xs text-[#a8854c] tracking-[0.3em] mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[#fafaf8]/85 leading-relaxed font-serif italic text-lg md:text-xl">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder quote */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
          <div className="w-12 h-px bg-[#a8854c] mx-auto mb-8"></div>
          <p className="font-serif italic text-2xl md:text-4xl text-[#0a0a0a]/90 leading-[1.25]">
            "Discipline equals freedom. The systems in this team are how we earn ours."
          </p>
          <p className="font-display text-[11px] tracking-[0.32em] uppercase text-[#a8854c] mt-6">
            Braden Braccio · Founder
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <span className="block text-[10px] tracking-[0.32em] uppercase font-medium text-[#a8854c] mb-4">
            Begin the Conversation
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            <span className="italic">Let's Build</span> Together.
          </h3>
          <p className="font-serif italic text-lg md:text-xl text-[#0a0a0a]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            If anything in here landed — even one paragraph — let's have a conversation. No pitch, no pressure. Just two people in real estate seeing if the fit is real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => onOpenQuestionnaire && onOpenQuestionnaire()}
              className="inline-flex items-center gap-3 bg-[#0a0a0a] text-[#fafaf8] px-9 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#a8854c] transition-colors group"
            >
              Apply to Join
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:720-885-1613"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a] hover:text-[#a8854c] transition-colors border-b border-[#0a0a0a]/40 hover:border-[#a8854c] pb-1"
            >
              Call · 720-885-1613
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinMyTeam;
