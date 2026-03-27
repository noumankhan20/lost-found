"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight, Search } from "lucide-react";
import { useSignupMutation } from "@/redux/slices/authApiSlice";
import { useRouter } from "next/navigation";

/* ── unchanged ── */
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

export default function SignupPage() {
  /* ── all backend logic unchanged ── */
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form).unwrap();
      console.log(res);
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .signup-root { font-family: 'DM Sans', sans-serif; }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(22px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fieldIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50%       { transform: translateY(-8px) rotate(-6deg); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: var(--pw, 0%); }
        }

        .card-wrap { animation: cardReveal 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both; }

        .field-row:nth-child(1) { animation: fieldIn 0.45s ease 0.2s both; }
        .field-row:nth-child(2) { animation: fieldIn 0.45s ease 0.27s both; }
        .field-row:nth-child(3) { animation: fieldIn 0.45s ease 0.34s both; }
        .field-row:nth-child(4) { animation: fieldIn 0.45s ease 0.41s both; }
        .field-row:nth-child(5) { animation: fieldIn 0.45s ease 0.48s both; }
        .field-row:nth-child(6) { animation: fieldIn 0.45s ease 0.55s both; }

        .shimmer-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%);
          transform: translateX(-100%) skewX(-15deg);
        }
        .shimmer-btn:hover::after { animation: shimmer 0.6s ease forwards; }

        .float-badge { animation: float 5s ease-in-out infinite; }
        .rotate-ring { animation: rotateSlow 28s linear infinite; }

        .bg-dot-grid {
          background-image: radial-gradient(circle, rgba(0,0,0,0.032) 1px, transparent 1px);
          background-size: 26px 26px;
        }
      `}</style>

      <div className="signup-root min-h-screen bg-[#f4f4f4] bg-dot-grid
        flex items-center justify-center px-4 py-12 relative">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[560px] h-[560px] rounded-full opacity-[0.10]"
            style={{ background: 'radial-gradient(ellipse, #dc2626, transparent 70%)' }} />
        </div>

        <div className="relative w-full max-w-[900px] card-wrap">

          {/* ── Two-panel layout (mirrors Login) ── */}
          <div className="flex rounded-[24px] overflow-hidden
            shadow-[0_32px_80px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.06)]
            border border-black/[0.06]">

            {/* ── LEFT PANEL ── */}
            <div
              className="hidden lg:flex flex-col justify-between w-[38%] shrink-0 px-9 py-11 relative overflow-hidden"
              style={{ background: "linear-gradient(155deg, #7f0000 0%, #b91c1c 50%, #450a0a 100%)" }}
            >
              {/* Texture */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Blobs */}
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-[0.16]"
                style={{ background: "radial-gradient(circle, #fca5a5, transparent 65%)" }} />
              <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full opacity-[0.10]"
                style={{ background: "radial-gradient(circle, #f87171, transparent 65%)" }} />

              {/* Rotating ring */}
              <div className="rotate-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[300px] h-[300px] rounded-full border border-white/[0.05] pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-2 h-2 rounded-full bg-white/20" />
              </div>

              {/* Logo */}
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.15] border border-white/[0.2]
                    flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none"
                      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <span className="text-white font-black text-[19px] tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}>FindIt</span>
                </div>
                <p className="text-red-200/48 text-[10.5px] font-medium tracking-[0.18em] uppercase mt-2.5">
                  Lost &amp; Found Platform
                </p>
              </div>

              {/* Center copy */}
              <div className="relative z-10 space-y-5">
                <h2 className="text-white font-black text-[28px] leading-[1.1] tracking-[-0.03em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Join thousands<br />
                  helping reunite<br />
                  <span className="text-red-300/90">belongings.</span>
                </h2>
                <p className="text-red-100/45 text-[13px] leading-relaxed max-w-[200px] font-light">
                  Create a free account and start helping your community today.
                </p>

                {/* Feature list */}
                <div className="space-y-3 pt-1">
                  {[
                    "Post lost & found reports instantly",
                    "Get notified on potential matches",
                    "Connect directly with finders",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-white/[0.12] border border-white/[0.15]
                        flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-red-100/55 text-[12px] font-light leading-snug">{feat}</p>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-6 pt-2">
                  {[["12k+", "Items Returned"], ["4.9★", "App Rating"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <p className="text-white font-black text-[22px] leading-none tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}>{val}</p>
                      <p className="text-red-200/42 text-[10.5px] mt-1.5 font-medium tracking-wide">{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="relative z-10 float-badge">
                <div className="rounded-2xl p-4 border border-white/[0.1]
                  bg-white/[0.07] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-400/30 to-red-600/30
                      border border-white/[0.15] flex items-center justify-center text-white text-[14px] font-black"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      S
                    </div>
                    <div>
                      <p className="text-white/70 text-[12px] font-semibold leading-none">Sneha K.</p>
                      <p className="text-white/35 text-[10.5px] mt-1">Just found a wallet in Bandra</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL — form ── */}
            <div className="flex-1 bg-white px-8 py-10 sm:px-11 sm:py-11 flex flex-col justify-center">

              {/* Accent bar */}
              <div className="relative h-[3px] w-full rounded-full mb-9 overflow-hidden bg-red-50">
                <div className="absolute inset-y-0 left-0 w-2/3 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #dc2626, #f87171)' }} />
              </div>

              {/* Header */}
              <div className="mb-7">
                <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-red-500 mb-2">
                  Get started free
                </p>
                <h1 className="text-[24px] font-black text-[#0f0f0f] tracking-[-0.03em] mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Create your account
                </h1>
                <p className="text-[13.5px] text-gray-400 font-light">
                  Already have one?{" "}
                  <Link href="/login"
                    className="text-red-500 font-semibold hover:text-red-600 transition-colors underline-offset-2 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* ── Form — all handlers unchanged ── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name + Phone row */}
                <div className="grid grid-cols-2 gap-3 field-row">
                  <Field icon={User} label="Full Name">
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className={inputCls}
                    />
                  </Field>
                  <Field icon={Phone} label="Phone">
                    <input
                      type="tel" name="phone" required
                      value={form.phone} onChange={handleChange}
                      placeholder="+91 12345…"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="field-row">
                  <Field icon={Mail} label="Email Address">
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="you@email.com"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="field-row">
                  <Field icon={Lock} label="Password">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password" required
                        value={form.password} onChange={handleChange}
                        placeholder="Min. 8 characters"
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
                </div>

                {/* Password strength indicator */}
                {form.password.length > 0 && (
                  <div className="field-row space-y-1.5 -mt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((lvl) => {
                        const strength = form.password.length < 4 ? 1
                          : form.password.length < 7 ? 2
                          : form.password.length < 10 ? 3 : 4;
                        return (
                          <div key={lvl} className={`h-1 flex-1 rounded-full transition-all duration-300
                            ${lvl <= strength
                              ? strength === 1 ? "bg-red-400"
                                : strength === 2 ? "bg-orange-400"
                                : strength === 3 ? "bg-yellow-400"
                                : "bg-emerald-500"
                              : "bg-gray-100"}`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {form.password.length < 4 ? "Too short"
                        : form.password.length < 7 ? "Weak"
                        : form.password.length < 10 ? "Good"
                        : "Strong password ✓"}
                    </p>
                  </div>
                )}

                {/* Terms */}
                <div className="field-row">
                  <p className="text-[12px] text-gray-400 leading-relaxed pt-1">
                    By signing up you agree to our{" "}
                    <Link href="/terms" className="text-red-500 hover:text-red-600 font-medium transition-colors underline-offset-2 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-red-500 hover:text-red-600 font-medium transition-colors underline-offset-2 hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>

                {/* Submit */}
                <div className="field-row">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="shimmer-btn group relative w-full flex items-center justify-center gap-2
                      py-3.5 rounded-xl overflow-hidden
                      bg-red-600 hover:bg-red-700 active:bg-red-800
                      disabled:opacity-55 disabled:cursor-not-allowed
                      text-white text-[14px] font-bold tracking-[-0.01em]
                      shadow-[0_4px_16px_rgba(220,38,38,0.28)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.38)]
                      hover:-translate-y-[1px] active:translate-y-0
                      transition-all duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Creating account…
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={15}
                          className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11.5px] text-gray-300 font-semibold px-1">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Footer */}
              <p className="text-center text-[11.5px] text-gray-300 mt-6 leading-relaxed">
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