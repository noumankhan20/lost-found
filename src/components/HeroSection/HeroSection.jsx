"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Users, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from "next/navigation";

const stats = [
  { icon: Users,  label: "Active Users",    value: "50K+" },
  { icon: Search, label: "Items Reunited",  value: "12K+" },
  { icon: Clock,  label: "Avg. Resolution", value: "2.5 days" },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-red-900 overflow-hidden flex items-center">

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Vignette — darkens edges so centre pops */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-24 text-center">

        <div
          className="transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/50 text-[11px] font-semibold tracking-[0.18em] uppercase mb-8">
            <Zap size={10} strokeWidth={2.5} className="text-red-400" />
            AI-Powered Lost & Found Platform
          </div>

          {/* Headline */}
          <h1 className="font-black text-white leading-[1.0] tracking-[-0.04em] mb-4"
            style={{ fontSize: 'clamp(56px, 10vw, 96px)' }}
          >
            FindIT
          </h1>

          <p className="font-light text-white/40 tracking-[-0.01em] mb-8"
            style={{ fontSize: 'clamp(18px, 3vw, 28px)' }}
          >
            Your AI-Powered Lost &amp; Found Management System
          </p>

          {/* Sub-copy */}
          <p className="text-white/55 leading-relaxed max-w-xl mx-auto mb-12"
            style={{ fontSize: 'clamp(15px, 1.8vw, 17px)' }}
          >
            Connect with your community to find lost items faster than ever.
            Post, search, and reunite with what matters most.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-20">
            <button
              onClick={() => router.push('/report-lost')}
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[15px] font-semibold overflow-hidden shadow-[0_4px_24px_rgba(220,38,38,0.35)] hover:shadow-[0_8px_32px_rgba(220,38,38,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Search size={17} strokeWidth={2.5} />
              Report Lost Item
              <ArrowRight size={14} className="opacity-50 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            <button
              onClick={() => router.push('/BrowseItem')}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white/65 hover:text-white hover:border-white/25 hover:bg-white/[0.09] text-[15px] font-medium hover:-translate-y-0.5 transition-all duration-200"
            >
              <MapPin size={17} strokeWidth={2} />
              Browse Found Items
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.16] group transition-all duration-200 cursor-default"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.7s ease ${i * 120 + 300}ms, transform 0.7s ease ${i * 120 + 300}ms, background 0.2s, border-color 0.2s`,
                }}
              >
                <Icon className="w-7 h-7 text-red-400/60 group-hover:text-red-400 mx-auto mb-3.5 transition-colors duration-200" strokeWidth={1.5} />
                <div className="text-[32px] font-extrabold text-white tracking-tight leading-none mb-1.5">{value}</div>
                <div className="text-white/40 text-[12.5px] font-medium tracking-wide">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}