"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  MapPin, Mail, Phone, Calendar, Edit3, Check, X, CheckCircle2,
  ArrowUpRight, LogOut, Shield, Bell, ChevronRight,
  Package, Search, Star, Clock, Loader2, AlertCircle, FileText,ImageOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetMeQuery,
  useGetMyItemsQuery,
  useLogoutMutation,
} from "@/redux/slices/authApiSlice";
import { useGetMyClaimsQuery, useApproveClaimMutation, useRejectClaimMutation, useGetClaimsMadeQuery } from "@/redux/slices/claimApiSlice";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/redux/slices/apiSlice";
// ── Animated counter ──────────────────────────────────────────────────────────
function CountUp({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return <>{val}</>;
}

// ── Editable field ────────────────────────────────────────────────────────────
function EditableField({ label, value, onChange, type = "text", icon: Icon }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => { setDraft(value); }, [value]);

  const commit = () => { onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <div className="group flex items-center gap-3 py-3.5 border-b border-black/5 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100/80
        flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-black/28 uppercase tracking-[0.14em] mb-0.5">{label}</p>
        {editing ? (
          <input
            ref={inputRef}
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") cancel(); }}
            className="w-full text-[14px] text-[#0f0f0f] bg-transparent border-b-2 border-red-400
              outline-none pb-0.5 font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        ) : (
          <p className="text-[14px] text-[#0f0f0f] font-medium truncate">{value || "—"}</p>
        )}
      </div>
      {editing ? (
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={commit}
            className="w-7 h-7 rounded-lg bg-emerald-500 hover:bg-emerald-600
              flex items-center justify-center transition-colors">
            <Check className="w-3.5 h-3.5 text-white" />
          </button>
          <button onClick={cancel}
            className="w-7 h-7 rounded-lg bg-black/8 hover:bg-black/14
              flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 text-black/40" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100
            bg-black/5 hover:bg-red-50 hover:text-red-500
            flex items-center justify-center transition-all duration-150 shrink-0">
          <Edit3 className="w-3 h-3 text-black/35" />
        </button>
      )}
    </div>
  );
}

// ── Activity item ─────────────────────────────────────────────────────────────
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "";

