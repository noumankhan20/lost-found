"use client"
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, ArrowLeft, User, Mail, ChevronLeft, ChevronRight, ZoomIn, X, ImageOff } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetAllLostItemsQuery } from "@/redux/slices/lostItemApiSlice";

export default function LostItemDetailPage() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetAllLostItemsQuery();

    const [item, setItem] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        if (data?.data) {
            const found = data.data.find((i) => i._id === id);
            if (found) setItem(found);
        }
    }, [data, id]);

    const formatDate = (d) =>
        new Date(d).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });

    const formatTime = (d) =>
        new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const formatJoined = (d) =>
        new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const images =
        item?.images?.length > 0
            ? item.images.map(
                (img) => `http://localhost:5000/${img.replace(/\\/g, "/")}`
            )
            : null;

    const prevImage = () =>
        setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1));
    const nextImage = () =>
        setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1));

    // Keyboard nav for lightbox
    useEffect(() => {
        if (!lightboxOpen) return;
        const handler = (e) => {
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "Escape") setLightboxOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxOpen, activeImage]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-9 h-9 border-[2.5px] border-black/8 border-t-red-600 rounded-full animate-spin" />
                    <p
                        className="text-[12px] text-black/30 font-medium tracking-[0.14em] uppercase"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Loading…
                    </p>
                </div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa] gap-4">
                <p
                    className="text-[22px] font-extrabold text-[#0f0f0f]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Item not found
                </p>
                <Link
                    href="/browse-items"
                    className="text-[13px] text-red-600 font-semibold hover:underline"
                >
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
        .fade-in { animation: fadeIn 0.4s ease both; }
        .fade-in-fast { animation: fadeInFast 0.25s ease both; }
        .thumbnail-active { border-color: rgb(220 38 38) !important; }
      `}</style>

            {/* Lightbox */}
            {lightboxOpen && images && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
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
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                  flex items-center justify-center text-white transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                  flex items-center justify-center text-white transition-colors"
                            >
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
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === activeImage ? "bg-white scale-125" : "bg-white/40"
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
                        <Link
                            href="/browse-items"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/40
                hover:text-red-600 transition-colors no-underline group"
                        >
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

                            {/* Main image */}
                            <div className="relative rounded-2xl overflow-hidden bg-[#f0f0f0] aspect-[4/3] group">
                                {images ? (
                                    <>
                                        <img
                                            key={activeImage}
                                            src={images[activeImage]}
                                            alt={item.itemName}
                                            className="w-full h-full object-cover fade-in-fast"
                                        />
                                        {/* Zoom button */}
                                        <button
                                            onClick={() => setLightboxOpen(true)}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md
                        flex items-center justify-center text-white opacity-0 group-hover:opacity-100
                        transition-opacity hover:bg-black/60"
                                        >
                                            <ZoomIn size={14} />
                                        </button>

                                        {/* Image counter */}
                                        {images.length > 1 && (
                                            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md
                        text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                                {activeImage + 1} / {images.length}
                                            </div>
                                        )}

                                        {/* Prev / Next arrows */}
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                            bg-black/40 backdrop-blur-md flex items-center justify-center text-white
                            opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                            bg-black/40 backdrop-blur-md flex items-center justify-center text-white
                            opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </>
                                        )}

                                        {/* Status badge */}
                                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
                      text-[10.5px] font-bold uppercase tracking-[0.08em] backdrop-blur-md
                      bg-red-600/90 text-white">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-200" />
                                            Lost
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
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200
                        ${i === activeImage
                                                    ? "border-red-500 shadow-[0_0_0_2px_rgba(220,38,38,0.15)]"
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

                            {/* Title + meta */}
                            <div>
                                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-red-600 mb-2">
                                    Lost Item
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

                            {/* Divider */}
                            <div className="h-px bg-black/6" />

                            {/* Info cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    {
                                        icon: <MapPin className="w-4 h-4 text-red-500" />,
                                        label: "Location",
                                        value: item.location,
                                    },
                                    {
                                        icon: <Calendar className="w-4 h-4 text-red-500" />,
                                        label: "Lost On",
                                        value: formatDate(item.dateTime),
                                    },
                                    {
                                        icon: <Clock className="w-4 h-4 text-red-500" />,
                                        label: "Time",
                                        value: formatTime(item.dateTime),
                                    },
                                    {
                                        icon: <Calendar className="w-4 h-4 text-red-500" />,
                                        label: "Reported On",
                                        value: formatDate(item.createdAt),
                                    },
                                ].map(({ icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/7
                      shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
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

                            {/* Divider */}
                            <div className="h-px bg-black/6" />

                            {/* Reporter card */}
                            <div>
                                <p className="text-[10.5px] font-semibold text-gray-700 uppercase tracking-[0.14em] mb-3">
                                    Reported By
                                </p>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/7
                  shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                    <div
                                        className="w-11 h-11 rounded-full bg-red-50 border border-red-100 shrink-0
                      flex items-center justify-center text-red-600 text-[16px] font-bold"
                                        style={{ fontFamily: "'Syne', sans-serif" }}
                                    >
                                        {item.user?.name?.[0] ?? "?"}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="text-[15px] font-bold text-[#0f0f0f] break-words"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
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

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-1"
                                onClick={!item.user?.email ? (e) => e.preventDefault() : undefined}
                            >

                                <button
                                    onClick={() => {
                                        const email = item.user?.email ?? '';
                                        const subject = encodeURIComponent(`Regarding your lost item: ${item.itemName}`);
                                        if (!email) return;
                                        window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`, '_blank');
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
    bg-red-600 hover:bg-red-700 text-white text-[14px] font-semibold
    shadow-[0_2px_12px_rgba(220,38,38,0.22)] hover:shadow-[0_4px_18px_rgba(220,38,38,0.3)]
    hover:-translate-y-px transition-all duration-200 cursor-pointer border-0"
                                >
                                    <Mail size={15} />
                                    Contact Reporter
                                </button>
                                <Link
                                    href="/browse-items"
                                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                    bg-black/[0.04] hover:bg-black/[0.07] text-[#0f0f0f] text-[14px] font-semibold
                    transition-all duration-200 no-underline"
                                >
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