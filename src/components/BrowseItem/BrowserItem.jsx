"use client"
import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Calendar, Clock, Plus, SlidersHorizontal, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// ── Horizontal scroll carousel ──────────────────────────────────────────────
function ItemCarousel({ items, formatDate }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* Left arrow */}
      {canLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-200 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Right arrow */}
      {canRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-200 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-3 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} formatDate={formatDate} />
        ))}
      </div>
    </div>
  );
}

// ── Single item card ─────────────────────────────────────────────────────────
function ItemCard({ item, formatDate }) {
  return (
    <div
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
      style={{ minWidth: "280px", maxWidth: "280px", width: "280px" }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 shrink-0">
        <img
          src={`${item.image}?w=400&h=300&fit=crop`}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Status badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm ${
          item.status === "lost" ? "bg-red-500/90 text-white" : "bg-emerald-500/90 text-white"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === "lost" ? "bg-red-200" : "bg-emerald-200"}`} />
          {item.status}
        </div>

        {/* Category pill */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white/90 text-[10.5px] font-medium px-2.5 py-1 rounded-full">
          {item.category}
        </div>
      </div>

      {/* Body — flex-1 so all cards stretch to same height */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 group-hover:text-red-600 transition-colors leading-snug line-clamp-1">
          {item.name}
        </h3>
        <p className="text-[12.5px] text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-shrink-0" style={{ minHeight: "36px" }}>
          {item.description}
        </p>

        {/* Meta — pushed down by flex */}
        <div className="space-y-1.5 mb-4 mt-auto">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="text-[12px] text-gray-500 truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="text-[12px] text-gray-500">{formatDate(item.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="text-[12px] text-gray-500">{item.time}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-3" />

        {/* Reporter + CTA — always at bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-500 text-[10px] font-bold shrink-0">
              {item.reportedBy[0]}
            </div>
            <span className="text-[11.5px] text-gray-400 truncate">{item.reportedBy}</span>
          </div>
          <button className="flex items-center gap-1 text-[12px] font-semibold text-red-600 hover:text-red-500 transition-colors shrink-0 ml-2">
            Details <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
const LostAndFoundPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("lost");

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const mockItems = [
          { id: 1, name: "Nouman", category: "Personal Items", location: "Kurla", date: "2025-02-21", time: "14:30", description: "A man with a button on his head", image: "/lost.webp", status: "lost", reportedBy: "Alex Johnson" },
          { id: 2, name: "AirPods Pro", category: "Electronics", location: "Student Center Cafeteria", date: "2025-09-23", time: "12:15", description: "White AirPods Pro in charging case", image: "/air.jpg", status: "found", reportedBy: "Akshat Gupta" },
          { id: 3, name: "Blue Hydroflask", category: "Personal Items", location: "Gym, Locker Room", date: "2025-09-21", time: "18:45", description: "32oz navy blue water bottle with stickers", image: "/bottle.webp", status: "lost", reportedBy: "James Wilson" },
          { id: 4, name: "Car Keys with Red Lanyard", category: "Keys", location: "Parking Lot B", date: "2025-09-24", time: "09:10", description: "Toyota car keys with university logo lanyard", image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a", status: "found", reportedBy: "Campus Security" },
          { id: 5, name: "Prescription Glasses", category: "Personal Items", location: "Science Building, Room 302", date: "2025-09-23", time: "15:20", description: "Black-framed glasses with case", image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371", status: "lost", reportedBy: "Emily Parker" },
          { id: 6, name: "MacBook Pro", category: "Electronics", location: "Central Library Study Room", date: "2025-09-22", time: "16:35", description: "13-inch Space Gray MacBook with stickers on cover", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", status: "lost", reportedBy: "Michael Zhang" },
          { id: 7, name: "Student ID Card", category: "IDs & Documents", location: "Campus Bus Stop", date: "2025-09-24", time: "08:45", description: "University ID for Sarah Thompson", image: "https://images.unsplash.com/photo-1608236415053-3691791bbffe", status: "found", reportedBy: "Bus Driver" },
          { id: 8, name: "Organic Chemistry", category: "Books & Notes", location: "Chemistry Lab", date: "2025-09-21", time: "13:15", description: "7th edition with yellow highlights throughout", image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14", status: "found", reportedBy: "Lab Assistant" },
        ];
        const uniqueCategories = ["All", ...new Set(mockItems.map((item) => item.category))];
        setItems(mockItems);
        setFilteredItems(mockItems);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    let result = [...items];
    result = result.filter((item) => item.status === viewMode);
    if (selectedCategory !== "All") result = result.filter((item) => item.category === selectedCategory);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    setFilteredItems(result);
  }, [items, selectedCategory, searchQuery, viewMode]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-gray-200 border-t-red-600 rounded-full animate-spin" />
          <p className="text-[13px] text-gray-400 font-medium tracking-wide uppercase">Loading items...</p>
        </div>
      </div>
    );
  }

  const lostCount = items.filter((i) => i.status === "lost").length;
  const foundCount = items.filter((i) => i.status === "found").length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero header ── */}
      <div
        className="relative overflow-hidden px-6 py-14 sm:px-10 sm:py-20"
        style={{ background: "linear-gradient(160deg, #7f0000 0%, #b91c1c 50%, #450a0a 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "22px 22px" }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #fca5a5, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f87171, transparent 70%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-red-300/60 text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">FindIt Platform</p>
          <h1 className="text-white font-black text-[clamp(32px,6vw,56px)] leading-tight tracking-tight mb-4">
            Lost &amp; <span className="text-red-300">Found</span>
          </h1>
          <p className="text-red-100/55 text-[15px] max-w-md leading-relaxed mb-10">
            Help reunite people with their belongings. Browse reports or file your own in seconds.
          </p>
          <div className="flex items-center gap-8">
            {[
              { val: lostCount, label: "Active Lost", color: "text-red-300" },
              { val: foundCount, label: "Items Found", color: "text-emerald-300" },
              { val: "98%", label: "Match Rate", color: "text-white" },
            ].map(({ val, label, color }) => (
              <div key={label} className="flex flex-col">
                <span className={`font-black text-[26px] leading-none ${color}`}>{val}</span>
                <span className="text-red-200/45 text-[11px] font-medium mt-1 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky toolbar ── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 shrink-0">
            {["lost", "found"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-5 py-2 rounded-lg text-[13px] font-semibold capitalize transition-all duration-200 ${
                  viewMode === mode
                    ? mode === "lost" ? "bg-red-600 text-white shadow-sm" : "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {mode === "lost" ? "Lost" : "Found"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, location, category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-red-400 focus:ring-4 focus:ring-red-50 rounded-xl text-[13.5px] text-gray-800 placeholder-gray-400 outline-none transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold transition-all shrink-0 ${
              filterOpen ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          {/* Report CTA — routes based on viewMode */}
          <Link
            href={viewMode === "lost" ? "/report-lost" : "/report-found"}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[13px] font-semibold transition-colors shrink-0 shadow-sm"
          >
            <Plus size={14} />
            Report {viewMode === "lost" ? "Lost" : "Found"} Item
          </Link>
        </div>

        {/* Expandable filter row */}
        {filterOpen && (
          <div className="border-t border-gray-100 bg-white px-5 sm:px-8 py-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                        selectedCategory === cat ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 shrink-0">
                {["From", "To"].map((lbl) => (
                  <div key={lbl} className="flex flex-col gap-1.5">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{lbl}</p>
                    <input
                      type="date"
                      style={{ colorScheme: "light" }}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-gray-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">

        {/* Results count + clear */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[13px] text-gray-400">
            <span className="text-gray-800 font-semibold">{filteredItems.length}</span>{" "}
            {viewMode} {filteredItems.length === 1 ? "item" : "items"} found
          </p>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="flex items-center gap-1.5 text-[12px] text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              <X size={12} /> Clear filter
            </button>
          )}
        </div>

        {/* Carousel or empty state */}
        {filteredItems.length > 0 ? (
          <ItemCarousel items={filteredItems} formatDate={formatDate} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
              <Search className="w-6 h-6 text-red-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-[18px] font-bold text-gray-800 mb-2">No {viewMode} items found</h3>
            <p className="text-[13.5px] text-gray-400 mb-7 max-w-xs">Try adjusting your search or filters to find what you're looking for.</p>
            <Link
              href={viewMode === "lost" ? "/report-lost" : "/report-found"}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[13.5px] font-semibold transition-colors shadow-sm"
            >
              <Plus size={15} />
              Report a {viewMode === "lost" ? "Lost" : "Found"} Item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostAndFoundPage;