'use client';
import { Search, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Search,
    number: '01',
    title: 'Report & Search',
    description: 'Easily report lost or found items with photos, descriptions, and precise location data — searchable by the whole community.',
    accent: '#dc2626',
    bg: 'rgba(220,38,38,0.06)',
    border: 'rgba(220,38,38,0.12)',
  },
  {
    icon: Users,
    number: '02',
    title: 'Community Match',
    description: 'Our smart algorithms cross-reference reports and surface the best matches, powered by the people around you.',
    accent: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.12)',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Safe Reunions',
    description: 'Verified identities, safe meeting-point recommendations, and private messaging ensure every reunion is secure.',
    accent: '#059669',
    bg: 'rgba(5,150,105,0.06)',
    border: 'rgba(5,150,105,0.12)',
  },
];

export default function FeaturesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        .feat-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9f9f9;
          padding: 100px 0 80px;
          position: relative;
        }
        .feat-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .feat-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 72px;
        }
        @media (min-width: 768px) {
          .feat-header { grid-template-columns: 1fr 1fr; align-items: end; margin-bottom: 80px; }
        }
        .feat-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #dc2626; margin-bottom: 16px;
        }
        .feat-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 800; color: #0f0f0f;
          line-height: 1.05; letter-spacing: -0.04em; margin: 0;
        }
        .feat-desc {
          font-size: 16px; font-weight: 300;
          color: rgba(15,15,15,0.5);
          line-height: 1.75; max-width: 360px;
          margin: 0; align-self: end;
        }
        .feat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) { .feat-grid { grid-template-columns: repeat(3, 1fr); } }

        .feat-card {
          position: relative;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 36px 30px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .feat-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          border-color: rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }
        .feat-num {
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700;
          color: rgba(15,15,15,0.18);
          letter-spacing: 0.14em; margin-bottom: 28px;
        }
        .feat-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.2s;
        }
        .feat-card:hover .feat-icon-wrap { transform: scale(1.05); }
        .feat-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 700;
          color: #0f0f0f; letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .feat-text {
          font-size: 14.5px; font-weight: 300;
          color: rgba(15,15,15,0.5);
          line-height: 1.75; margin: 0;
        }
        .feat-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin: 80px auto 0;
          max-width: 1052px;
        }
      `}</style>

      <section className="feat-root">
        <div className="feat-inner">
          <div className="feat-header">
            <div>
              <p className="feat-eyebrow">How It Works</p>
              <h2 className="feat-h2">Built for speed.<br />Designed for trust.</h2>
            </div>
            <p className="feat-desc">
              We connect people who have lost items with those who have found them — fast and safely. Every step is thoughtfully designed.
            </p>
          </div>

          <div className="feat-grid">
            {features.map(({ icon: Icon, number, title, description, accent, bg, border }, i) => (
              <div className="feat-card" key={i}>
                <p className="feat-num">{number}</p>
                <div
                  className="feat-icon-wrap"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Icon size={22} strokeWidth={1.8} style={{ color: accent }} />
                </div>
                <h3 className="feat-title">{title}</h3>
                <p className="feat-text">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="feat-divider" />
      </section>
    </>
  );
}