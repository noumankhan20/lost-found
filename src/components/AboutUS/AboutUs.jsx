"use client";
import { Search, ShieldCheck, Bot, BarChart3, MapPin, ArrowRight, Users } from 'lucide-react';

const stats = [
  { value: '50K+',  label: 'Active Users'   },
  { value: '12K+',  label: 'Items Reunited' },
  { value: '2.5d',  label: 'Avg Resolution' },
  { value: '99.9%', label: 'Uptime'         },
];

const values = [
  { icon: Search,      title: 'Accuracy First',  desc: 'Every report is stored in a structured, searchable database to maximise match precision across all submissions.'  },
  { icon: ShieldCheck, title: 'Trust & Safety',  desc: 'Role-based verification and admin oversight ensure every claim is legitimate, documented, and fully auditable.'    },
  { icon: Bot,         title: 'AI-Assisted 24/7',desc: 'Our chatbot guides users around the clock — submitting reports to surfacing the best potential matches.'      },
  { icon: Users,       title: 'Community-Driven',desc: 'FindIT thrives on collective action — connecting finders with owners across campuses and public spaces.'          },
];

const team = [
  { name: 'Aryan Mehta',  role: 'Full Stack Developer', initials: 'AM' },
  { name: 'Priya Sharma', role: 'UI / UX Designer',     initials: 'PS' },
  { name: 'Rohan Desai',  role: 'Backend Engineer',     initials: 'RD' },
  { name: 'Sneha Kapoor', role: 'AI & NLP Engineer',    initials: 'SK' },
];

const stack = ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Chatbot', 'JWT Auth', 'REST API', 'Tailwind CSS'];

function SectionLabel({ text }) {
  return (
    <p className="text-[11px] font-semibold text-red-500 uppercase tracking-[0.22em] mb-4 flex items-center gap-2">
      <span className="w-4 h-px bg-red-500 block" />
      {text}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* ── HERO ── */}
      <section className="border-b border-gray-100 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionLabel text="About FindIT" />
          <h1 className="text-[clamp(32px,5.5vw,60px)] font-black text-gray-900 leading-[1.03] tracking-[-0.035em] max-w-3xl mb-5">
            Building a Smarter Way to Recover What Matters
          </h1>
          <div className="w-10 h-px bg-red-500 mb-7" />
          <p className="text-[15.5px] text-gray-500 leading-relaxed max-w-2xl">
            FindIT is a final-year MERN stack project — a modern Lost and Found Management
            System designed to bring order, speed, and trust to a process that has always
            been frustratingly inefficient. Powered by AI matching and real-time notifications,
            it connects users and administrators in one unified platform.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
            {stats.map(({ value, label }, i) => (
              <div key={i} className="py-10 px-6 text-center sm:text-left">
                <div className="text-[34px] font-extrabold text-gray-900 leading-none mb-1.5 tracking-tight">{value}</div>
                <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-[0.14em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="border-b border-gray-100 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <SectionLabel text="Our Mission" />
              <h2 className="text-[clamp(24px,3.5vw,38px)] font-black text-gray-900 leading-[1.08] tracking-[-0.03em] mb-5">
                Reuniting People with What They've Lost
              </h2>
              <div className="w-8 h-px bg-red-500 mb-6" />
              <p className="text-[14.5px] text-gray-500 leading-relaxed">
                Losing something important is stressful. Traditional processes are slow,
                undocumented, and unreliable. FindIT gives every lost item a digital record,
                every user a real-time notification, and every institution a transparent
                audit trail — reducing disputes, improving recovery rates, and restoring
                peace of mind.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: MapPin,      text: 'Location-aware reporting with category, description & image upload'  },
                { icon: Bot,         text: 'Chatbot for 24/7 guided search and real-time assistance' },
                { icon: ShieldCheck, text: 'Admin dashboard for claim verification and user role management'      },
                { icon: BarChart3,   text: 'Live analytics and performance logs for complete system visibility'   },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-red-100 hover:bg-red-50/40 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Icon size={14} className="text-red-500" strokeWidth={1.75} />
                  </div>
                  <p className="text-[13.5px] text-gray-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="border-b border-gray-100 py-20 sm:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionLabel text="What We Stand For" />
          <h2 className="text-[clamp(22px,3vw,36px)] font-black text-gray-900 leading-tight tracking-[-0.025em] mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl px-6 py-7 hover:border-red-100 hover:bg-red-50/25 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm">
                    <Icon size={15} className="text-red-500" strokeWidth={1.75} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-200 tracking-[0.12em]">0{i + 1}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-2 tracking-tight">{title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="border-b border-gray-100 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionLabel text="The Team" />
          <h2 className="text-[clamp(22px,3vw,36px)] font-black text-gray-900 leading-tight tracking-[-0.025em] mb-3">
            Built by Students, for Everyone
          </h2>
          <p className="text-[14px] text-gray-400 mb-12 max-w-md">
            A four-person final-year engineering team committed to solving real-world problems with clean, scalable technology.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map(({ name, role, initials }, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-8 text-center hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
                  <span className="text-[14px] font-bold text-red-500">{initials}</span>
                </div>
                <p className="text-[14.5px] font-semibold text-gray-900 mb-1 tracking-tight">{name}</p>
                <p className="text-[11.5px] text-gray-400 font-medium">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="border-b border-gray-100 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionLabel text="Built With" />
          <div className="flex flex-wrap gap-2.5">
            {stack.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-[12.5px] font-medium text-gray-600 hover:border-red-200 hover:text-red-600 transition-colors duration-150 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-black text-gray-900 tracking-[-0.025em] mb-2">
              Lost something? We can help.
            </h2>
            <p className="text-[14px] text-gray-400">
              Report your lost item in under 2 minutes and let FindIT do the rest.
            </p>
          </div>
          <a
            href="/report-lost"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[14px] font-semibold transition-colors duration-150 shrink-0 shadow-sm"
          >
            Report Lost Item
            <ArrowRight size={14} className="opacity-60 group-hover:translate-x-0.5 transition-transform duration-150" />
          </a>
        </div>
      </section>

    </main>
  );
}