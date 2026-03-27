"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/slices/authApiSlice";

/* ── unchanged input class ── */
const inputCls =
  "w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-red-400 focus:ring-4 focus:ring-red-50 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 outline-none transition-all duration-200";

function Field({ icon: Icon, label, children }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-gray-500 uppercase tracking-[0.08em]">
        <Icon size={11} className="text-red-400" strokeWidth={2.5} />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function LoginPage() {
  /* ── all backend logic unchanged ── */
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      console.log(res);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .login-root { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelReveal {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes formReveal {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .left-panel  { animation: panelReveal 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .right-panel { animation: formReveal  0.65s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

        .stat-item:nth-child(1) { animation: fadeSlideUp 0.5s ease 0.55s both; }
        .stat-item:nth-child(2) { animation: fadeSlideUp 0.5s ease 0.65s both; }

        .shimmer-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          transform: translateX(-100%) skewX(-15deg);
        }
        .shimmer-btn:hover::after {
          animation: shimmer 0.65s ease forwards;
        }

        .float-icon { animation: float 4s ease-in-out infinite; }

        .testimonial-card {
          animation: fadeSlideUp 0.6s ease 0.75s both;
        }

        .accent-line {
          background: linear-gradient(90deg, #dc2626, #ef4444, #dc2626);
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
      `}</style>

      <div className="login-root min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-14"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>

        {/* Ambient glow behind card */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[400px] rounded-full opacity-[0.12]"
            style={{ background: 'radial-gradient(ellipse, #dc2626, transparent 70%)' }} />
        </div>

        <div className="relative w-full max-w-[880px]">

          {/* Two-panel card */}
          <div className="flex rounded-[24px] overflow-hidden
            shadow-[0_32px_80px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.06)]
            border border-black/[0.06]">

            {/* ── LEFT — dark red panel ── */}
            <div
              className="left-panel hidden lg:flex flex-col justify-between w-[42%] shrink-0 px-10 py-12 relative overflow-hidden"
              style={{
                background: "linear-gradient(155deg, #7f0000 0%, #b91c1c 50%, #450a0a 100%)",
              }}
            >
              {/* Diagonal texture */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Glow blobs */}
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-[0.18]"
                style={{ background: "radial-gradient(circle, #fca5a5, transparent 65%)" }} />
              <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full opacity-[0.12]"
                style={{ background: "radial-gradient(circle, #f87171, transparent 65%)" }} />

              {/* Rotating circle decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[320px] h-[320px] rounded-full border border-white/[0.05] pointer-events-none"
                style={{ animation: 'rotateSlow 30s linear infinite' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-2 h-2 rounded-full bg-white/20" />
              </div>

              {/* ── Logo ── */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.15] border border-white/[0.2]
                    flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none"
                      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <span className="text-white font-black text-[19px] tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    FindIt
                  </span>
                </div>
                <p className="text-red-200/50 text-[10.5px] font-medium tracking-[0.18em] uppercase mt-2.5">
                  Lost &amp; Found Platform
                </p>
              </div>

              {/* ── Central copy ── */}
              <div className="relative z-10 space-y-5">
                <h2 className="text-white font-black text-[30px] leading-[1.1] tracking-[-0.03em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Reuniting people<br />
                  with their<br />
                  <span className="text-red-300/90">belongings.</span>
                </h2>
                <p className="text-red-100/48 text-[13px] leading-relaxed max-w-[210px] font-light">
                  Thousands of items found and returned every month through our community.
                </p>

                {/* Stats */}
                <div className="flex gap-7 pt-1">
                  {[["12k+", "Items Found"], ["98%", "Match Rate"]].map(([val, lbl]) => (
                    <div key={lbl} className="stat-item">
                      <p className="text-white font-black text-[24px] leading-none tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {val}
                      </p>
                      <p className="text-red-200/45 text-[11px] mt-1.5 font-medium tracking-wide">{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Testimonial ── */}
              <div className="testimonial-card relative z-10 rounded-2xl p-4
                border border-white/[0.1] bg-white/[0.07] backdrop-blur-sm
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {/* Quote mark */}
                <div className="text-red-300/30 text-[42px] font-black leading-none -mb-2 -mt-1
                  select-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                  "
                </div>
                <p className="text-red-100/65 text-[12.5px] leading-relaxed font-light">
                  Got my laptop back within 24 hours. Incredible service!
                </p>
                <div className="flex items-center gap-2.5 mt-3.5 pt-3 border-t border-white/[0.08]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400/40 to-red-600/40
                    border border-white/[0.2] flex items-center justify-center
                    text-white text-[11px] font-bold">
                    R
                  </div>
                  <div>
                    <p className="text-white/55 text-[11px] font-semibold leading-none">Riya M.</p>
                    <p className="text-white/30 text-[10px] mt-0.5">Mumbai · Verified User</p>
                  </div>
                  {/* 5 stars */}
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="#fca5a5" opacity="0.7">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT — white form panel ── */}
            <div className="right-panel flex-1 bg-white px-8 py-10 sm:px-11 sm:py-12 flex flex-col justify-center">

              {/* Header */}
              <div className="mb-8">
                <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-red-500 mb-2">
                  Welcome back
                </p>
                <h1 className="text-[24px] font-black text-[#0f0f0f] tracking-[-0.03em] mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Sign in to FindIt
                </h1>
                <p className="text-[13.5px] text-gray-400 font-light">
                  Don't have an account?{" "}
                  <Link href="/sign-up"
                    className="text-red-500 font-semibold hover:text-red-600 transition-colors underline-offset-2 hover:underline">
                    Sign up free
                  </Link>
                </p>
              </div>

              {/* ── Form — all handlers/state unchanged ── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                <Field icon={Mail} label="Email Address">
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={inputCls}
                  />
                </Field>

                <Field icon={Lock} label="Password">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`${inputCls} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2
                        w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100
                        flex items-center justify-center
                        text-gray-400 hover:text-gray-600 transition-all duration-150"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </Field>

                {/* Forgot password */}
                <div className="flex justify-end -mt-1">
                  <Link href="/forgot-password"
                    className="text-[12.5px] text-red-500 hover:text-red-600 font-semibold
                      transition-colors underline-offset-2 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shimmer-btn group relative w-full flex items-center justify-center gap-2
                    py-3.5 rounded-xl overflow-hidden
                    bg-red-600 hover:bg-red-700 active:bg-red-800
                    disabled:opacity-55 disabled:cursor-not-allowed
                    text-white text-[14px] font-bold tracking-[-0.01em]
                    shadow-[0_4px_16px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.4)]
                    hover:-translate-y-[1px] active:translate-y-0
                    transition-all duration-200 mt-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={15}
                        className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>

              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11.5px] text-gray-300 font-semibold px-1">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Footer */}
              <p className="text-center text-[11.5px] text-gray-300 mt-7 leading-relaxed">
                Protected by reCAPTCHA ·{" "}
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
                {" "}·{" "}
                <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}