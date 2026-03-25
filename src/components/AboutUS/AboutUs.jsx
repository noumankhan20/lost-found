"use client";
import { Search, ShieldCheck, Bot, BarChart3, MapPin, ArrowRight, Users } from 'lucide-react';

const stats = [
  { value: '50K+',  label: 'Active Users'   },
  { value: '12K+',  label: 'Items Reunited' },
  { value: '2.5d',  label: 'Avg Resolution' },
  { value: '99.9%', label: 'Uptime'         },
];

const values = [
  { icon: Search,      title: 'Accuracy First',   desc: 'Every report is stored in a structured, searchable database to maximise match precision across all submissions.'  },
  { icon: ShieldCheck, title: 'Trust & Safety',   desc: 'Role-based verification and admin oversight ensure every claim is legitimate, documented, and fully auditable.'    },
  { icon: Bot,         title: 'AI-Assisted 24/7', desc: 'Our chatbot guides users around the clock — submitting reports to surfacing the best potential matches.'           },
  { icon: Users,       title: 'Community-Driven', desc: 'FindIT thrives on collective action — connecting finders with owners across campuses and public spaces.'           },
];

const team = [
  { name: 'Aryan Mehta',  role: 'Full Stack Developer', initials: 'AM', color: '#dc2626', bg: 'rgba(220,38,38,0.07)', border: 'rgba(220,38,38,0.15)' },
  { name: 'Priya Sharma', role: 'UI / UX Designer',     initials: 'PS', color: '#7c3aed', bg: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.15)' },
  { name: 'Rohan Desai',  role: 'Backend Engineer',     initials: 'RD', color: '#059669', bg: 'rgba(5,150,105,0.07)', border: 'rgba(5,150,105,0.15)' },
  { name: 'Sneha Kapoor', role: 'AI & NLP Engineer',    initials: 'SK', color: '#d97706', bg: 'rgba(217,119,6,0.07)', border: 'rgba(217,119,6,0.15)' },
];

