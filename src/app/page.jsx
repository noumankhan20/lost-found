'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import HeroSection from '@/components/HeroSection/HeroSection';
import FeaturesSection from '@/components/Feature/Feature';
import TestimonialsSection from '@/components/Testimonals/Testimonals';
import FAQSection from '@/components/Faq/Faq';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Must wait for mount before reading theme (avoids SSR hydration mismatch)
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // resolvedTheme is 'dark' or 'light' — single source of truth
  const darkMode = mounted ? resolvedTheme === 'dark' : false;

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-[var(--bg)] text-[var(--fg)]">

      {/* ── Hero ── */}
      <section id="hero">
        <HeroSection darkMode={darkMode} scrolled={scrolled} />
      </section>

      {/* ── Features ── */}
      <section id="features">
        <FeaturesSection darkMode={darkMode} />
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials">
        <TestimonialsSection darkMode={darkMode} />
      </section>

      {/* ── FAQ ── */}
      <section id="faq">
        <FAQSection darkMode={darkMode} />
      </section>

    </div>
  );
}