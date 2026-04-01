"use client";
import React, { useEffect, useRef } from "react";
import {
    X, MapPin, Clock, Brain, Info, Calendar,
    StickyNote, User, Star, ImageOff, Tag,
    Palette, Fingerprint, LocateFixed, Mail,
} from "lucide-react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "";

function getImageSrc(raw) {
    if (!raw) return null;
    if (/^(https?:\/\/|data:)/.test(raw)) return raw;
    return `${BACKEND}${raw.startsWith("/") ? "" : "/"}${raw}`;
}

function ScoreRing({ score }) {
    const r = 28;
    const circ = 2 * Math.PI * r;
    const dash = (score / 100) * circ;
    const strokeColor =
        score >= 85 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";

    return (
        <div className="relative inline-flex items-center justify-center shrink-0">
            <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r={r} fill="none" strokeWidth="5" stroke="rgba(0,0,0,0.06)" />
                <circle
                    cx="36" cy="36" r={r} fill="none" strokeWidth="5"
                    stroke={strokeColor}
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    transform="rotate(-90 36 36)"
                    style={{ transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)" }}
                />
            </svg>
            <div className="absolute flex flex-col items-center leading-none">
                <span
                    className="text-[17px] font-extrabold text-gray-900"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {score}
                </span>
                <span className="text-[8px] font-bold text-black/30 uppercase tracking-widest mt-0.5">%</span>
            </div>
        </div>
    );
}

function DetailRow({ icon: Icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3 py-2.5 border-b border-black/[0.05] last:border-0">
            <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-3 h-3 text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-black/28 uppercase tracking-[0.11em] mb-0.5">{label}</p>
                <p className="text-[13px] text-gray-800 leading-snug break-words">{value}</p>
            </div>
        </div>
    );
}

export default function ClaimDetailsModal({ claim, onClose }) {
    const overlayRef = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    if (!claim) return null;

    const {
        item, claimant, claimerName, claimerEmail,
        description, lastSeenLocation, lastSeenDate,
        additionalNote, matchScore, aiReason, status, createdAt,
    } = claim;

    const images = item?.images || [];
    const answers = claim.answers || {};
    const scoreColor =
        matchScore >= 85 ? "text-emerald-600" : matchScore >= 60 ? "text-amber-600" : "text-red-600";
    const scoreBorderBg =
        matchScore >= 85
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : matchScore >= 60
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-red-50 border-red-200 text-red-700";
    const scoreBarClass =
        matchScore >= 85 ? "bg-emerald-500" : matchScore >= 60 ? "bg-amber-500" : "bg-red-500";
    const scoreLabel =
        matchScore >= 85 ? "Strong Match" : matchScore >= 60 ? "Possible Match" : "Weak Match";

    const statusConfig = {
        approved: { cls: "bg-emerald-50 border-emerald-200 text-emerald-700", dot: "bg-emerald-500" },
        rejected: { cls: "bg-red-50 border-red-200 text-red-700", dot: "bg-red-500" },
        matched: { cls: "bg-blue-50 border-blue-200 text-blue-700", dot: "bg-blue-500" },
        pending: { cls: "bg-amber-50 border-amber-200 text-amber-700", dot: "bg-amber-400" },
    };
    const sc = statusConfig[status] || statusConfig.pending;

    const formatDate = (d) =>
        d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <>
            <style>{`
        @keyframes cdm-in   { from { opacity:0 } to { opacity:1 } }
        @keyframes cdm-up   {
          from { opacity:0; transform:translateY(22px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        .cdm-backdrop { animation: cdm-in 0.18s ease both; }
        .cdm-box      { animation: cdm-up 0.28s cubic-bezier(.22,1,.36,1) both; }
        .cdm-scroll::-webkit-scrollbar       { width: 4px; }
        .cdm-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius:4px; }
      `}</style>

            {/* ── Backdrop ── */}
            <div
                ref={overlayRef}
                className="cdm-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4"
                style={{
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(7px)",
                    WebkitBackdropFilter: "blur(7px)",
                }}
                onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
            >
                {/* ── Modal ── */}
                <div
                    className="cdm-box relative w-full bg-white rounded-3xl border border-black/[0.08] shadow-2xl flex flex-col overflow-hidden"
                    style={{ maxWidth: 660, maxHeight: "calc(100vh - 40px)" }}
                >
                    {/* Red top stripe */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-red-600 via-red-400 to-rose-500 shrink-0" />

                    {/* Scrollable content */}
                    <div className="cdm-scroll overflow-y-auto flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.08) transparent" }}>

                        {/* ── Header ── */}
                        <div className="px-6 pt-5 pb-4 border-b border-black/[0.06] bg-gradient-to-br from-red-50/50 to-white">
                            <div className="flex items-start gap-4">
                                <ScoreRing score={matchScore ?? 0} />

                                <div className="flex-1 min-w-0 pt-0.5">
                                    {/* Title + status */}
                                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                        <h2
                                            className="text-[20px] font-extrabold text-gray-900 tracking-[-0.025em] leading-tight"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            {item?.itemName || claim.itemName || "Unnamed Item"}
                                        </h2>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${sc.cls}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                            {status?.charAt(0).toUpperCase() + status?.slice(1)}
                                        </span>
                                    </div>

                                    <p className="text-[12px] text-black/35 mb-2">
                                        Submitted {formatDate(createdAt)} · by{" "}
                                        <span className="font-semibold text-black/55">
                                            {claimant?.name || claimerName || "Unknown"}
                                        </span>
                                    </p>

                                    {/* Score badge */}
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11.5px] font-bold ${scoreBorderBg}`}>
                                        {matchScore >= 85 ? "✓" : matchScore >= 60 ? "~" : "!"}
                                        {scoreLabel} · {matchScore}% AI confidence
                                    </span>
                                </div>

                                {/* Close */}
                                <button
                                    onClick={onClose}
                                    className="shrink-0 w-8 h-8 rounded-full bg-black/[0.04] hover:bg-red-50 border border-black/[0.07] flex items-center justify-center transition-all duration-150 group"
                                >
                                    <X size={14} strokeWidth={2.5} className="text-black/35 group-hover:text-red-500" />
                                </button>
                            </div>
                        </div>

                        {/* ── Body ── */}
                        <div className="px-6 py-5 flex flex-col gap-4">

                            {/* AI Reasoning */}
                            {aiReason && (
                                <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center">
                                            <Brain className="w-3.5 h-3.5 text-red-500" />
                                        </div>
                                        <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest">
                                            AI Analysis
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-red-900/70 leading-relaxed">{aiReason}</p>
                                </div>
                            )}

                            {/* Two columns */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* What They Said */}
                                <div className="rounded-2xl border border-black/[0.07] bg-gray-50/60 p-4">
                                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.13em] mb-3">
                                        What They Said
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <DetailRow icon={User} label="Claimant" value={claimant?.name || claimerName} />
                                        <DetailRow icon={Mail} label="Email" value={claimant?.email || claimerEmail} />
                                        <DetailRow icon={StickyNote} label="Their Description" value={description} />
                                        <DetailRow icon={MapPin} label="Last Seen At" value={lastSeenLocation} />
                                        <DetailRow icon={Calendar} label="Last Seen Date" value={formatDate(lastSeenDate)} />
                                        <DetailRow icon={Star} label="About Brand" value={answers.brand} />
                                        <DetailRow icon={Palette} label="About Color" value={answers.color} />
                                        <DetailRow icon={Fingerprint} label="About Unique Mark" value={answers.uniqueMark} />
                                        <DetailRow icon={LocateFixed} label="About Exact Location" value={answers.exactLocation} />
                                    </p>
                                    {additionalNote && (
                                        <DetailRow icon={Info} label="Additional Note" value={`"${additionalNote}"`} />
                                    )}
                                </div>

                                {/* Found Item Details */}
                                <div className="rounded-2xl border border-black/[0.07] bg-gray-50/60 p-4">
                                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.13em] mb-3">
                                        Found Item Details
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <DetailRow icon={Tag} label="Description" value={item?.description} />
                                        <DetailRow icon={Star} label="Brand" value={item?.brand} />
                                        <DetailRow icon={Palette} label="Color" value={item?.color} />
                                        <DetailRow icon={Fingerprint} label="Unique Mark" value={item?.uniqueMark} />
                                        <DetailRow icon={MapPin} label="Found At" value={item?.location} />
                                        <DetailRow icon={LocateFixed} label="Exact Spot" value={item?.exactLocation} />
                                        <DetailRow icon={Clock} label="Date Found" value={formatDate(item?.dateTime)} />
                                    </p>
                                </div>
                            </div>

                            {/* Item Photos */}
                            {images.length > 0 && (
                                <div className="rounded-2xl border border-black/[0.07] bg-gray-50/60 p-4">
                                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.13em] mb-3">
                                        Item Photos
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        {images.map((img, idx) => {
                                            const src = getImageSrc(img);
                                            return src ? (
                                                <img
                                                    key={idx} src={src} alt={`item-${idx}`}
                                                    className="w-16 h-16 rounded-xl object-cover border border-black/10 hover:scale-105 transition-transform duration-200 cursor-zoom-in shadow-sm"
                                                />
                                            ) : (
                                                <div
                                                    key={idx}
                                                    className="w-16 h-16 rounded-xl bg-black/[0.03] border border-black/[0.07] flex flex-col items-center justify-center gap-1 text-black/20"
                                                >
                                                    <ImageOff size={14} />
                                                    <span className="text-[9px]">No img</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Match Confidence bar */}
                            <div className="rounded-2xl border border-black/[0.07] bg-gray-50/60 p-4">
                                <div className="flex items-center justify-between mb-2.5">
                                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.13em]">
                                        Match Confidence
                                    </p>
                                    <span className={`text-[12px] font-extrabold ${scoreColor}`}>{matchScore}%</span>
                                </div>

                                {/* Progress bar */}
                                <div className="h-2 bg-black/[0.06] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${scoreBarClass} transition-all duration-700`}
                                        style={{ width: `${matchScore}%` }}
                                    />
                                </div>

                                {/* Tick labels */}
                                <div className="flex justify-between mt-1.5">
                                    {[0, 25, 50, 75, 100].map((t) => (
                                        <span key={t} className="text-[9.5px] text-black/20 font-medium">{t}%</span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}