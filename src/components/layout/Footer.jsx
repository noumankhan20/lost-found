import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          border-top: 1px solid rgba(0,0,0,0.07);
          padding: 64px 0 0;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          padding-bottom: 56px;
        }
        @media (min-width: 640px) {
          .footer-top { grid-template-columns: 2fr 1fr 1fr; gap: 32px; }
        }
        .footer-brand-row {
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
        }
        .footer-brand-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 12px rgba(220,38,38,0.25);
        }
        .footer-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 20px;
          color: #0f0f0f; letter-spacing: -0.02em;
        }
        .footer-tagline {
          font-size: 14px; font-weight: 300;
          color: rgba(15,15,15,0.45);
          line-height: 1.7; max-width: 280px;
          margin: 0 0 28px;
        }
        .footer-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px;
          background: rgba(220,38,38,0.06);
          border: 1px solid rgba(220,38,38,0.15);
          border-radius: 100px;
          font-size: 11px; font-weight: 600;
          color: rgba(180,28,28,0.8);
          letter-spacing: 0.08em;
        }
        .footer-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #dc2626;
          box-shadow: 0 0 5px rgba(220,38,38,0.5);
        }
        .footer-col-title {
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700;
          color: rgba(15,15,15,0.3);
          letter-spacing: 0.14em; text-transform: uppercase;
          margin: 0 0 20px;
        }
        .footer-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 12px;
        }
        .footer-link {
          font-size: 14px; font-weight: 400;
          color: rgba(15,15,15,0.45);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 4px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #0f0f0f; }
        .footer-link svg { opacity: 0; transform: translateX(-3px); transition: opacity 0.2s, transform 0.2s; }
        .footer-link:hover svg { opacity: 1; transform: translateX(0); }
        .footer-bottom {
          border-top: 1px solid rgba(0,0,0,0.06);
          padding: 20px 0;
          display: flex; flex-direction: column;
          gap: 10px; align-items: center; justify-content: space-between;
        }
        @media (min-width: 640px) { .footer-bottom { flex-direction: row; } }
        .footer-copy {
          font-size: 13px; color: rgba(15,15,15,0.3);
        }
        .footer-copy a {
          color: rgba(15,15,15,0.45);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-copy a:hover { color: #0f0f0f; }
        .footer-legal { display: flex; gap: 20px; }
        .footer-legal a {
          font-size: 12px; color: rgba(15,15,15,0.28);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-legal a:hover { color: rgba(15,15,15,0.65); }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-row">
                <div className="footer-brand-icon">
                  <Search size={15} strokeWidth={2.5} color="#fff" />
                </div>
                <span className="footer-brand-name">FindIT</span>
              </div>
              <p className="footer-tagline">
                Reuniting people with their lost items through the power of community and technology.
              </p>
              <div className="footer-badge">
                <span className="footer-badge-dot" />
                Free to use
              </div>
            </div>

            <div>
              <p className="footer-col-title">Navigate</p>
              <ul className="footer-links">
                <li><Link href="/" className="footer-link">Home <ArrowUpRight size={12} /></Link></li>
                <li><Link href="/about-us" className="footer-link">About <ArrowUpRight size={12} /></Link></li>
                <li><Link href="/browse-items" className="footer-link">Browse Items <ArrowUpRight size={12} /></Link></li>
                <li><Link href="/report-lost" className="footer-link">Report Lost <ArrowUpRight size={12} /></Link></li>
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Support</p>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Help Center <ArrowUpRight size={12} /></a></li>
                <li><a href="#" className="footer-link">Report Issue <ArrowUpRight size={12} /></a></li>
                <li><Link href="/sign-up" className="footer-link">Sign Up <ArrowUpRight size={12} /></Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">© 2026 <a href="/">FindIT</a>. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}