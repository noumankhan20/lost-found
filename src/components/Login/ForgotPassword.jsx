"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useForgotPasswordMutation, useResetPasswordMutation } from "@/redux/slices/authApiSlice";

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

function StrengthBar({ password }) {
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["bg-gray-100", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
    if (!password) return null;
    return (
        <div className="space-y-1.5 pt-1">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score] : "bg-gray-100"}`} />
                ))}
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-400 font-light">
                    {checks.map((ok, i) => {
                        const hints = ["8+ chars", "uppercase", "number", "symbol"];
                        return !ok ? <span key={i} className="mr-2">· {hints[i]}</span> : null;
                    })}
                </p>
                {score > 0 && (
                    <span className={`text-[11px] font-semibold ${score === 4 ? "text-green-500" : score === 3 ? "text-yellow-500" : score === 2 ? "text-orange-400" : "text-red-400"}`}>
                        {labels[score]}
                    </span>
                )}
            </div>
        </div>
    );
}

// ── OTP Input: 6 individual boxes ──
function OtpInput({ value, onChange }) {
    const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

    const handleKey = (e, idx) => {
        const key = e.key;
        if (key === "Backspace") {
            e.preventDefault();
            const next = value.slice(0, idx) + value.slice(idx + 1);
            onChange(next);
            if (idx > 0) document.getElementById(`otp-${idx - 1}`)?.focus();
            return;
        }
        if (key === "ArrowLeft" && idx > 0) { document.getElementById(`otp-${idx - 1}`)?.focus(); return; }
        if (key === "ArrowRight" && idx < 5) { document.getElementById(`otp-${idx + 1}`)?.focus(); return; }
        if (/^[0-9]$/.test(key)) {
            e.preventDefault();
            const next = value.slice(0, idx) + key + value.slice(idx + 1);
            onChange(next.slice(0, 6));
            if (idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        onChange(pasted);
        const focusIdx = Math.min(pasted.length, 5);
        document.getElementById(`otp-${focusIdx}`)?.focus();
    };

    return (
        <div className="flex gap-2.5 justify-between">
            {digits.map((d, i) => (
                <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={() => {}}
                    onKeyDown={(e) => handleKey(e, i)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    className={`w-full aspect-square max-w-[52px] text-center text-[18px] font-bold rounded-xl border
                        outline-none transition-all duration-200 caret-transparent
                        ${d ? "border-red-400 bg-red-50/40 text-gray-800 ring-4 ring-red-50" : "border-gray-200 bg-white text-gray-800"}
                        hover:border-gray-300 focus:border-red-400 focus:ring-4 focus:ring-red-50`}
                />
            ))}
        </div>
    );
}

export default function ForgotPasswordPage() {
    // step 1 = enter email, step 2 = enter OTP + new password, step 3 = success
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [forgotPassword, { isLoading: isSending }] = useForgotPasswordMutation();
    const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

    // Step 1: send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ email }).unwrap();
            setStep(2);
        } catch (err) {
            alert(err?.data?.message || "Something went wrong");
        }
    };

    // Step 2: verify OTP + reset password
    const handleReset = async (e) => {
        e.preventDefault();
        if (otp.length < 6) { alert("Please enter the full 6-digit OTP"); return; }
        if (password !== confirm) { alert("Passwords do not match"); return; }
        try {
            await resetPassword({ email, otp, password }).unwrap();
            setStep(3);
        } catch (err) {
            alert(err?.data?.message || "Invalid or expired OTP");
        }
    };

    // Left panel content per step
    const leftContent = {
        1: {
            heading: <>Happens to<br />the best<br /><span className="text-red-300/90">of us.</span></>,
            sub: "Enter your email and we'll send a 6-digit OTP to verify your identity.",
            steps: [["01", "Enter your email below"], ["02", "Check your inbox for OTP"], ["03", "Set a new password"]],
        },
        2: {
            heading: <>Check<br />your<br /><span className="text-red-300/90">inbox.</span></>,
            sub: "Enter the 6-digit OTP we sent and choose a new password.",
            steps: [["✓", "Email verified"], ["02", "Enter OTP from email"], ["03", "Set a new password"]],
        },
        3: {
            heading: <>All<br />done!<br /><span className="text-red-300/90">🎉</span></>,
            sub: "Your password has been reset. You can now sign in.",
            steps: [["✓", "Email verified"], ["✓", "OTP confirmed"], ["✓", "Password updated"]],
        },
    };
    const lc = leftContent[step];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .fp-root { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes panelReveal { from { opacity:0; transform:translateX(-18px); } to { opacity:1; transform:translateX(0); } }
        @keyframes formReveal  { from { opacity:0; transform:translateX(14px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes shimmer     { 0% { transform:translateX(-100%) skewX(-15deg); } 100% { transform:translateX(250%) skewX(-15deg); } }
        @keyframes rotateSlow  { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes successPop  { 0% { transform:scale(0.7); opacity:0; } 70% { transform:scale(1.08); opacity:1; } 100% { transform:scale(1); opacity:1; } }
        @keyframes successFadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-ring  { 0% { transform:scale(1); opacity:0.4; } 100% { transform:scale(1.7); opacity:0; } }
        @keyframes checkDraw   { from { stroke-dashoffset:100; } to { stroke-dashoffset:0; } }

        .left-panel  { animation: panelReveal 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .right-panel { animation: formReveal  0.65s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .shimmer-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%); transform:translateX(-100%) skewX(-15deg); }
        .shimmer-btn:hover::after { animation: shimmer 0.65s ease forwards; }
        .success-icon    { animation: successPop     0.55s cubic-bezier(0.34,1.56,0.64,1) 0.1s  both; }
        .success-line-1  { animation: successFadeUp  0.4s  ease 0.4s  both; }
        .success-line-2  { animation: successFadeUp  0.4s  ease 0.55s both; }
        .success-line-3  { animation: successFadeUp  0.4s  ease 0.7s  both; }
        .success-btn     { animation: successFadeUp  0.4s  ease 0.85s both; }
        .pulse-ring      { position:absolute; inset:-8px; border-radius:9999px; border:2px solid #dc2626; animation:pulse-ring 1.5s ease-out infinite; }
        .pulse-ring-2    { animation-delay:0.5s; }
        .step-item       { animation: fadeSlideUp 0.45s ease both; }
        .step-item:nth-child(1) { animation-delay:0.55s; }
        .step-item:nth-child(2) { animation-delay:0.65s; }
        .step-item:nth-child(3) { animation-delay:0.75s; }
        .check-path { stroke-dasharray:100; stroke-dashoffset:100; animation:checkDraw 0.5s ease 0.5s forwards; }
      `}</style>

            <div
                className="fp-root min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-14"
                style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-[600px] h-[400px] rounded-full opacity-[0.12]" style={{ background: "radial-gradient(ellipse, #dc2626, transparent 70%)" }} />
                </div>

                <div className="relative w-full max-w-[880px]">
                    <div className="flex rounded-[24px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.06)] border border-black/[0.06]">

                        {/* ── LEFT dark red panel ── */}
                        <div
                            className="left-panel hidden lg:flex flex-col justify-between w-[42%] shrink-0 px-10 py-12 relative overflow-hidden"
                            style={{ background: "linear-gradient(155deg, #7f0000 0%, #b91c1c 50%, #450a0a 100%)" }}
                        >
                            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "22px 22px" }} />
                            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-[0.18]" style={{ background: "radial-gradient(circle, #fca5a5, transparent 65%)" }} />
                            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full opacity-[0.12]" style={{ background: "radial-gradient(circle, #f87171, transparent 65%)" }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/[0.05] pointer-events-none" style={{ animation: "rotateSlow 30s linear infinite" }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20" />
                            </div>

                            {/* Logo */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-9 h-9 rounded-xl bg-white/[0.15] border border-white/[0.2] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-black text-[19px] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>FindIt</span>
                                </div>
                                <p className="text-red-200/50 text-[10.5px] font-medium tracking-[0.18em] uppercase mt-2.5">Lost &amp; Found Platform</p>
                            </div>

                            {/* Central copy */}
                            <div className="relative z-10 space-y-5">
                                <h2 className="text-white font-black text-[28px] leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif" }}>
                                    {lc.heading}
                                </h2>
                                <p className="text-red-100/48 text-[13px] leading-relaxed max-w-[210px] font-light">{lc.sub}</p>
                                <div className="space-y-3.5 pt-1">
                                    {lc.steps.map(([num, text],i) => (
                                        <div key={`${num}-${i}`} className="step-item flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-white/[0.12] border border-white/[0.15] flex items-center justify-center shrink-0">
                                                <span className="text-red-200/70 text-[9px] font-black" style={{ fontFamily: "'Syne', sans-serif" }}>{num}</span>
                                            </div>
                                            <span className="text-red-100/55 text-[12.5px] font-light">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom security badge */}
                            <div className="relative z-10 rounded-2xl p-4 border border-white/[0.1] bg-white/[0.07] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-white/[0.12] border border-white/[0.15] flex items-center justify-center shrink-0 mt-0.5">
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-[11.5px] font-semibold leading-none mb-1">Secure OTP</p>
                                        <p className="text-red-100/40 text-[11px] leading-relaxed font-light">OTPs expire in 10 minutes for your protection.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT white form panel ── */}
                        <div className="right-panel flex-1 bg-white px-8 py-10 sm:px-11 sm:py-12 flex flex-col justify-center">

                            {/* ── STEP 1: Enter Email ── */}
                            {step === 1 && (
                                <>
                                    <div className="mb-8">
                                        <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-red-500 mb-2">Account Recovery</p>
                                        <h1 className="text-[24px] font-black text-[#0f0f0f] tracking-[-0.03em] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                                            Forgot your password?
                                        </h1>
                                        <p className="text-[13.5px] text-gray-400 font-light">No worries — enter your email and we'll send a 6-digit OTP.</p>
                                    </div>

                                    <form onSubmit={handleSendOtp} className="space-y-4">
                                        <Field icon={Mail} label="Email Address">
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@email.com"
                                                className={inputCls}
                                            />
                                        </Field>

                                        <p className="text-[12px] text-gray-400 font-light flex items-center gap-1.5 pt-0.5">
                                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                                            </svg>
                                            We'll only send an OTP if this email is registered with FindIt.
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={isSending}
                                            className="shimmer-btn group relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl overflow-hidden bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-55 disabled:cursor-not-allowed text-white text-[14px] font-bold tracking-[-0.01em] shadow-[0_4px_16px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.4)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 mt-2"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            {isSending ? (
                                                <><svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>Sending OTP…</>
                                            ) : (
                                                <>Send OTP<ArrowRight size={15} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" /></>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-6 flex justify-center">
                                        <Link href="/login" className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-400 hover:text-gray-600 font-medium transition-colors group">
                                            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
                                            Back to Sign In
                                        </Link>
                                    </div>
                                </>
                            )}

                            {/* ── STEP 2: Enter OTP + New Password ── */}
                            {step === 2 && (
                                <>
                                    <div className="mb-8">
                                        <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-red-500 mb-2">Verify &amp; Reset</p>
                                        <h1 className="text-[24px] font-black text-[#0f0f0f] tracking-[-0.03em] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                                            Enter your OTP
                                        </h1>
                                        <p className="text-[13.5px] text-gray-400 font-light">
                                            We sent a 6-digit code to{" "}
                                            <span className="text-gray-700 font-medium">{email}</span>.
                                        </p>
                                    </div>

                                    <form onSubmit={handleReset} className="space-y-5">
                                        {/* OTP boxes */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-gray-500 uppercase tracking-[0.08em]">
                                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                                6-Digit OTP
                                            </label>
                                            <OtpInput value={otp} onChange={setOtp} />
                                            {/* Expiry note */}
                                            <p className="text-[11.5px] text-gray-400 font-light flex items-center gap-1.5 pt-0.5">
                                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                                                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                                                </svg>
                                                This OTP expires in 10 minutes.
                                            </p>
                                        </div>

                                        {/* New password */}
                                        <Field icon={Lock} label="New Password">
                                            <div className="relative">
                                                <input
                                                    type={showPwd ? "text" : "password"}
                                                    required
                                                    minLength={8}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Create a strong password"
                                                    className={`${inputCls} pr-11`}
                                                />
                                                <button type="button" onClick={() => setShowPwd((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-150">
                                                    {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                            <StrengthBar password={password} />
                                        </Field>

                                        {/* Confirm password */}
                                        <Field icon={Lock} label="Confirm Password">
                                            <div className="relative">
                                                <input
                                                    type={showConfirm ? "text" : "password"}
                                                    required
                                                    value={confirm}
                                                    onChange={(e) => setConfirm(e.target.value)}
                                                    placeholder="Repeat your password"
                                                    className={`${inputCls} pr-11 ${confirm && password !== confirm ? "border-red-300 focus:border-red-400 bg-red-50/30" : confirm && password === confirm ? "border-green-300 focus:border-green-400" : ""}`}
                                                />
                                                <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-150">
                                                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                            {confirm && password !== confirm && (
                                                <p className="text-[11.5px] text-red-500 font-medium flex items-center gap-1">
                                                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
                                                    Passwords don't match
                                                </p>
                                            )}
                                            {confirm && password === confirm && (
                                                <p className="text-[11.5px] text-green-600 font-medium flex items-center gap-1">
                                                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                    Passwords match
                                                </p>
                                            )}
                                        </Field>

                                        <button
                                            type="submit"
                                            disabled={isResetting || otp.length < 6 || (confirm && password !== confirm)}
                                            className="shimmer-btn group relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl overflow-hidden bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-55 disabled:cursor-not-allowed text-white text-[14px] font-bold tracking-[-0.01em] shadow-[0_4px_16px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.4)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 mt-1"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            {isResetting ? (
                                                <><svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>Resetting…</>
                                            ) : (
                                                <>Reset Password<ArrowRight size={15} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" /></>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-5 flex items-center justify-between">
                                        <button
                                            onClick={() => { setStep(1); setOtp(""); setPassword(""); setConfirm(""); }}
                                            className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-400 hover:text-gray-600 font-medium transition-colors group"
                                        >
                                            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
                                            Change email
                                        </button>
                                        <button
                                            onClick={handleSendOtp}
                                            disabled={isSending}
                                            className="text-[12.5px] text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
                                        >
                                            {isSending ? "Resending…" : "Resend OTP"}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* ── STEP 3: Success ── */}
                            {step === 3 && (
                                <div className="flex flex-col items-center text-center py-4">
                                    <div className="relative mb-7">
                                        <div className="pulse-ring" style={{ borderColor: '#16a34a' }} />
                                        <div className="pulse-ring pulse-ring-2" style={{ borderColor: '#16a34a' }} />
                                        <div className="success-icon relative w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-[0_12px_32px_rgba(22,163,74,0.35)] flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline className="check-path" points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>

                                    <p className="success-line-1 text-[10.5px] font-bold tracking-[0.18em] uppercase text-green-600 mb-2">All done</p>
                                    <h2 className="success-line-2 text-[24px] font-black text-[#0f0f0f] tracking-[-0.03em] mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        Password updated!
                                    </h2>
                                    <p className="success-line-3 text-[13.5px] text-gray-400 font-light leading-relaxed max-w-[270px] mb-6">
                                        Your password has been reset successfully. You can now sign in with your new credentials.
                                    </p>

                                    <div className="w-full h-px bg-gray-100 mb-6" />

                                    <Link
                                        href="/login"
                                        className="success-btn shimmer-btn group relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl overflow-hidden bg-red-600 hover:bg-red-700 text-white text-[14px] font-bold tracking-[-0.01em] shadow-[0_4px_16px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.4)] hover:-translate-y-[1px] transition-all duration-200"
                                        style={{ fontFamily: "'Syne', sans-serif" }}
                                    >
                                        Sign In Now
                                        <ArrowRight size={15} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
                                    </Link>
                                </div>
                            )}

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