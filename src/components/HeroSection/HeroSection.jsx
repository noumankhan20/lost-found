"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

const stats = [
  { icon: Users,  label: "Active Users",    value: "50K+" },
  { icon: Search, label: "Items Reunited",  value: "12K+" },
  { icon: Clock,  label: "Avg. Resolution", value: "2.5 days" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          min-height: 100svh;
          background: #ffffff;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 50% -5%, rgba(220,38,38,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 85% 90%, rgba(220,38,38,0.04) 0%, transparent 60%);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .hero-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to top, #ffffff, transparent);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 24px 80px;
          text-align: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          background: rgba(220,38,38,0.06);
          border: 1px solid rgba(220,38,38,0.15);
          color: rgba(180,28,28,0.85);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .hero-badge.in { opacity: 1; transform: translateY(0); }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #dc2626;
          box-shadow: 0 0 6px rgba(220,38,38,0.5);
        }
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #0f0f0f;
          line-height: 1;
          letter-spacing: -0.05em;
          font-size: clamp(64px, 11vw, 104px);
          margin: 0 0 18px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .hero-h1 span { color: #dc2626; }
        .hero-h1.in { opacity: 1; transform: translateY(0); }
        .hero-sub {
          font-size: clamp(17px, 2.5vw, 22px);
          font-weight: 300;
          color: rgba(15,15,15,0.45);
          letter-spacing: -0.01em;
          margin: 0 0 14px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .hero-sub.in { opacity: 1; transform: translateY(0); }
        .hero-body {
          font-size: clamp(14px, 1.6vw, 16px);
          color: rgba(15,15,15,0.5);
          line-height: 1.75;
          max-width: 520px;
          margin: 0 auto 48px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
        }
        .hero-body.in { opacity: 1; transform: translateY(0); }
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
          align-items: center;
          margin-bottom: 72px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
        }
        .hero-ctas.in { opacity: 1; transform: translateY(0); }
        @media (min-width: 480px) { .hero-ctas { flex-direction: row; } }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: #dc2626; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          border: none; border-radius: 12px; cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(220,38,38,0.25);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          text-decoration: none; white-space: nowrap;
        }
        .btn-primary:hover {
          background: #b91c1c;
          box-shadow: 0 8px 28px rgba(220,38,38,0.35);
          transform: translateY(-2px);
        }
        .btn-arrow { opacity: 0.6; transition: transform 0.2s, opacity 0.2s; }
        .btn-primary:hover .btn-arrow { transform: translateX(3px); opacity: 1; }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: #fff; color: rgba(15,15,15,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 500;
          border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          transition: all 0.2s;
          text-decoration: none; white-space: nowrap;
        }
        .btn-secondary:hover {
          border-color: rgba(0,0,0,0.22);
          color: #0f0f0f;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.09);
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px; max-width: 680px; margin: 0 auto;
        }
        @media (max-width: 540px) {
          .hero-stats { grid-template-columns: 1fr; max-width: 280px; }
        }
        .stat-card {
          padding: 24px 16px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px; cursor: default;
          box-shadow: 0 1px 6px rgba(0,0,0,0.05);
          opacity: 0; transform: translateY(12px);
          transition: border-color 0.2s, box-shadow 0.2s, opacity 0.7s ease, transform 0.7s ease;
        }
        .stat-card:hover {
          border-color: rgba(220,38,38,0.2);
          box-shadow: 0 4px 20px rgba(220,38,38,0.08);
        }
        .stat-card.in { opacity: 1; transform: translateY(0); }
        .stat-icon { color: rgba(220,38,38,0.35); margin: 0 auto 10px; display: block; transition: color 0.2s; }
        .stat-card:hover .stat-icon { color: #dc2626; }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 30px; font-weight: 700; color: #0f0f0f;
          letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px;
        }
        .stat-label {
          font-size: 12px; font-weight: 500; color: rgba(15,15,15,0.38);
          letter-spacing: 0.06em; text-transform: uppercase;
        }
      `}</style>

      <section className="hero-root">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-fade" />
        <div className="hero-inner">
          <div className={`hero-badge ${mounted ? 'in' : ''}`}>
            <span className="badge-dot" />
            AI-Powered Lost &amp; Found Platform
          </div>
          <h1 className={`hero-h1 ${mounted ? 'in' : ''}`}>Find<span>IT</span></h1>
          <p className={`hero-sub ${mounted ? 'in' : ''}`}>Your AI-Powered Lost &amp; Found Management System</p>
          <p className={`hero-body ${mounted ? 'in' : ''}`}>
            Connect with your community to find lost items faster than ever.
            Post, search, and reunite with what matters most.
          </p>
          <div className={`hero-ctas ${mounted ? 'in' : ''}`}>
            <button className="btn-primary" onClick={() => router.push('/report-lost')}>
              <Search size={16} strokeWidth={2.5} />
              Report Lost Item
              <ArrowRight size={14} className="btn-arrow" />
            </button>
            <button className="btn-secondary" onClick={() => router.push('/browse-items')}>
              <MapPin size={16} strokeWidth={2} />
              Browse Found Items
            </button>
          </div>
          <div className="hero-stats">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <div
                key={i}
                className={`stat-card ${mounted ? 'in' : ''}`}
                style={{ transitionDelay: mounted ? `${0.6 + i * 0.1}s` : '0s' }}
              >
                <Icon className="stat-icon" size={26} strokeWidth={1.5} />
                <div className="stat-val">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}