'use client';

import { useRef, useEffect } from 'react';

const testimonials = [
  {
    quote: 'Lost my backpack on campus, and within hours someone reported it found. We connected the same day. This platform is genuinely impressive.',
    name: 'Faheem R.',
    role: 'University Student',
    initial: 'F',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.07)',
    border: 'rgba(220,38,38,0.18)',
  },
  {
    quote: "My dog slipped his collar in the park. Someone posted a 'found' report with a photo and we were reunited in under a day. Couldn't believe it.",
    name: 'Akshat M.',
    role: 'Dog Owner',
    initial: 'A',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.18)',
  },
  {
    quote: "Lost & Found isn't just a tool — it's a lifesaver. Got my phone back thanks to a kind stranger who posted it here. Forever grateful.",
    name: 'Aquib K.',
    role: 'Verified User',
    initial: 'Q',
    color: '#059669',
    bg: 'rgba(5,150,105,0.07)',
    border: 'rgba(5,150,105,0.18)',
  },
  {
    quote: 'Posted about my lost wallet at 9pm. By morning, I had a match. The person had already turned it in. Everything was intact. Unreal experience.',
    name: 'Priya S.',
    role: 'Software Engineer',
    initial: 'P',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.07)',
    border: 'rgba(217,119,6,0.18)',
  },
  {
    quote: 'My son left his laptop at the library. I posted on this platform and a staff member had already logged it here. Picked it up within the hour.',
    name: 'Meera T.',
    role: 'Parent',
    initial: 'M',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.07)',
    border: 'rgba(8,145,178,0.18)',
  },
  {
    quote: "Found someone's passport near the metro. Didn't know what to do — posted here and they found the listing within minutes. Small world.",
    name: 'Rohan V.',
    role: 'Daily Commuter',
    initial: 'R',
    color: '#be185d',
    bg: 'rgba(190,24,93,0.07)',
    border: 'rgba(190,24,93,0.18)',
  },
  {
    quote: 'The matching system is scarily good. Uploaded a photo of a found camera and the owner reached out before I even finished my coffee.',
    name: 'Yusuf A.',
    role: 'Photographer',
    initial: 'Y',
    color: '#65a30d',
    bg: 'rgba(101,163,13,0.07)',
    border: 'rgba(101,163,13,0.18)',
  },
  {
    quote: 'Reported a found set of keys near our building. The owner found the post themselves and left a thank-you note. Community at its best.',
    name: 'Divya N.',
    role: 'Resident',
    initial: 'D',
    color: '#9333ea',
    bg: 'rgba(147,51,234,0.07)',
    border: 'rgba(147,51,234,0.18)',
  },
];

// Duplicate for seamless infinite loop
const allCards = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.55; // px per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for layout to measure
    const halfWidth = track.scrollWidth / 2;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .tst-root {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          padding: 100px 0 0;
          overflow: hidden;
        }

        .tst-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .tst-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .tst-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #dc2626;
          margin-bottom: 20px;
        }

        .tst-eyebrow::before,
        .tst-eyebrow::after {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: #dc2626;
          opacity: 0.5;
        }

        .tst-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4.5vw, 50px);
          font-weight: 800;
          color: #0f0f0f;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0 0 16px;
        }

        .tst-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(15,15,15,0.42);
          margin: 0 auto;
          max-width: 400px;
          line-height: 1.75;
        }

        /* Scroll viewport */
        .tst-viewport {
          position: relative;
          overflow: hidden;
          padding: 12px 0 40px;
          /* Fade edges */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .tst-track {
          display: flex;
          gap: 20px;
          width: max-content;
          will-change: transform;
        }

        /* Card */
        .tst-card {
          width: 330px;
          flex-shrink: 0;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
          transition: box-shadow 0.35s cubic-bezier(.22,.68,0,1.2),
                      border-color 0.35s ease,
                      transform 0.35s cubic-bezier(.22,.68,0,1.2);
          cursor: default;
        }

        .tst-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.09), 0 1px 6px rgba(0,0,0,0.05);
          border-color: rgba(0,0,0,0.11);
          transform: translateY(-4px);
        }

        .tst-accent-bar {
          height: 2px;
          width: 28px;
          border-radius: 2px;
          margin-bottom: 26px;
          transition: width 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .tst-card:hover .tst-accent-bar {
          width: 48px;
        }

        .tst-quote-mark {
          font-family: 'Syne', sans-serif;
          font-size: 52px;
          line-height: 0.6;
          font-weight: 800;
          margin-bottom: 14px;
          opacity: 0.12;
          display: block;
          letter-spacing: -0.04em;
        }

        .tst-quote {
          font-size: 14.5px;
          font-weight: 300;
          font-style: italic;
          color: rgba(15,15,15,0.58);
          line-height: 1.78;
          flex: 1;
          margin: 0 0 28px;
        }

        .tst-author {
          display: flex;
          align-items: center;
          gap: 11px;
          border-top: 1px solid rgba(0,0,0,0.055);
          padding-top: 22px;
        }

        .tst-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .tst-name {
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #0f0f0f;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .tst-role {
          font-size: 11.5px;
          font-weight: 400;
          color: rgba(15,15,15,0.36);
          letter-spacing: 0.02em;
          margin-top: 2px;
        }

        .tst-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin-top: 60px;
        }

        @media (max-width: 600px) {
          .tst-card { width: 280px; padding: 26px 22px; }
        }
      `}</style>

      <section className="tst-root">
        <div className="tst-inner">
          <div className="tst-header">
            <p className="tst-eyebrow">Testimonials</p>
            <h2 className="tst-h2">Real Stories, Real People</h2>
            <p className="tst-sub">Hear from people who found what they thought was lost forever.</p>
          </div>
        </div>

        <div
          className="tst-viewport"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div className="tst-track" ref={trackRef}>
            {allCards.map(({ quote, name, role, initial, color, bg, border }, i) => (
              <div className="tst-card" key={i}>
                <span className="tst-quote-mark" style={{ color }}>&#8220;</span>
                <div className="tst-accent-bar" style={{ background: color }} />
                <p className="tst-quote">{quote}</p>
                <div className="tst-author">
                  <div
                    className="tst-avatar"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <span style={{ color, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{initial}</span>
                  </div>
                  <div>
                    <div className="tst-name">{name}</div>
                    <div className="tst-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tst-divider" />
      </section>
    </>
  );
}