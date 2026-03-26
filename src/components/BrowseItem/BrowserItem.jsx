"use client"
import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Clock, Plus, SlidersHorizontal, X, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetAllLostItemsQuery } from "@/redux/slices/lostItemApiSlice";


// ── Item Card ────────────────────────────────────────────────────────────────
function ItemCard({ item, formatDate, index }) {
  return (
    <div
      className="group flex flex-col bg-white border border-black/7 rounded-2xl overflow-hidden
        shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.03)]
        hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)]
        hover:border-black/11 hover:-translate-y-1
        transition-all duration-300 cursor-default"
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "fadeSlideUp 0.35s ease both",
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#f5f5f5] shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Status badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
          text-[10.5px] font-bold uppercase tracking-[0.08em] backdrop-blur-md
          ${item.status === "lost"
            ? "bg-red-600/90 text-white"
            : "bg-emerald-600/90 text-white"}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === "lost" ? "bg-red-200" : "bg-emerald-200"}`} />
          {item.status}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[15px] font-bold text-[#0f0f0f] mb-1.5 leading-snug line-clamp-1
            group-hover:text-red-600 transition-colors duration-200"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.01em' }}
        >
          {item.name}
        </h3>
        <p className="text-[12.5px] text-gray-900 mb-4 line-clamp-2 leading-relaxed flex-shrink-0" style={{ minHeight: "36px" }}>
          {item.description}
        </p>

        {/* Meta */}
        <div className="space-y-1.5 mb-4 mt-auto">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
            <span className="text-[12px] text-gray-900 truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-red-500 shrink-0" />
              <span className="text-[12px] text-gray-900">{formatDate(item.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-red-500 shrink-0" />
              <span className="text-[12px] text-gray-900">{item.time}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/6 mb-3.5" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100
              flex items-center justify-center text-red-600 text-[10px] font-bold shrink-0"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {item.reportedBy[0]}
            </div>
            <span className="text-[11.5px] text-gray-900 truncate">{item.reportedBy}</span>
          </div>
          <Link
            href={`/lost-items/${item.id}`}
            className="flex items-center gap-1 text-[12px] font-semibold text-red-600
              hover:text-red-700 transition-colors shrink-0 ml-2 no-underline">
            Details <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LostAndFoundPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("lost");

  const { data, isLoading, error } = useGetAllLostItemsQuery();
  useEffect(() => {
    if (data?.data) {
      const formatted = data.data.map((item) => ({
        id: item._id,
        name: item.itemName,
        description: item.description,
        location: item.location,
        date: item.dateTime,
        time: new Date(item.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        image: item.images?.[0]
          ? `http://localhost:5000/${item.images[0].replace(/\\/g, "/")}`
          : "/placeholder.png",
          status: "lost",
          reportedBy: item.user?.name || "Unknown",
        }));
        
        setItems(formatted);
        setFilteredItems(formatted);
      }
    }, [data]);
    // console.log(item.image);
    
  useEffect(() => {
    let result = items.filter((i) => i.status === viewMode);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
      );
    }
    setFilteredItems(result);
  }, [items, searchQuery, viewMode]);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const lostCount = items.filter((i) => i.status === "lost").length;
  const foundCount = items.filter((i) => i.status === "found").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-9 h-9 border-[2.5px] border-black/8 border-t-red-600 rounded-full animate-spin" />
          <p className="text-[12px] text-black/30 font-medium tracking-[0.14em] uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Loading…
          </p>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="p-10 text-red-500">Error loading items</div>;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .bf-root { font-family: 'DM Sans', sans-serif; }
        .bf-search::placeholder { color: rgba(15,15,15,0.3); }
        .bf-search:focus { border-color: rgba(220,38,38,0.4) !important; box-shadow: 0 0 0 3px rgba(220,38,38,0.07); }
        .bf-date:focus { border-color: rgba(220,38,38,0.4) !important; box-shadow: 0 0 0 3px rgba(220,38,38,0.07); }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bf-root min-h-screen bg-[#fafafa]">

        {/* ── PAGE HEADER ── */}
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(220,38,38,0.07) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-14">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-red-600 mb-3">
              Community Board
            </p>
            <h1 className="text-[clamp(32px,6vw,52px)] font-extrabold text-[#0f0f0f] leading-[1.05] tracking-[-0.04em] mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Lost &amp; Found
            </h1>
            <p className="text-[15px] font-light text-black/45 max-w-md leading-relaxed mb-10">
              Help reunite people with their belongings. Browse community reports or file your own in seconds.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { val: lostCount, label: "Active Lost", dot: "bg-red-500" },
                { val: foundCount, label: "Items Found", dot: "bg-emerald-500" },
                { val: "98%", label: "Match Rate", dot: "bg-blue-500" },
              ].map(({ val, label, dot }) => (
                <div key={label}
                  className="flex items-center text-gray-700 gap-2.5 px-4 py-2 rounded-full
                    bg-white border border-black/7 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-[13px] font-bold text-[#0f0f0f]"
                    style={{ fontFamily: "'Syne', sans-serif" }}>{val}</span>
                  <span className="text-[11.5px] text-black/38">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STICKY TOOLBAR ── */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-black/6
          shadow-[0_1px_12px_rgba(0,0,0,0.05)]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

            {/* Lost / Found toggle */}
            <div className="flex bg-black/[0.04] rounded-xl p-1 shrink-0">
              {["lost", "found"].map((mode) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`px-5 py-2 rounded-[10px] text-[13px] font-semibold capitalize transition-all duration-200 ${viewMode === mode
                    ? mode === "lost"
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-emerald-600 text-white shadow-sm"
                    : "text-black/45 hover:text-black/70"
                    }`}>
                  {mode === "lost" ? `Lost (${lostCount})` : `Found (${foundCount})`}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30" />
              <input
                type="text"
                placeholder="Search items, location…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bf-search w-full pl-10 pr-9 py-2.5
                  bg-black/[0.03] border border-black/8
                  hover:border-black/14 rounded-xl
                  text-[13.5px] text-[#0f0f0f]
                  outline-none transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/55 transition-colors">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Filter toggle — date only now */}
            <button onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold transition-all duration-200 shrink-0 ${filterOpen
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-black/8 text-black/50 hover:border-black/14 hover:text-black/70"
                }`}>
              <SlidersHorizontal size={13} />
              Filters
            </button>

            {/* Report CTA */}
            <Link href={viewMode === "lost" ? "/report-lost" : "/report-found"}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold
                shadow-[0_2px_12px_rgba(220,38,38,0.22)] hover:shadow-[0_4px_18px_rgba(220,38,38,0.3)]
                hover:-translate-y-px transition-all duration-200 shrink-0 no-underline">
              <Plus size={13} />
              Report {viewMode === "lost" ? "Lost" : "Found"}
            </Link>
          </div>

          {/* Filter panel — date range only */}
          {filterOpen && (
            <div className="border-t border-black/6 bg-white px-5 sm:px-8 py-5">
              <div className="max-w-5xl mx-auto flex gap-4">
                {["From", "To"].map((lbl) => (
                  <div key={lbl} className="flex flex-col gap-2">
                    <p className="text-[10.5px] font-semibold text-black/28 uppercase tracking-[0.14em]">{lbl}</p>
                    <input type="date"
                      style={{ colorScheme: "light", fontFamily: "'DM Sans', sans-serif" }}
                      className="bf-date bg-black/[0.03] border border-black/8
                        hover:border-black/14 rounded-xl px-3 py-2
                        text-[13px] text-[#0f0f0f] outline-none transition-all duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">

          {/* Results bar */}
          <div className="flex items-center justify-between mb-7">
            <p className="text-[13px] text-gray-700">
              <span className="text-[#0f0f0f] font-semibold"
                style={{ fontFamily: "'Syne', sans-serif" }}>{filteredItems.length}</span>{" "}
              {viewMode} {filteredItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item, i) => (
                <ItemCard key={item.id} item={item} formatDate={formatDate} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="relative mb-7">
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100
                  flex items-center justify-center">
                  <Search className="w-7 h-7 text-red-400" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black/6 border border-black/8
                  flex items-center justify-center">
                  <X size={9} className="text-black/30" />
                </div>
              </div>

              <h3 className="text-[20px] font-extrabold text-[#0f0f0f] mb-2 tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em' }}>
                No {viewMode} items found
              </h3>
              <p className="text-[13.5px] font-light text-black/42 mb-8 max-w-xs leading-relaxed">
                Try adjusting your search or filters, or be the first to file a report.
              </p>

              <Link href={viewMode === "lost" ? "/report-lost" : "/report-found"}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl
                  bg-red-600 hover:bg-red-700 text-white text-[14px] font-semibold
                  shadow-[0_4px_20px_rgba(220,38,38,0.22)] hover:shadow-[0_8px_28px_rgba(220,38,38,0.32)]
                  hover:-translate-y-0.5 transition-all duration-200 no-underline">
                <Plus size={15} />
                Report a {viewMode === "lost" ? "Lost" : "Found"} Item
                <ChevronRight size={14} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        <div className="h-px bg-black/6 max-w-5xl mx-auto mb-0" />
      </div>
    </>
  );
}