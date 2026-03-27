"use client"
import React, { useState, useEffect } from "react";
import {
  MapPin, Calendar, Clock, ArrowLeft, Mail,
  ChevronLeft, ChevronRight, ZoomIn, X,
  ImageOff, CheckCircle2, Package, FileText,
  Navigation, User, Send, Loader2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetAllFoundItemsQuery } from "@/redux/slices/foundItemApiSlice";

// ── Claim Modal ───────────────────────────────────────────────────────────────
function ClaimModal({ item, onClose }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    claimerName: "",
    claimerEmail: "",
    itemName: "",
    description: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    additionalNote: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.claimerName.trim()) e.claimerName = "Your name is required";
    if (!form.claimerEmail.trim()) e.claimerEmail = "Your email is required";
    else if (!/\S+@\S+\.\S+/.test(form.claimerEmail)) e.claimerEmail = "Enter a valid email";
    if (!form.itemName.trim()) e.itemName = "Item name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.lastSeenLocation.trim()) e.lastSeenLocation = "Last seen location is required";
    if (!form.lastSeenDate) e.lastSeenDate = "Last seen date is required";
    return e;
  };

  const handleChange = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setIsSubmitting(true);
    // TODO: wire up your API call here
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setStep(2);
  };

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const inputBase = `w-full px-4 py-3 rounded-xl bg-black/[0.03] border text-[13.5px] text-[#0f0f0f]
    outline-none transition-all duration-200 hover:border-black/14 placeholder:text-black/25`;
  const inputNormal = `${inputBase} border-black/8 focus:border-red-400/60 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.07)]`;
  const inputError  = `${inputBase} border-red-400 bg-red-50/40 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeInFast 0.2s ease both" }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.18)]
          overflow-hidden flex flex-col max-h-[92vh]"
        style={{ animation: "modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {/* Header */}
        <div className="relative px-7 pt-7 pb-5 border-b border-black/6 shrink-0">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100
                  flex items-center justify-center">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-emerald-600">
                  Claim Request
                </p>
              </div>
              <h2
                className="text-[20px] font-extrabold text-[#0f0f0f] tracking-tight leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Is this your item?
              </h2>
              <p className="text-[12.5px] text-black/40 mt-1 font-light">
                Fill in the details below to verify your ownership.
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.09]
                flex items-center justify-center text-black/40 hover:text-black/70 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Step indicator */}
          {step === 1 && (
            <div className="flex items-center gap-2 mt-5">
              <div className="flex-1 h-1 rounded-full bg-emerald-500" />
              <div className="flex-1 h-1 rounded-full bg-black/8" />
            </div>
          )}
        </div>

        {/* ── STEP 1: FORM ── */}
        {step === 1 && (
          <>
            <div className="overflow-y-auto flex-1 px-7 py-6 space-y-4">

              {/* Found item reference */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] text-emerald-700 font-semibold uppercase tracking-[0.1em]">Claiming</p>
                  <p className="text-[13px] font-bold text-[#0f0f0f]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {item?.itemName}
                  </p>
                </div>
              </div>

              {/* Section: Your info */}
              <div>
                <p className="text-[10.5px] font-semibold text-gray-700 uppercase tracking-[0.14em] mb-2.5">
                  Your Information
                </p>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.claimerName}
                      onChange={(e) => handleChange("claimerName", e.target.value)}
                      className={errors.claimerName ? inputError : inputNormal}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    {errors.claimerName && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.claimerName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={form.claimerEmail}
                      onChange={(e) => handleChange("claimerEmail", e.target.value)}
                      className={errors.claimerEmail ? inputError : inputNormal}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    {errors.claimerEmail && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.claimerEmail}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Item details */}
              <div>
                <p className="text-[10.5px] font-semibold text-gray-700 uppercase tracking-[0.14em] mb-2.5">
                  Prove Ownership
                </p>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Name of the item you lost"
                      value={form.itemName}
                      onChange={(e) => handleChange("itemName", e.target.value)}
                      className={errors.itemName ? inputError : inputNormal}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    {errors.itemName && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.itemName}</p>
                    )}
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Describe your item — color, brand, distinguishing features…"
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      className={`${errors.description ? inputError : inputNormal} resize-none`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    {errors.description && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.description}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Where did you last have it? (e.g. Library, 2nd floor)"
                      value={form.lastSeenLocation}
                      onChange={(e) => handleChange("lastSeenLocation", e.target.value)}
                      className={errors.lastSeenLocation ? inputError : inputNormal}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    {errors.lastSeenLocation && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.lastSeenLocation}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-700 font-medium mb-1.5 ml-1">
                      When did you last have it?
                    </label>
                    <input
                      type="date"
                      value={form.lastSeenDate}
                      onChange={(e) => handleChange("lastSeenDate", e.target.value)}
                      style={{ colorScheme: "light", fontFamily: "'DM Sans', sans-serif" }}
                      className={errors.lastSeenDate ? inputError : inputNormal}
                    />
                    {errors.lastSeenDate && (
                      <p className="text-[11px] text-red-500 mt-1 ml-1">{errors.lastSeenDate}</p>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Any additional notes for the finder? (optional)"
                    value={form.additionalNote}
                    onChange={(e) => handleChange("additionalNote", e.target.value)}
                    className={`${inputNormal} resize-none`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-7 py-5 border-t border-black/6 bg-[#fafafa] shrink-0">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-black/[0.04] hover:bg-black/[0.07]
                    text-[13.5px] font-semibold text-black/50 hover:text-black/70 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] flex items-center justify-center gap-2.5 py-3 rounded-xl
                    bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed
                    text-white text-[13.5px] font-semibold
                    shadow-[0_2px_12px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_18px_rgba(16,185,129,0.32)]
                    hover:-translate-y-px disabled:translate-y-0 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting…</>
                  ) : (
                    <><Send size={14} /> Submit Claim</>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-black/28 text-center mt-3 font-light">
                False claims may result in account suspension.
              </p>
            </div>
          </>
        )}

        {/* ── STEP 2: SUCCESS ── */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center px-8 py-14 text-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100
                flex items-center justify-center"
                style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                <CheckCircle2 className="w-9 h-9 text-emerald-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500
                flex items-center justify-center"
                style={{ animation: "popIn 0.5s 0.15s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                <span className="text-white text-[10px] font-bold">✓</span>
              </div>
            </div>

            <div>
              <h3
                className="text-[22px] font-extrabold text-[#0f0f0f] tracking-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Claim Submitted!
              </h3>
              <p className="text-[13.5px] font-light text-black/45 leading-relaxed max-w-xs">
                Your claim request has been sent to the finder. They'll reach out to you at{" "}
                <span className="font-semibold text-[#0f0f0f]">{form.claimerEmail}</span>.
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-left">
              <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-[0.1em] mb-2">
                What happens next?
              </p>
              {[
                "The finder reviews your claim details",
                "They verify ownership & contact you",
                "Arrange a safe handoff location",
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-emerald-700">{i + 1}</span>
                  </div>
                  <p className="text-[12.5px] text-black/60">{s}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-[#0f0f0f] hover:bg-black/80 text-white
                text-[14px] font-semibold transition-all duration-200 hover:-translate-y-px"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Detail Page ──────────────────────────────────────────────────────────
export default function FoundItemDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetAllFoundItemsQuery();

  const [item, setItem] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);

  useEffect(() => {
    if (data?.data) {
      const found = data.data.find((i) => i._id === id);
      if (found) setItem(found);
    }
  }, [data, id]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  const formatTime = (d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatJoined = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const images =
    item?.images?.length > 0
      ? item.images.map((img) => `http://localhost:5000/${img.replace(/\\/g, "/")}`)
      : null;

  const prevImage = () => setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1));
  const nextImage = () => setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1));

  useEffect(() => {
    if (!lightboxOpen) return;
    const h = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxOpen, activeImage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-9 h-9 border-[2.5px] border-black/8 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-[12px] text-black/30 font-medium tracking-[0.14em] uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Loading…
          </p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa] gap-4">
        <p className="text-[22px] font-extrabold text-[#0f0f0f]"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Item not found
        </p>
        <Link href="/browse-items"
          className="text-[13px] text-emerald-600 font-semibold hover:underline">
          ← Back to Lost &amp; Found
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .detail-root { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInFast {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fade-in { animation: fadeIn 0.4s ease both; }
        .fade-in-fast { animation: fadeInFast 0.25s ease both; }
      `}</style>

      {/* Claim Modal */}
      {claimOpen && <ClaimModal item={item} onClose={() => setClaimOpen(false)} />}

      {/* Lightbox */}
      {lightboxOpen && images && (
        <div
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                  flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                  flex items-center justify-center text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <img
            key={activeImage}
            src={images[activeImage]}
            alt={item.itemName}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl fade-in-fast"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === activeImage ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="detail-root min-h-screen bg-[#fafafa]">

        {/* ── BACK NAV ── */}
        <div className="bg-white border-b border-black/6">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4">
            <Link href="/lost-and-found"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/40
                hover:text-emerald-600 transition-colors no-underline group">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Lost &amp; Found
            </Link>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* ── LEFT: IMAGE GALLERY ── */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-[#f0f0f0] aspect-[4/3] group">
                {images ? (
                  <>
                    <img
                      key={activeImage}
                      src={images[activeImage]}
                      alt={item.itemName}
                      className="w-full h-full object-cover fade-in-fast"
                    />
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md
                        flex items-center justify-center text-white opacity-0 group-hover:opacity-100
                        transition-opacity hover:bg-black/60"
                    >
                      <ZoomIn size={14} />
                    </button>
                    {images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md
                        text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {activeImage + 1} / {images.length}
                      </div>
                    )}
                    {images.length > 1 && (
                      <>
                        <button onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                            bg-black/40 backdrop-blur-md flex items-center justify-center text-white
                            opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60">
                          <ChevronLeft size={16} />
                        </button>
                        <button onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                            bg-black/40 backdrop-blur-md flex items-center justify-center text-white
                            opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60">
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                    {/* Found badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
                      text-[10.5px] font-bold uppercase tracking-[0.08em] backdrop-blur-md
                      bg-emerald-600/90 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                      Found
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-black/20">
                    <ImageOff size={40} strokeWidth={1.2} />
                    <p className="text-[13px] font-medium">No images uploaded</p>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images && images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200
                        ${i === activeImage
                          ? "border-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.15)]"
                          : "border-black/8 hover:border-black/20"
                        }`}
                    >
                      <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: DETAILS ── */}
            <div className="flex flex-col gap-6">

              {/* Title */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-600 mb-2">
                  Found Item
                </p>
                <h1
                  className="text-[clamp(26px,4vw,38px)] font-extrabold text-[#0f0f0f] leading-tight tracking-[-0.03em] mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.itemName}
                </h1>
                <p className="text-[14px] font-light text-black/55 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="h-px bg-black/6" />

              {/* Info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <MapPin className="w-4 h-4 text-emerald-500" />, label: "Found At", value: item.location },
                  { icon: <Calendar className="w-4 h-4 text-emerald-500" />, label: "Date Found", value: formatDate(item.dateTime) },
                  { icon: <Clock className="w-4 h-4 text-emerald-500" />, label: "Time", value: formatTime(item.dateTime) },
                  { icon: <Calendar className="w-4 h-4 text-emerald-500" />, label: "Reported On", value: formatDate(item.createdAt) },
                ].map(({ icon, label, value }) => (
                  <div key={label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/7
                      shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100
                      flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-semibold text-black/30 uppercase tracking-[0.1em] mb-0.5">
                        {label}
                      </p>
                      <p className="text-[13.5px] font-semibold text-[#0f0f0f] leading-snug break-words"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-black/6" />

              {/* Reporter card */}
              <div>
                <p className="text-[10.5px] font-semibold text-gray-700 uppercase tracking-[0.14em] mb-3">
                  Found By
                </p>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/7
                  shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <div
                    className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 shrink-0
                      flex items-center justify-center text-emerald-600 text-[16px] font-bold"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.user?.name?.[0] ?? "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-[#0f0f0f] truncate"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {item.user?.name ?? "Unknown"}
                    </p>
                    <p className="text-[12.5px] text-black/40 truncate">{item.user?.email ?? "—"}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <p className="text-[10px] text-gray-700 uppercase tracking-[0.1em] font-semibold">
                      Member since
                    </p>
                    <p className="text-[12px] text-black/50 font-medium">
                      {formatJoined(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CTAs ── */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => setClaimOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                    bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold
                    shadow-[0_2px_12px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_18px_rgba(16,185,129,0.32)]
                    hover:-translate-y-px transition-all duration-200"
                >
                  <Package size={15} />
                  Claim This Item
                </button>
                <Link href="/browse-items"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                    bg-black/[0.04] hover:bg-black/[0.07] text-[#0f0f0f] text-[14px] font-semibold
                    transition-all duration-200 no-underline">
                  <ArrowLeft size={14} />
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}