const stack = ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Chatbot', 'JWT Auth', 'REST API', 'Tailwind CSS'];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        .about-root {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          color: #0f0f0f;
        }

        /* ── Shared ── */
        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          color: #dc2626;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .eyebrow-line {
          width: 20px; height: 1px; background: #dc2626; display: block;
        }
        .section-divider {
          height: 1px; background: rgba(0,0,0,0.06);
        }

        /* ── Hero ── */
        .hero-section {
          padding: 80px 0 72px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% -10%, rgba(220,38,38,0.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .about-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 800;
          color: #0f0f0f;
          line-height: 1.03;
          letter-spacing: -0.04em;
          max-width: 740px;
          margin: 0 0 20px;
        }
        .hero-h1 span { color: #dc2626; }
        .hero-rule {
          width: 36px; height: 2px;
          background: #dc2626; border-radius: 2px;
          margin-bottom: 24px;
        }
        .hero-body {
          font-size: 16px;
          font-weight: 300;
          color: rgba(15,15,15,0.5);
          line-height: 1.75;
          max-width: 620px;
          margin: 0;
        }

        /* ── Stats ── */
        .stats-section {
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .stat-cell {
          padding: 36px 24px;
          text-align: center;
          border-right: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: background 0.2s;
        }
        .stat-cell:hover { background: rgba(220,38,38,0.02); }
        @media (min-width: 640px) {
          .stat-cell:last-child { border-right: none; }
          .stat-cell { border-bottom: none; }
        }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: #0f0f0f;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(15,15,15,0.35);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ── Mission ── */
        .mission-section {
          padding: 96px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .mission-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 900px) {
          .mission-grid { grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        }
        .mission-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 800;
          color: #0f0f0f;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
        }
        .mission-rule {
          width: 28px; height: 2px;
          background: #dc2626; border-radius: 2px;
          margin-bottom: 20px;
        }
        .mission-body {
          font-size: 15px;
          font-weight: 300;
          color: rgba(15,15,15,0.5);
          line-height: 1.8;
          margin: 0;
        }
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.07);
          background: #fafafa;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .feature-row:hover {
          border-color: rgba(220,38,38,0.18);
          background: rgba(220,38,38,0.02);
          box-shadow: 0 2px 10px rgba(220,38,38,0.06);
        }
        .feature-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.09);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .feature-text {
          font-size: 14px;
          font-weight: 400;
          color: rgba(15,15,15,0.55);
          line-height: 1.65;
          margin: 0;
          padding-top: 6px;
        }

        /* ── Values ── */
        .values-section {
          padding: 96px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: #f9f9f9;
        }
        .values-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 800;
          color: #0f0f0f;
          letter-spacing: -0.03em;
          line-height: 1.08;
          margin: 0 0 56px;
        }
        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 640px) {
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .value-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .value-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          border-color: rgba(220,38,38,0.15);
          transform: translateY(-3px);
        }
        .value-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .value-icon-wrap {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: rgba(220,38,38,0.06);
          border: 1px solid rgba(220,38,38,0.12);
          display: flex; align-items: center; justify-content: center;
        }
        .value-num {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(15,15,15,0.15);
          letter-spacing: 0.12em;
        }
        .value-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0f0f0f;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }
        .value-desc {
          font-size: 14px;
          font-weight: 300;
          color: rgba(15,15,15,0.5);
          line-height: 1.75;
          margin: 0;
        }

        /* ── Team ── */
        .team-section {
          padding: 96px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .team-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 800;
          color: #0f0f0f;
          letter-spacing: -0.03em;
          margin: 0 0 10px;
        }
        .team-sub {
          font-size: 14px;
          font-weight: 300;
          color: rgba(15,15,15,0.42);
          margin: 0 0 52px;
          max-width: 400px;
          line-height: 1.7;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (min-width: 768px) {
          .team-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .team-card {
          background: #fafafa;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 36px 20px;
          text-align: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s, border-color 0.3s, background 0.3s, transform 0.3s;
          cursor: default;
        }
        .team-card:hover {
          background: #fff;
          box-shadow: 0 8px 28px rgba(0,0,0,0.07);
          border-color: rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .team-avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
        }
        .team-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0f0f0f;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .team-role {
          font-size: 12px;
          font-weight: 400;
          color: rgba(15,15,15,0.38);
          letter-spacing: 0.02em;
        }

        /* ── Stack ── */
        .stack-section {
          padding: 64px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: #f9f9f9;
        }
        .stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }
        .stack-tag {
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.1);
          background: #fff;
          font-size: 13px;
          font-weight: 500;
          color: rgba(15,15,15,0.55);
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .stack-tag:hover {
          border-color: rgba(220,38,38,0.25);
          color: #dc2626;
          box-shadow: 0 2px 10px rgba(220,38,38,0.08);
        }

        /* ── CTA ── */
        .cta-section {
          padding: 80px 0;
        }
        .cta-inner {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: flex-start;
        }
        @media (min-width: 640px) {
          .cta-inner { flex-direction: row; align-items: center; justify-content: space-between; gap: 32px; }
        }
        .cta-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3.5vw, 38px);
          font-weight: 800;
          color: #0f0f0f;
          letter-spacing: -0.03em;
          line-height: 1.08;
          margin: 0 0 8px;
        }
        .cta-sub {
          font-size: 14px;
          font-weight: 300;
          color: rgba(15,15,15,0.42);
          margin: 0;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #dc2626;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(220,38,38,0.25);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cta-btn:hover {
          background: #b91c1c;
          box-shadow: 0 8px 28px rgba(220,38,38,0.35);
          transform: translateY(-2px);
        }
        .cta-arrow { opacity: 0.6; transition: transform 0.2s, opacity 0.2s; }
        .cta-btn:hover .cta-arrow { transform: translateX(3px); opacity: 1; }
      `}</style>

      <main className="about-root">

        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="about-inner">
            <p className="about-eyebrow"><span className="eyebrow-line" />About FindIT</p>
            <h1 className="hero-h1">
              Building a Smarter Way<br />to Recover <span>What Matters</span>
            </h1>
            <div className="hero-rule" />
            <p className="hero-body">
              FindIT is a final-year MERN stack project — a modern Lost and Found Management
              System designed to bring order, speed, and trust to a process that has always
              been frustratingly inefficient. Powered by AI matching and real-time notifications,
              it connects users and administrators in one unified platform.
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-section">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="stats-grid">
              {stats.map(({ value, label }, i) => (
                <div className="stat-cell" key={i}>
                  <div className="stat-val">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section className="mission-section">
          <div className="about-inner">
            <div className="mission-grid">
              <div>
                <p className="about-eyebrow"><span className="eyebrow-line" />Our Mission</p>
                <h2 className="mission-h2">Reuniting People with What They've Lost</h2>
                <div className="mission-rule" />
                <p className="mission-body">
                  Losing something important is stressful. Traditional processes are slow,
                  undocumented, and unreliable. FindIT gives every lost item a digital record,
                  every user a real-time notification, and every institution a transparent
                  audit trail — reducing disputes, improving recovery rates, and restoring
                  peace of mind.
                </p>
              </div>

              <div className="feature-list">
                {[
                  { icon: MapPin,      text: 'Location-aware reporting with category, description & image upload'  },
                  { icon: Bot,         text: 'Chatbot for 24/7 guided search and real-time assistance' },
                  { icon: ShieldCheck, text: 'Admin dashboard for claim verification and user role management'      },
                  { icon: BarChart3,   text: 'Live analytics and performance logs for complete system visibility'   },
                ].map(({ icon: Icon, text }, i) => (
                  <div className="feature-row" key={i}>
                    <div className="feature-icon">
                      <Icon size={14} color="#dc2626" strokeWidth={1.75} />
                    </div>
                    <p className="feature-text">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="values-section">
          <div className="about-inner">
            <p className="about-eyebrow"><span className="eyebrow-line" />What We Stand For</p>
            <h2 className="values-h2">Our Core Values</h2>
            <div className="values-grid">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <div className="value-card" key={i}>
                  <div className="value-card-top">
                    <div className="value-icon-wrap">
                      <Icon size={16} color="#dc2626" strokeWidth={1.75} />
                    </div>
                    <span className="value-num">0{i + 1}</span>
                  </div>
                  <h3 className="value-title">{title}</h3>
                  <p className="value-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="team-section">
          <div className="about-inner">
            <p className="about-eyebrow"><span className="eyebrow-line" />The Team</p>
            <h2 className="team-h2">Built by Students, for Everyone</h2>
            <p className="team-sub">
              A four-person final-year engineering team committed to solving real-world problems with clean, scalable technology.
            </p>
            <div className="team-grid">
              {team.map(({ name, role, initials, color, bg, border }, i) => (
                <div className="team-card" key={i}>
                  <div
                    className="team-avatar"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <span style={{ color }}>{initials}</span>
                  </div>
                  <div className="team-name">{name}</div>
                  <div className="team-role">{role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STACK ── */}
        <section className="stack-section">
          <div className="about-inner">
            <p className="about-eyebrow"><span className="eyebrow-line" />Built With</p>
            <div className="stack-tags">
              {stack.map((tech, i) => (
                <span className="stack-tag" key={i}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="about-inner">
            <div className="cta-inner">
              <div>
                <h2 className="cta-h2">Lost something? We can help.</h2>
                <p className="cta-sub">Report your lost item in under 2 minutes and let FindIT do the rest.</p>
              </div>
              <a href="/report-lost" className="cta-btn">
                Report Lost Item
                <ArrowRight size={14} className="cta-arrow" />
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}