'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqData = [
  {
    question: 'How do I report a lost item?',
    answer: "Click the \"Report Lost Item\" button on the homepage and fill in the details — description, photos, last known location. We'll notify you when a potential match surfaces.",
  },
  {
    question: 'Is it free to use the platform?',
    answer: 'Yes, FindIT is completely free for individuals reporting lost or found items. No hidden fees, no subscriptions.',
  },
  {
    question: 'How long do reports stay active?',
    answer: 'Reports remain active for 30 days by default. You can extend or close them at any time from your profile dashboard.',
  },
  {
    question: 'Is my contact information visible to others?',
    answer: 'No. We only share your contact details once both parties agree to connect through the platform. Your privacy is protected throughout.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        .faq-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9f9f9;
          padding: 100px 0;
        }
        .faq-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .faq-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .faq-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #dc2626; margin-bottom: 16px;
        }
        .faq-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 800; color: #0f0f0f;
          line-height: 1.05; letter-spacing: -0.04em; margin: 0;
        }
        .faq-list {
          display: flex; flex-direction: column;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 20px; overflow: hidden;
          background: #fff;
          box-shadow: 0 1px 8px rgba(0,0,0,0.05);
        }
        .faq-item {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: background 0.25s;
        }
        .faq-item:last-child { border-bottom: none; }
        .faq-item.open { background: rgba(220,38,38,0.02); }
        .faq-btn {
          width: 100%;
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px; padding: 24px 28px;
          background: none; border: none; cursor: pointer; text-align: left;
          transition: background 0.2s;
        }
        .faq-btn:hover { background: rgba(0,0,0,0.02); }
        .faq-question {
          font-family: 'Syne', sans-serif;
          font-size: 16px; font-weight: 600;
          color: rgba(15,15,15,0.75);
          letter-spacing: -0.01em; line-height: 1.4;
        }
        .faq-item.open .faq-question { color: #0f0f0f; }
        .faq-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: rgba(15,15,15,0.4);
          transition: background 0.25s, border-color 0.25s, transform 0.3s, color 0.25s;
        }
        .faq-item.open .faq-icon {
          background: rgba(220,38,38,0.08);
          border-color: rgba(220,38,38,0.2);
          color: #dc2626;
          transform: rotate(45deg);
        }
        .faq-answer {
          overflow: hidden; max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-item.open .faq-answer { max-height: 200px; }
        .faq-answer-inner {
          padding: 0 28px 24px;
          font-size: 15px; font-weight: 300;
          color: rgba(15,15,15,0.5);
          line-height: 1.75;
        }
      `}</style>

      <section className="faq-root">
        <div className="faq-inner">
          <div className="faq-header">
            <p className="faq-eyebrow">FAQ</p>
            <h2 className="faq-h2">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqData.map((faq, i) => (
              <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                <button
                  className="faq-btn"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="faq-question">{faq.question}</span>
                  <div className="faq-icon">
                    <Plus size={14} strokeWidth={2.5} />
                  </div>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}