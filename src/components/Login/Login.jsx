"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/slices/authApiSlice";

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
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[860px]">

        {/* Two-panel card */}
        <div className="flex rounded-2xl overflow-hidden shadow-xl border border-gray-100">

          {/* LEFT — dark red decorative panel */}
          <div
            className="hidden lg:flex flex-col justify-between w-[42%] shrink-0 px-10 py-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #7f0000 0%, #b91c1c 45%, #450a0a 100%)",
            }}
          >
            {/* subtle geometric texture */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* glow blobs */}
            <div
              className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #fca5a5, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #f87171, transparent 70%)" }}
            />

            {/* Logo / wordmark */}
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/25 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <span className="text-white font-black text-[18px] tracking-tight">FindIt</span>
              </div>
              <p className="text-red-200/60 text-[11px] font-medium tracking-widest uppercase mt-2">
                Lost & Found Platform
              </p>
            </div>

            {/* Central copy */}
            <div className="relative z-10 space-y-5">
              <h2 className="text-white font-black text-[28px] leading-tight tracking-tight">
                Reuniting people<br />
                with their<br />
                <span className="text-red-300">belongings.</span>
              </h2>
              <p className="text-red-100/55 text-[13px] leading-relaxed max-w-[220px]">
                Thousands of items found and returned every month through our community.
              </p>

              {/* Stats row */}
              <div className="flex gap-6 pt-2">
                {[["12k+", "Items Found"], ["98%", "Match Rate"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-white font-black text-[22px] leading-none">{val}</p>
                    <p className="text-red-200/50 text-[11px] mt-1 font-medium">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom testimonial */}
            <div className="relative z-10 border border-white/10 rounded-xl p-4 bg-white/[0.07] backdrop-blur-sm">
              <p className="text-red-100/70 text-[12px] leading-relaxed italic">
                "Got my laptop back within 24 hours. Incredible service!"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-red-300/30 border border-white/20 flex items-center justify-center text-white text-[10px] font-bold">
                  R
                </div>
                <span className="text-white/50 text-[11px] font-medium">Riya M. · Mumbai</span>
              </div>
            </div>
          </div>

          {/* RIGHT — white form panel */}
          <div className="flex-1 bg-white px-7 py-10 sm:px-10 sm:py-12 flex flex-col justify-center">

            {/* Top accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-full mb-8" />

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[22px] font-black text-gray-900 tracking-tight mb-1">
                Welcome back
              </h1>
              <p className="text-[13.5px] text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  Sign up free
                </Link>
              </p>
            </div>

            {/* Form */}
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </Field>

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <Link
                  href="/forgot-password"
                  className="text-[12.5px] text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-colors duration-150 shadow-sm mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={15} className="opacity-60 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[11.5px] text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Google button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-[13.5px] font-medium text-gray-700 transition-all duration-200 shadow-sm"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Footer note */}
            <p className="text-center text-[11.5px] text-gray-300 mt-6">
              Protected by reCAPTCHA ·{" "}
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
              {" "}·{" "}
              <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}