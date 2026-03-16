"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight, Search } from "lucide-react";

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
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Red top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500" />

          <div className="px-7 py-8 sm:px-8">

            {/* Header */}
            <div className="mb-7">
              <h1 className="text-[22px] font-black text-gray-900 tracking-tight mb-1">
                Create your account
              </h1>
              <p className="text-[13.5px] text-gray-400">
                Already have one?{" "}
                <Link href="/login" className="text-red-500 font-medium hover:text-red-600 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Form — fields come FIRST */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <Field icon={User} label="Full Name">
                <input
                  type="text" name="name" required
                  value={form.name} onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={inputCls}
                />
              </Field>

              <Field icon={Phone} label="Phone Number">
                <input
                  type="tel" name="phone" required
                  value={form.phone} onChange={handleChange}
                  placeholder="+91 1234567890"
                  className={inputCls}
                />
              </Field>

              <Field icon={Mail} label="Email Address">
                <input
                  type="email" name="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="you@email.com"
                  className={inputCls}
                />
              </Field>

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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </Field>

              {/* Terms */}
              <p className="text-[12px] text-gray-400 leading-relaxed pt-1">
                By signing up you agree to our{" "}
                <Link href="/terms" className="text-red-500 hover:text-red-600 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-red-500 hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-colors duration-150 shadow-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
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

            {/* Google button — comes AFTER fields */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-[13.5px] font-medium text-gray-700 transition-all duration-200 shadow-sm"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}