'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
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

        /* ✅ Use CSS variables for background — responds to .dark on <html> */
        .nav-root.top {
          background: color-mix(in srgb, var(--bg) 75%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
        }
        .nav-root.scrolled {
          background: color-mix(in srgb, var(--bg) 92%, transparent);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid var(--border);
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
          color: var(--fg); /* ✅ was #0f0f0f */
          letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex; align-items: center; gap: 2px;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--fg-muted); /* ✅ was rgba(15,15,15,0.5) */
          text-decoration: none;
          padding: 8px 14px; border-radius: 8px;
          letter-spacing: 0.01em;
          transition: color 0.2s, background 0.2s;
        }
        .nav-link:hover {
          color: var(--fg); /* ✅ was #0f0f0f */
          background: var(--border); /* ✅ was rgba(0,0,0,0.05) */
        }
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #fff; background: var(--accent);
          padding: 8px 20px; border-radius: 8px;
          text-decoration: none; margin-left: 8px;
          letter-spacing: 0.01em;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .nav-cta:hover {
          background: var(--accent-hover);
          box-shadow: 0 4px 14px rgba(220,38,38,0.3);
          transform: translateY(-1px);
        }

        /* ✅ Theme toggle button */
        .theme-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          background: none;
          border: 1px solid var(--border);
          border-radius: 8px; cursor: pointer;
          color: var(--fg-muted);
          margin: 0 4px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .theme-toggle:hover {
          background: var(--accent-bg);
          border-color: var(--accent-border);
          color: var(--accent);
        }

        .hamburger {
          display: none; background: none; border: none;
          cursor: pointer; padding: 8px; border-radius: 8px;
          color: var(--fg-muted); /* ✅ was rgba(15,15,15,0.6) */
          transition: background 0.2s, color 0.2s;
        }
        .hamburger:hover {
          background: var(--border); /* ✅ was rgba(0,0,0,0.06) */
          color: var(--fg);
        }

        /* ✅ Mobile menu */
        .mobile-menu {
          display: none;
          background: var(--bg); /* ✅ was rgba(255,255,255,0.98) */
          border-top: 1px solid var(--border); /* ✅ was rgba(0,0,0,0.06) */
          padding: 12px 24px 20px;
          animation: slideDown 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .mobile-menu.open { display: block; }
        .mobile-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; font-weight: 500;
          color: var(--fg-muted); /* ✅ was rgba(15,15,15,0.55) */
          text-decoration: none;
          padding: 13px 0;
          border-bottom: 1px solid var(--border); /* ✅ was rgba(0,0,0,0.06) */
          transition: color 0.2s;
        }
        .mobile-link:last-of-type { border-bottom: none; }
        .mobile-link:hover { color: var(--fg); }
        .mobile-cta {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          color: #fff; background: var(--accent);
          text-decoration: none;
          padding: 13px 20px; border-radius: 10px;
          text-align: center; margin-top: 16px;
          transition: background 0.2s;
        }
        .mobile-cta:hover { background: var(--accent-hover); }

        /* Mobile theme toggle */
        .mobile-theme-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid var(--border);
          color: var(--fg-muted);
          font-size: 16px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-theme-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          background: var(--accent-bg);
          border: 1px solid var(--accent-border);
          border-radius: 8px; cursor: pointer;
          color: var(--accent);
        }

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

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

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

          {mounted && (
            <div className="mobile-theme-row">
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mobile-theme-btn"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          )}

          <Link href="/sign-up" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>Sign Up Free</Link>
        </div>
      </nav>
    </>
  );
}