function ActivityItem({ item, formatDate, index }) {
  const isLost = item.status === "lost";
  const rawImage = item.images?.[0] || item.image || null;
  const imageSrc = rawImage
    ? /^(https?:\/\/|data:)/.test(rawImage)
      ? rawImage
      : `${BACKEND}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`
    : null;
  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-2xl
        hover:bg-black/[0.025] transition-all duration-200 cursor-default"
      style={{ animationDelay: `${300 + index * 70}ms`, animation: "fadeSlideUp 0.4s ease both" }}
    >
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/5">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.name || item.itemName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-black/30">
            <ImageOff size={16} strokeWidth={1.5} />
            <p className="text-[10px] font-medium">No Image</p>
          </div>
        )}
        <div className={`absolute top-1 left-1 w-2 h-2 rounded-full border border-white
          ${isLost ? "bg-red-500" : "bg-emerald-500"}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold text-[#0f0f0f] truncate leading-snug"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {item.name || item.itemName || "Unnamed Item"}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <MapPin className="w-2.5 h-2.5 text-black/30 shrink-0" />
          <span className="text-[11.5px] text-gray-700 truncate">
            {item.location || item.lastSeenLocation || "Unknown location"}
          </span>
          <span className="text-black/15">·</span>
          <Clock className="w-2.5 h-2.5 text-black/30 shrink-0" />
          <span className="text-[11.5px] text-gray-700">
            {formatDate(item.createdAt || item.date)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em]
          ${isLost ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {item.status}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-black/20 group-hover:text-red-500
          group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>
    </div>
  );
}

// ── My Claim item ─────────────────────────────────────────────────────────────
function MyClaimItem({ claim, formatDate, index }) {
  const statusConfig = {
    approved: { dot: "bg-emerald-500", badge: "bg-emerald-50 border-emerald-100 text-emerald-700", label: "Approved" },
    rejected: { dot: "bg-red-500", badge: "bg-red-50 border-red-100 text-red-700", label: "Rejected" },
    pending: { dot: "bg-amber-400", badge: "bg-amber-50 border-amber-100 text-amber-700", label: "Pending" },
  };
  const s = statusConfig[claim.status] || statusConfig.pending;

  return (
    <div
      className="claim-row"
      style={{ animation: `fadeUp 0.4s ease ${index * 55}ms both` }}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-semibold text-[#0f0f0f] truncate"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {claim.item?.itemName || claim.itemName || "Unnamed Item"}
          </p>
          <p className="text-[12px] text-black/40 mt-0.5">
            Found by{" "}
            <span className="font-semibold text-black/65">
              {claim.item?.reportedBy?.name || claim.owner?.name || "Unknown"}
            </span>
          </p>
        </div>
        <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold border ${s.badge}`}>
          {s.label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {claim.matchScore != null && (
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border
              ${claim.matchScore >= 85
                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                : claim.matchScore >= 60
                  ? "bg-amber-50 border-amber-100 text-amber-700"
                  : "bg-red-50 border-red-100 text-red-700"
              }`}>
              {claim.matchScore}% match
            </span>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-2.5 h-2.5 text-black/25" />
            <span className="text-[11.5px] text-black/35">
              {formatDate(claim.createdAt || claim.date)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          <span className="text-[11.5px] text-black/38 capitalize font-medium">{claim.status}</span>
        </div>
      </div>
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-black/[0.06] rounded-lg ${className}`} />;
}

// ── Full page loader ──────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-sm text-black/40 font-medium">Loading your profile…</p>
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-[#0f0f0f] mb-1">Something went wrong</p>
          <p className="text-sm text-black/40">{message || "Failed to load profile data."}</p>
        </div>
        {onRetry && (
          <button onClick={onRetry}
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold
              hover:bg-red-700 transition-colors">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main profile page ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  // ── Tab state for the top right card ──
  const [activeTab, setActiveTab] = useState("reports"); // "reports" | "claims"

  const {
    data: meData,
    isLoading: meLoading,
    isError: meError,
    refetch: refetchMe,
  } = useGetMeQuery();

  const {
    data: itemsData,
    isLoading: itemsLoading,
    isError: itemsError,
    refetch: refetchItems,
  } = useGetMyItemsQuery();

  const {
    data: claimsData,
    isLoading: claimsLoading,
  } = useGetMyClaimsQuery();

  const {
    data: myClaimsData,
    isLoading: myClaimsLoading,
  } = useGetClaimsMadeQuery();

  const [approveClaim] = useApproveClaimMutation();
  const [rejectClaim] = useRejectClaimMutation();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  useEffect(() => {
    if (!meLoading && meError) router.replace("/login");
  }, [meLoading, meError, router]);

  const [profile, setProfile] = useState({
    name: "", email: "", phone: "", location: "", joinedDate: "",
    bio: "Campus community member. Always happy to help reunite people with their belongings.",
  });

  useEffect(() => {
    if (meData?.user) {
      const u = meData.user;
      setProfile((prev) => ({
        ...prev,
        name: u.name || u.username || "",
        email: u.email || "",
        phone: u.phone || u.phoneNumber || "",
        location: u.location || u.city || "Mumbai, Maharashtra",
        joinedDate: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
          : "Recently",
        bio: u.bio || prev.bio,
      }));
    }
  }, [meData]);

  const updateField = (key) => (val) => setProfile((p) => ({ ...p, [key]: val }));

  const [avatarHover, setAvatarHover] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const fileRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) { }

    dispatch(apiSlice.util.resetApiState()); // 💥 THIS IS THE MAGIC LINE
    router.replace("/login");
  };

  const handleApprove = async (id) => {
    try { await approveClaim(id).unwrap(); } catch (err) { console.error(err); }
  };

  const handleReject = async (id) => {
    try { await rejectClaim(id).unwrap(); } catch (err) { console.error(err); }
  };

  const myItems = itemsData?.data || [];
  const lostCount = myItems.filter((i) => i.status === "lost").length;
  const foundCount = myItems.filter((i) => i.status === "found").length;
  const incomingClaims = claimsData?.data || [];
  const myClaims = myClaimsData?.data || [];

  const stats = [
    { label: "Reported Lost", val: lostCount, icon: Package, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { label: "Items Found", val: foundCount, icon: Search, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Total Reports", val: myItems.length, icon: Star, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  ];

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  if (meLoading) return <PageLoader />;
  if (meError) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .pf-root { font-family: 'DM Sans', sans-serif; color: #0f0f0f; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(220,38,38,0); }
        }

        .anim-fadeup { animation: fadeUp 0.45s ease both; }
        .anim-scale  { animation: scaleIn 0.4s ease both; }

        .shimmer-name {
          background: linear-gradient(90deg, #0f0f0f 0%, #dc2626 45%, #0f0f0f 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .avatar-pulse { animation: pulseRing 3s ease-in-out infinite; }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 26px 26px;
        }

        .pf-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.072);
          border-radius: 20px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          transition: box-shadow 0.2s;
          overflow: hidden;
        }
        .pf-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }

        .pf-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 0;
        }

        /* ── Tab strip ── */
        .tab-strip {
          display: flex;
          gap: 0;
          padding: 0 24px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          margin-top: 16px;
        }
        .tab-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 4px 11px;
          margin-right: 24px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(0,0,0,0.35);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.18s;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn:hover { color: rgba(0,0,0,0.65); }
        .tab-btn.active { color: #dc2626; }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 2px;
          background: #dc2626;
          border-radius: 2px 2px 0 0;
        }
        .tab-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 99px;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
        }
        .tab-badge-red     { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .tab-badge-neutral { background: rgba(0,0,0,0.05); color: rgba(0,0,0,0.4); border: 1px solid rgba(0,0,0,0.08); }

        /* Claim row inside the card */
        .claim-row {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.045);
          transition: background 0.15s;
        }
        .claim-row:last-child { border-bottom: none; }
        .claim-row:hover { background: rgba(0,0,0,0.012); }

        .stat-card {
          background: #fff;
          border-radius: 18px;
          padding: 18px 14px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }

        .activity-row {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: background 0.15s;
        }
        .activity-row:last-child { border-bottom: none; }
        .activity-row:hover { background: rgba(0,0,0,0.015); }

        .quick-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }

        .ef-row {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .ef-row:last-child { border-bottom: none; }
        .ef-icon { color: rgba(0,0,0,0.22); flex-shrink: 0; }
        .ef-label { font-size: 10.5px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(0,0,0,0.3); margin-bottom: 1px; }
        .ef-value {
          font-size: 13.5px; font-weight: 400; color: #0f0f0f; background: transparent;
          border: none; outline: none; width: 100%; padding: 0;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s;
        }
        .ef-value::placeholder { color: rgba(0,0,0,0.25); }
        .ef-value:focus { color: #dc2626; }

        .items-scroll { max-height: 360px; overflow-y: auto; }
        .items-scroll::-webkit-scrollbar { width: 4px; }
        .items-scroll::-webkit-scrollbar-track { background: transparent; }
        .items-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 4px; }

        .claims-scroll { max-height: 420px; overflow-y: auto; }
        .claims-scroll::-webkit-scrollbar { width: 4px; }
        .claims-scroll::-webkit-scrollbar-track { background: transparent; }
        .claims-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 4px; }

        @media (max-width: 640px) {
          .pf-card-header { padding: 16px 18px 0; }
          .tab-strip { padding: 0 18px; }
          .activity-row { padding: 12px 18px; gap: 12px; }
          .claim-row { padding: 14px 18px; }
        }
      `}</style>

      <div className="pf-root min-h-screen bg-[#f8f8f8]">

        {/* ══════════ HERO BANNER ══════════ */}
        <div className="relative h-44 sm:h-52 overflow-hidden bg-white">
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #fff5f5 0%, #ffffff 45%, #f0fdf4 100%)" }} />
          <div className="absolute inset-0 dot-grid opacity-50" />
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }} />
          <div className="absolute -top-8 right-0 w-[500px] h-64 opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse 80% 60% at 100% 0%, #dc2626 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.2), transparent)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-5 sm:pt-6 flex items-center justify-between">
            <Link href="/browse-items"
              className="flex items-center gap-1.5 text-[12px] font-semibold text-black/38
                hover:text-red-600 transition-colors no-underline group">
              <ChevronRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:block">Back to Board</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                  bg-white/80 border border-black/8 backdrop-blur-sm
                  text-[12px] font-semibold text-gray-700 hover:text-red-600
                  hover:border-red-200 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed">
                {loggingOut ? <Loader2 className="w-3 h-3 animate-spin" /> : <LogOut className="w-3 h-3" />}
                <span className="hidden sm:block">{loggingOut ? "Signing out…" : "Sign out"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════ AVATAR + NAME ══════════ */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="-mt-14 sm:-mt-16 mb-8 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 anim-scale">
            <div
              className="relative shrink-0 cursor-pointer self-start"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              onClick={() => fileRef.current?.click()}
            >
              <div className="avatar-pulse w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] sm:rounded-[22px]
                border-[3px] border-white shadow-[0_8px_32px_rgba(0,0,0,0.14)] overflow-hidden relative bg-white">
                {avatarSrc || meData?.user?.avatar || meData?.user?.profilePic ? (
                  <img src={avatarSrc || meData?.user?.avatar || meData?.user?.profilePic}
                    alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
                    <span className="text-[28px] sm:text-[32px] font-extrabold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {initials}
                    </span>
                  </div>
                )}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center
                  rounded-[17px] transition-opacity duration-200 ${avatarHover ? "opacity-100" : "opacity-0"}`}>
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
              <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 pb-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {meLoading ? <Skeleton className="h-9 w-48" /> : (
                  <h1 className="shimmer-name text-[clamp(24px,3.5vw,38px)] font-extrabold leading-none tracking-[-0.035em]"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {profile.name}
                  </h1>
                )}
              </div>
              <p className="text-[13px] sm:text-[14px] text-black/45 font-light leading-relaxed max-w-md mt-1.5 mb-3">
                {profile.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                <div className="flex items-center gap-1.5 text-[12px] text-black/45">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{profile.location || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-black/45">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>Joined {profile.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ MAIN GRID ══════════ */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-1 flex flex-col gap-5">

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 anim-fadeup" style={{ animationDelay: "80ms" }}>
                {stats.map(({ label, val, icon: Icon, color, bg, border }, i) => (
                  <div key={label} className="stat-card" style={{ animationDelay: `${120 + i * 50}ms` }}>
                    <div className={`w-9 h-9 rounded-[12px] ${bg} border ${border} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    {itemsLoading ? <Skeleton className="h-8 w-8" /> : (
                      <span className={`text-[26px] font-extrabold leading-none ${color}`}
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        <CountUp target={val} duration={900 + i * 120} />
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-black/28 uppercase tracking-[0.09em] text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Profile info */}
              <div className="pf-card anim-fadeup" style={{ animationDelay: "160ms" }}>
                <div className="pf-card-header">
                  <div>
                    <h3 className="text-[13.5px] font-bold text-[#0f0f0f] tracking-[-0.01em]"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      Profile Info
                    </h3>
                    <p className="text-[11px] text-black/30 mt-0.5">Click any field to edit</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-black/[0.03] border border-black/6 flex items-center justify-center">
                    <Edit3 className="w-3 h-3 text-black/30" />
                  </div>
                </div>
                <div className="px-5 py-3">
                  <EditableField label="Full Name" value={profile.name} onChange={updateField("name")} icon={Shield} />
                  <EditableField label="Email" value={profile.email} type="email" onChange={updateField("email")} icon={Mail} />
                  <EditableField label="Phone" value={profile.phone} type="tel" onChange={updateField("phone")} icon={Phone} />
                  <EditableField label="Location" value={profile.location} onChange={updateField("location")} icon={MapPin} />
                </div>
              </div>

              {/* ══ INCOMING CLAIMS — moved to left column ══ */}
              <div className="pf-card anim-fadeup" style={{ animationDelay: "220ms" }}>
                <div className="pf-card-header" style={{ paddingBottom: "20px" }}>
                  <div>
                    <div className="flex items-center gap-2.5 mb-0.5">
                      <h3 className="text-[13.5px] font-bold text-[#0f0f0f] tracking-[-0.01em]"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Incoming Claims
                      </h3>
                      {!claimsLoading && incomingClaims.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600
                          text-[10.5px] font-bold border border-red-100">
                          {incomingClaims.length} pending
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-black/30 mt-0.5">
                      Review ownership claims on your found items
                    </p>
                  </div>
                </div>

                {claimsLoading && (
                  <div className="px-5 py-4 flex flex-col gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex flex-col gap-3 p-3 rounded-2xl bg-black/[0.02]">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-3 w-28" />
                        <div className="flex justify-end gap-2 mt-1">
                          <Skeleton className="h-7 w-14 rounded-lg" />
                          <Skeleton className="h-7 w-16 rounded-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!claimsLoading && incomingClaims.length === 0 && (
                  <div className="px-5 py-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-black/[0.03] border border-black/6 flex items-center justify-center">
                      <CheckCircle2 className="w-4.5 h-4.5 text-black/18" />
                    </div>
                    <p className="text-[12.5px] text-black/32 text-center font-medium">
                      No pending claims right now
                    </p>
                    <p className="text-[11px] text-black/22 text-center max-w-[200px] leading-relaxed">
                      Claims on items you found will appear here.
                    </p>
                  </div>
                )}

                {!claimsLoading && incomingClaims.length > 0 && (
                  <div className="claims-scroll">
                    {incomingClaims.map((claim, i) => (
                      <div
                        key={claim._id}
                        className="claim-row"
                        style={{ animation: `fadeUp 0.4s ease ${i * 55}ms both` }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-[#0f0f0f] truncate"
                              style={{ fontFamily: "'Syne', sans-serif" }}>
                              {claim.item?.itemName || "Unnamed Item"}
                            </p>
                            <p className="text-[11.5px] text-black/40 mt-0.5">
                              Claimed by{" "}
                              <span className="font-semibold text-black/65">
                                {claim.claimant?.name || "Unknown"}
                              </span>
                            </p>
                          </div>
                          <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10.5px] font-bold border
                            ${claim.matchScore >= 85
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                              : claim.matchScore >= 60
                                ? "bg-amber-50 border-amber-100 text-amber-700"
                                : "bg-red-50 border-red-100 text-red-700"
                            }`}>
                            {claim.matchScore}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${claim.status === "approved" ? "bg-emerald-500" :
                              claim.status === "rejected" ? "bg-red-500" : "bg-amber-400"
                              }`} />
                            <span className="text-[11px] text-black/38 capitalize font-medium">
                              {claim.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleReject(claim._id)}
                              className="px-3 py-1.5 rounded-lg text-[11.5px] font-semibold
                                bg-white hover:bg-red-50 text-black/42 hover:text-red-600
                                border border-black/8 hover:border-red-200
                                transition-all duration-150 cursor-pointer">
                              Reject
                            </button>
                            <button
                              onClick={() => handleApprove(claim._id)}
                              className="px-3 py-1.5 rounded-lg text-[11.5px] font-semibold
                                bg-emerald-600 hover:bg-emerald-700 text-white
                                shadow-[0_2px_8px_rgba(5,150,105,0.22)]
                                hover:shadow-[0_4px_14px_rgba(5,150,105,0.3)]
                                hover:-translate-y-px
                                transition-all duration-150 cursor-pointer border-none">
                              Approve
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* ══ END INCOMING CLAIMS ══ */}

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* ══ My Reports / My Claims — tabbed card ══ */}
              <div className="pf-card anim-fadeup" style={{ animationDelay: "120ms" }}>

                {/* Card top: title row */}
                <div className="pf-card-header">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0f0f0f] tracking-[-0.015em]"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {activeTab === "reports" ? "My Reports" : "My Claims"}
                    </h3>
                    <p className="text-[11.5px] text-black/32 mt-0.5">
                      {activeTab === "reports"
                        ? (itemsLoading ? "Loading…" : `${myItems.length} item${myItems.length !== 1 ? "s" : ""} reported`)
                        : (myClaimsLoading ? "Loading…" : `${myClaims.length} claim${myClaims.length !== 1 ? "s" : ""} submitted`)}
                    </p>
                  </div>
                  {activeTab === "reports" && (
                    <Link href="/browse-items"
                      className="flex items-center gap-1 text-[12px] font-semibold text-red-600
                        hover:text-red-700 transition-colors no-underline">
                      View all <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>

                {/* Tab strip */}
                <div className="tab-strip">
                  <button
                    className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
                    onClick={() => setActiveTab("reports")}
                  >
                    <Package className="w-3.5 h-3.5" />
                    My Reports
                    {!itemsLoading && myItems.length > 0 && (
                      <span className={`tab-badge ${activeTab === "reports" ? "tab-badge-red" : "tab-badge-neutral"}`}>
                        {myItems.length}
                      </span>
                    )}
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "claims" ? "active" : ""}`}
                    onClick={() => setActiveTab("claims")}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    My Claims
                    {!myClaimsLoading && myClaims.length > 0 && (
                      <span className={`tab-badge ${activeTab === "claims" ? "tab-badge-red" : "tab-badge-neutral"}`}>
                        {myClaims.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* ── TAB: My Reports ── */}
                {activeTab === "reports" && (
                  <>
                    {itemsLoading && (
                      <div className="px-6 py-5 flex flex-col gap-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <Skeleton className="w-11 h-11 rounded-xl" />
                            <div className="flex-1 flex flex-col gap-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-1/2" />
                            </div>
                            <Skeleton className="h-6 w-14 rounded-full" />
                          </div>
                        ))}
                      </div>
                    )}

                    {itemsError && !itemsLoading && (
                      <div className="px-6 py-10 flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <p className="text-[13px] text-black/40 text-center">
                          Failed to load your items.{" "}
                          <button onClick={refetchItems} className="text-red-600 font-semibold hover:underline">Retry</button>
                        </p>
                      </div>
                    )}

                    {!itemsLoading && !itemsError && myItems.length === 0 && (
                      <div className="px-6 py-12 flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-black/[0.03] border border-black/6 flex items-center justify-center">
                          <Package className="w-5 h-5 text-black/18" />
                        </div>
                        <p className="text-[13px] text-black/32 text-center font-medium">
                          You haven't reported any items yet.
                        </p>
                        <Link href="/report-lost" className="text-[12px] font-semibold text-red-600 hover:text-red-700 no-underline mt-1">
                          + Report your first item
                        </Link>
                      </div>
                    )}

                    {!itemsLoading && !itemsError && myItems.length > 0 && (
                      <div className="items-scroll">
                        {myItems.map((item, i) => (
                          <ActivityItem key={item._id || i} item={item} formatDate={formatDate} index={i} />
                        ))}
                      </div>
                    )}

                    <div className="px-5 sm:px-6 py-4 bg-black/[0.015] border-t border-black/5">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-[11.5px] text-black/45">{lostCount} lost</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[11.5px] text-black/45">{foundCount} found</span>
                          </div>
                        </div>
                        <Link href="/report-lost"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                            bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold
                            shadow-[0_2px_10px_rgba(220,38,38,0.2)]
                            hover:shadow-[0_4px_16px_rgba(220,38,38,0.28)]
                            hover:-translate-y-px transition-all duration-200 no-underline">
                          + New Report
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {/* ── TAB: My Claims ── */}
                {activeTab === "claims" && (
                  <>
                    {myClaimsLoading && (
                      <div className="px-6 py-5 flex flex-col gap-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-black/[0.02]">
                            <div className="flex items-center justify-between">
                              <Skeleton className="h-4 w-44" />
                              <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-3 w-32" />
                            <div className="flex items-center gap-3 mt-1">
                              <Skeleton className="h-6 w-20 rounded-full" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!myClaimsLoading && myClaims.length === 0 && (
                      <div className="px-6 py-12 flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-black/[0.03] border border-black/6 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-black/18" />
                        </div>
                        <p className="text-[13px] text-black/32 text-center font-medium">
                          You haven't submitted any claims yet.
                        </p>
                        <p className="text-[11.5px] text-black/22 text-center max-w-xs leading-relaxed">
                          Browse the found items board and claim anything that belongs to you.
                        </p>
                        <Link href="/browse-items"
                          className="text-[12px] font-semibold text-red-600 hover:text-red-700 no-underline mt-1">
                          Browse found items
                        </Link>
                      </div>
                    )}

                    {!myClaimsLoading && myClaims.length > 0 && (
                      <div className="claims-scroll">
                        {myClaims.map((claim, i) => (
                          <MyClaimItem key={claim._id || i} claim={claim} formatDate={formatDate} index={i} />
                        ))}
                      </div>
                    )}

                    <div className="px-5 sm:px-6 py-4 bg-black/[0.015] border-t border-black/5">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-4">
                          {!myClaimsLoading && (
                            <>
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                                <span className="text-[11.5px] text-black/45">
                                  {myClaims.filter(c => c.status === "pending").length} pending
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[11.5px] text-black/45">
                                  {myClaims.filter(c => c.status === "approved").length} approved
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <Link href="/browse-items"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                            bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold
                            shadow-[0_2px_10px_rgba(220,38,38,0.2)]
                            hover:shadow-[0_4px_16px_rgba(220,38,38,0.28)]
                            hover:-translate-y-px transition-all duration-200 no-underline">
                          Browse Items
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ══ QUICK ACTIONS — moved to right column bottom ══ */}
              <div className="pf-card anim-fadeup" style={{ animationDelay: "200ms" }}>
                <div className="pf-card-header" style={{ paddingBottom: "16px" }}>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0f0f0f] tracking-[-0.015em]"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      Quick Actions
                    </h3>
                    <p className="text-[11.5px] text-black/32 mt-0.5">Jump straight to what you need</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-5 pb-5">
                  {[
                    { label: "Report a Lost Item", href: "/report-lost", color: "text-red-600", hoverBg: "hover:bg-red-50 hover:border-red-200", icon: Package },
                    { label: "Report a Found Item", href: "/report-found", color: "text-emerald-600", hoverBg: "hover:bg-emerald-50 hover:border-emerald-200", icon: Search },
                    { label: "Browse Lost & Found", href: "/browse-items", color: "text-black/55", hoverBg: "hover:bg-black/[0.025] hover:border-black/12", icon: Star },
                  ].map(({ label, href, color, hoverBg, icon: Icon }) => (
                    <Link key={label} href={href} className={`quick-link ${hoverBg} group`}>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${color} opacity-70`} />
                        <span className={`text-[13px] font-semibold ${color}`}>{label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${color} opacity-40 group-hover:translate-x-0.5 transition-transform duration-150`} />
                    </Link>
                  ))}
                </div>
              </div>
              {/* ══ END QUICK ACTIONS ══ */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}