'use client';

const testimonials = [
  {
    quote: 'Lost my backpack on campus, and within hours someone reported it found. We connected the same day. This platform is genuinely impressive.',
    name: 'Faheem R.',
    role: 'University Student',
    initial: 'F',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.07)',
    border: 'rgba(220,38,38,0.15)',
  },
  {
    quote: "My dog slipped his collar in the park. Someone posted a 'found' report with a photo and we were reunited in under a day. Couldn't believe it.",
    name: 'Akshat M.',
    role: 'Dog Owner',
    initial: 'A',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.15)',
  },
  {
    quote: "Lost & Found isn't just a tool — it's a lifesaver. Got my phone back thanks to a kind stranger who posted it here. Forever grateful.",
    name: 'Aquib K.',
    role: 'Verified User',
    initial: 'Q',
    color: '#059669',
    bg: 'rgba(5,150,105,0.07)',
    border: 'rgba(5,150,105,0.15)',
  },
];

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .testi-root {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          padding: 100px 0;
        }
        .testi-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .testi-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .testi-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #dc2626; margin-bottom: 16px;
        }
        .testi-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 800; color: #0f0f0f;
          line-height: 1.05; letter-spacing: -0.04em;
          margin: 0 0 14px;
        }
        .testi-sub {
          font-size: 16px; font-weight: 300;
          color: rgba(15,15,15,0.45);
          margin: 0 auto; max-width: 420px; line-height: 1.7;
        }
        .testi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) { .testi-grid { grid-template-columns: repeat(3, 1fr); } }

        .testi-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 36px 30px;
          display: flex; flex-direction: column;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .testi-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          border-color: rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .testi-accent-bar {
          height: 2px; width: 32px; border-radius: 2px;
          margin-bottom: 28px;
          transition: width 0.3s;
        }
        .testi-card:hover .testi-accent-bar { width: 52px; }
        .testi-quote {
          font-size: 15px; font-weight: 300; font-style: italic;
          color: rgba(15,15,15,0.6);
          line-height: 1.75; flex: 1; margin: 0 0 32px;
        }
        .testi-author {
          display: flex; align-items: center; gap: 12px;
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-top: 24px;
        }
        .testi-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700;
          flex-shrink: 0;
        }
        .testi-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          color: #0f0f0f; letter-spacing: -0.01em;
        }
        .testi-role {
          font-size: 12px; font-weight: 400;
          color: rgba(15,15,15,0.38);
          letter-spacing: 0.02em;
        }
        .testi-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin-top: 80px;
        }
      `}</style>

      <section className="testi-root">
        <div className="testi-inner">
          <div className="testi-header">
            <p className="testi-eyebrow">Testimonials</p>
            <h2 className="testi-h2">Real Stories, Real People</h2>
            <p className="testi-sub">Hear from users who found what they thought was lost forever.</p>
          </div>

          <div className="testi-grid">
            {testimonials.map(({ quote, name, role, initial, color, bg, border }, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-accent-bar" style={{ background: color }} />
                <p className="testi-quote">"{quote}"</p>
                <div className="testi-author">
                  <div
                    className="testi-avatar"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <span style={{ color }}>{initial}</span>
                  </div>
                  <div>
                    <div className="testi-name">{name}</div>
                    <div className="testi-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testi-divider" />
      </section>
    </>
  );
}