'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-root.top {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
        }
        .nav-root.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .nav-brand-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 12px rgba(220,38,38,0.3);
        }
        .nav-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 22px;
          color: #0f0f0f; letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex; align-items: center; gap: 2px;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: rgba(15,15,15,0.5);
          text-decoration: none;
          padding: 8px 14px; border-radius: 8px;
          letter-spacing: 0.01em;
          transition: color 0.2s, background 0.2s;
        }
        .nav-link:hover { color: #0f0f0f; background: rgba(0,0,0,0.05); }
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #fff; background: #dc2626;
          padding: 8px 20px; border-radius: 8px;
          text-decoration: none; margin-left: 8px;
          letter-spacing: 0.01em;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .nav-cta:hover {
          background: #b91c1c;
          box-shadow: 0 4px 14px rgba(220,38,38,0.3);
          transform: translateY(-1px);
        }
        .hamburger {
          display: none; background: none; border: none;
          cursor: pointer; padding: 8px; border-radius: 8px;
          color: rgba(15,15,15,0.6);
          transition: background 0.2s, color 0.2s;
        }
        .hamburger:hover { background: rgba(0,0,0,0.06); color: #0f0f0f; }
        .mobile-menu {
          display: none;
          background: rgba(255,255,255,0.98);
          border-top: 1px solid rgba(0,0,0,0.06);
          padding: 12px 24px 20px;
          animation: slideDown 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .mobile-menu.open { display: block; }
        .mobile-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; font-weight: 500;
          color: rgba(15,15,15,0.55);
          text-decoration: none;
          padding: 13px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: color 0.2s;
        }
        .mobile-link:last-of-type { border-bottom: none; }
        .mobile-link:hover { color: #0f0f0f; }
        .mobile-cta {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          color: #fff; background: #dc2626;
          text-decoration: none;
          padding: 13px 20px; border-radius: 10px;
          text-align: center; margin-top: 16px;
          transition: background 0.2s;
        }
        .mobile-cta:hover { background: #b91c1c; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; align-items: center; justify-content: center; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <div className="nav-brand-icon">
              <Search size={16} strokeWidth={2.5} color="#fff" />
            </div>
            <span className="nav-brand-name">FindIT</span>
          </Link>

          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about-us" className="nav-link">About</Link>
            <Link href="/browse-items" className="nav-link">Browse</Link>
            <Link href="/sign-up" className="nav-cta">Sign Up</Link>
          </div>

          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about-us" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/browse-items" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Browse Items</Link>
          <Link href="/sign-up" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>Sign Up Free</Link>
        </div>
      </nav>
    </>
  );
}