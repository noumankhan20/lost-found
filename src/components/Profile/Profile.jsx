"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  MapPin, Mail, Phone, Calendar, Edit3, Check, X,
  ArrowUpRight, LogOut, Shield, Bell, ChevronRight,
  Package, Search, Star, Clock
} from "lucide-react";
import Link from "next/link";

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
          <p className="text-[14px] text-[#0f0f0f] font-medium truncate">{value}</p>
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
function ActivityItem({ item, formatDate, index }) {
  const isLost = item.status === "lost";
  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-2xl
        hover:bg-black/[0.025] transition-all duration-200 cursor-default"
      style={{ animationDelay: `${300 + index * 70}ms`, animation: "fadeSlideUp 0.4s ease both" }}
    >
      {/* Thumbnail */}
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/5">
        <img
          src={`${item.image}?w=100&h=100&fit=crop`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className={`absolute top-1 left-1 w-2 h-2 rounded-full border border-white
          ${isLost ? "bg-red-500" : "bg-emerald-500"}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold text-[#0f0f0f] truncate leading-snug"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <MapPin className="w-2.5 h-2.5 text-black/30 shrink-0" />
          <span className="text-[11.5px] text-gray-700 truncate">{item.location}</span>
          <span className="text-black/15">·</span>
          <Clock className="w-2.5 h-2.5 text-black/30 shrink-0" />
          <span className="text-[11.5px] text-gray-700">{formatDate(item.date)}</span>
        </div>
      </div>

      {/* Badge + arrow */}
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

// ── Main profile page ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Akshat Gupta",
    email: "akshat.gupta@university.edu",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    joinedDate: "September 2024",
    avatar: null, // null = initials fallback
    bio: "Campus community member. Always happy to help reunite people with their belongings.",
  });

  const [avatarHover, setAvatarHover] = useState(false);
  const fileRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const updateField = (key) => (val) => setProfile((p) => ({ ...p, [key]: val }));

  const myItems = [
    { id: 1, name: "AirPods Pro", category: "Electronics", location: "Student Center", date: "2025-09-23", status: "found", image: "/air.jpg" },
    { id: 2, name: "Blue Hydroflask", category: "Personal Items", location: "Gym, Locker Room", date: "2025-09-21", status: "lost", image: "/bottle.webp" },
    { id: 3, name: "MacBook Pro", category: "Electronics", location: "Central Library", date: "2025-09-18", status: "lost", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { id: 4, name: "Student ID Card", category: "IDs & Documents", location: "Bus Stop", date: "2025-09-10", status: "found", image: "https://images.unsplash.com/photo-1608236415053-3691791bbffe" },
  ];

  const stats = [
    { label: "Reported Lost", val: 3, icon: Package, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { label: "Items Found", val: 4, icon: Search, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Matches Made", val: 2, icon: Star, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  ];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .pf-root { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.25); }
          50%       { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }

        .avatar-ring { animation: ringPulse 3s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #0f0f0f 0%, #dc2626 40%, #0f0f0f 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .card-enter { animation: fadeSlideUp 0.45s ease both; }
        .scale-enter { animation: scaleIn 0.5s ease both; }

        /* Dot grid texture */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      <div className="pf-root min-h-screen bg-[#fafafa]">

        {/* ── HERO BANNER ── */}
        <div className="relative h-48 overflow-hidden bg-white">
          {/* Base gradient */}
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #fff5f5 0%, #fff 40%, #f0fdf4 100%)"
            }} />
          {/* Dot grid */}
          <div className="absolute inset-0 dot-bg opacity-60" />
          {/* Red diagonal accent */}
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }} />
          <div className="absolute top-0 right-0 w-96 h-48 opacity-[0.06]"
            style={{ background: "radial-gradient(ellipse 80% 60% at 100% 0%, #dc2626 0%, transparent 70%)" }} />
          {/* Diagonal stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200/60 to-transparent" />

          {/* Top nav row */}
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 pt-6 flex items-center justify-between">
            <Link href="/lost-and-found"
              className="flex items-center gap-2 text-[12px] font-semibold text-black/38
                hover:text-red-600 transition-colors no-underline">
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              Back to Board
            </Link>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-xl bg-white/80 border border-black/8
                flex items-center justify-center text-black/35 hover:text-red-500
                hover:border-red-200 transition-all duration-200 backdrop-blur-sm">
                <Bell className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 rounded-xl bg-white/80 border border-black/8
                flex items-center justify-center text-black/35 hover:text-red-500
                hover:border-red-200 transition-all duration-200 backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                bg-white/80 border border-black/8 backdrop-blur-sm
                text-[12px] font-semibold text-gray-700 hover:text-red-600
                hover:border-red-200 transition-all duration-200">
                <LogOut className="w-3 h-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* ── AVATAR + NAME (overlaps hero) ── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="-mt-16 mb-8 flex flex-col sm:flex-row sm:items-end gap-5"
            style={{ animation: "scaleIn 0.5s ease both" }}>

            {/* Avatar */}
            <div
              className="relative shrink-0 cursor-pointer"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              onClick={() => fileRef.current?.click()}
            >
              <div className="avatar-ring w-28 h-28 rounded-[22px] bg-white
                border-[3px] border-white
                shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                overflow-hidden relative">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center
                    bg-gradient-to-br from-red-500 to-red-700">
                    <span className="text-[32px] font-extrabold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {initials}
                    </span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center
                  transition-opacity duration-200 ${avatarHover ? "opacity-100" : "opacity-0"}`}>
                  <Edit3 className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Online dot */}
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full
                bg-emerald-500 border-2 border-white shadow-sm" />
              <input ref={fileRef} type="file" accept="image/*"
                className="hidden" onChange={handleAvatarUpload} />
            </div>

            {/* Name block */}
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="shimmer-text text-[clamp(26px,4vw,36px)] font-extrabold leading-none tracking-[-0.03em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {profile.name}
                </h1>
              </div>
              <p className="text-[13.5px] text-gray-700 font-light leading-relaxed max-w-sm mt-2">
                {profile.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
                  <MapPin className="w-3 h-3" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
                  <Calendar className="w-3 h-3" />
                  Joined {profile.joinedDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-1 flex flex-col gap-6">

              {/* Stats */}
              <div className="card-enter" style={{ animationDelay: "100ms" }}>
                <div className="grid grid-cols-3 gap-3">
                  {stats.map(({ label, val, icon: Icon, color, bg, border }, i) => (
                    <div key={label}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl
                        bg-white border ${border}
                        shadow-[0_1px_4px_rgba(0,0,0,0.04)]
                        hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]
                        hover:-translate-y-0.5 transition-all duration-200`}
                      style={{ animationDelay: `${150 + i * 60}ms`, animation: "fadeSlideUp 0.4s ease both" }}
                    >
                      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <span className={`text-[24px] font-extrabold leading-none ${color}`}
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        <CountUp target={val} duration={1000 + i * 150} />
                      </span>
                      <span className="text-[10px] font-semibold text-black/30 uppercase tracking-[0.1em] text-center leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info card */}
              <div className="card-enter bg-white text-gray-700 border border-black/7 rounded-2xl p-5
                shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                style={{ animationDelay: "200ms" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[13px] font-bold text-[#0f0f0f] uppercase tracking-[0.1em]"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    Profile Info
                  </h3>
                  <span className="text-[10.5px] text-gray-700 font-medium">hover to edit</span>
                </div>
                <EditableField
                  label="Full Name" value={profile.name}
                  onChange={updateField("name")} icon={Shield}
                />
                <EditableField
                  label="Email" value={profile.email} type="email"
                  onChange={updateField("email")} icon={Mail}
                />
                <EditableField
                  label="Phone" value={profile.phone} type="tel"
                  onChange={updateField("phone")} icon={Phone}
                />
                <EditableField
                  label="Location" value={profile.location}
                  onChange={updateField("location")} icon={MapPin}
                />
              </div>

              {/* Quick actions */}
              <div className="card-enter flex flex-col gap-2" style={{ animationDelay: "280ms" }}>
                {[
                  { label: "Report a Lost Item", href: "/report-lost", color: "text-red-600", bg: "hover:bg-red-50 hover:border-red-200" },
                  { label: "Report a Found Item", href: "/report-found", color: "text-emerald-600", bg: "hover:bg-emerald-50 hover:border-emerald-200" },
                  { label: "Browse Lost & Found", href: "/lost-and-found", color: "text-black/60", bg: "hover:bg-black/[0.03] hover:border-black/14" },
                ].map(({ label, href, color, bg }) => (
                  <Link key={label} href={href}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl
                      bg-white border border-black/7
                      shadow-[0_1px_4px_rgba(0,0,0,0.03)]
                      ${bg} transition-all duration-200 no-underline group`}>
                    <span className={`text-[13px] font-semibold ${color}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {label}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${color} opacity-50
                      group-hover:translate-x-0.5 transition-transform duration-150`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Activity feed */}
              <div className="card-enter bg-white border border-black/7 rounded-2xl
                shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden"
                style={{ animationDelay: "160ms" }}>

                {/* Card header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0f0f0f]"
                      style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
                      My Reports
                    </h3>
                    <p className="text-[12px] text-black/35 mt-0.5">
                      {myItems.length} items you've reported
                    </p>
                  </div>
                  <Link href="/lost-and-found"
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-red-600
                      hover:text-red-700 transition-colors no-underline">
                    View all <ArrowUpRight size={13} />
                  </Link>
                </div>

                {/* Items */}
                <div className="divide-y divide-black/[0.04] px-2">
                  {myItems.map((item, i) => (
                    <ActivityItem key={item.id} item={item} formatDate={formatDate} index={i} />
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-black/[0.015] border-t border-black/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[11.5px] text-gray-700">
                          {myItems.filter(i => i.status === "lost").length} lost
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[11.5px] text-gray-700">
                          {myItems.filter(i => i.status === "found").length} found
                        </span>
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
              </div>

              {/* Match suggestions */}
              <div className="card-enter bg-white border border-black/7 rounded-2xl
                shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden"
                style={{ animationDelay: "240ms" }}>
                <div className="px-6 py-5 border-b border-black/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <h3 className="text-[15px] font-bold text-[#0f0f0f]"
                      style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
                      Possible Matches
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600
                      text-[11px] font-bold border border-amber-100">
                      2 new
                    </span>
                  </div>
                  <p className="text-[12px] text-black/35">
                    Items that might match what you've reported
                  </p>
                </div>

                {[
                  {
                    id: "m1",
                    name: "AirPods Found – Student Center",
                    match: "94% match",
                    location: "Student Center Cafeteria",
                    date: "Sep 23, 2025",
                    image: "/air.jpg",
                    matchColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
                  },
                  {
                    id: "m2",
                    name: "MacBook – Library Lost Property",
                    match: "81% match",
                    location: "Central Library, 3rd floor",
                    date: "Sep 22, 2025",
                    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                    matchColor: "text-amber-600 bg-amber-50 border-amber-100",
                  },
                ].map((m, i) => (
                  <div key={m.id}
                    className="flex items-center gap-4 px-6 py-4
                      hover:bg-black/[0.02] transition-colors duration-150
                      border-b border-black/[0.04] last:border-0 group cursor-default"
                    style={{ animationDelay: `${380 + i * 80}ms`, animation: "fadeSlideUp 0.4s ease both" }}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/5">
                      <img src={`${m.image}?w=100&h=100&fit=crop`} alt={m.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-semibold text-[#0f0f0f] truncate"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {m.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-black/25 shrink-0" />
                        <span className="text-[11.5px] text-gray-700 truncate">{m.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${m.matchColor}`}>
                        {m.match}
                      </span>
                      <button className="text-[11px] font-semibold text-red-600 hover:text-red-700
                        transition-colors flex items-center gap-1">
                        Contact <ArrowUpRight size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}