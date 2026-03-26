"use client"
import React, { useState } from 'react';
import { Upload, MapPin, Calendar, Camera, CheckCircle2, X, Tag, FileText, ChevronRight, ArrowLeft, PackageCheck, User, AlertCircle } from 'lucide-react';
// import { useCreateFoundItemMutation } from '@/redux/slices/foundItemApiSlice';/
import Link from 'next/link';

export default function ReportFoundItem() {
  const fileInputRef = React.useRef(null);

  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    dateTime: '',
    images: []
  });
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
//   const [createFoundItem, { isLoading }] = useCreateFoundItemMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (files) => {
    const slots = 3 - formData.images.length;
    const newImages = Array.from(files).slice(0, slots).map(file => ({
      file, url: URL.createObjectURL(file), name: file.name
    }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("itemName", formData.itemName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("dateTime", formData.dateTime);
      formData.images.forEach((img) => formDataToSend.append("images", img.file));
      const res = await createFoundItem(formDataToSend).unwrap();
      if (res.success) {
        setSubmitted(true);
        setFormData({ itemName: '', description: '', location: '', dateTime: '', images: [] });
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert(error?.data?.message || "Failed to submit report. Are you logged in?");
    }
  };

  // ── SUCCESS STATE ──
  if (submitted) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
          .rf-success { font-family: 'DM Sans', sans-serif; }
        `}</style>
        <div className="rf-success min-h-screen bg-white flex items-center justify-center px-4 py-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(5,150,105,0.06) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

          <div className="relative z-10 w-full max-w-md text-center">
            {/* Icon */}
            <div className="relative w-20 h-20 mx-auto mb-7">
              <div className="w-20 h-20 rounded-[22px] bg-emerald-50 border border-emerald-200
                flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" strokeWidth={1.5} />
              </div>
              {/* Subtle ring */}
              <div className="absolute inset-0 rounded-[22px] border-2 border-emerald-300/40 scale-110 opacity-60" />
            </div>

            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-600 mb-3">
              Thank you!
            </p>
            <h3 className="text-[28px] font-extrabold text-[#0f0f0f] mb-3 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em' }}>
              Report Submitted!
            </h3>
            <p className="text-[15px] font-light text-black/50 leading-relaxed mb-8 max-w-sm mx-auto">
              Your found item report is now live. The owner will be notified if there's a match. You're a community hero.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                  bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold
                  shadow-[0_4px_20px_rgba(5,150,105,0.25)] hover:shadow-[0_8px_28px_rgba(5,150,105,0.35)]
                  hover:-translate-y-0.5 transition-all duration-200 border-none cursor-pointer"
              >
                Report Another Found Item
                <ChevronRight size={15} />
              </button>
              <Link href="/lost-and-found"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                  bg-black/[0.04] hover:bg-black/[0.07] text-[#0f0f0f] text-[14px] font-semibold
                  transition-all duration-200 no-underline">
                Browse Lost &amp; Found Board
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── FORM ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .rf-root { font-family: 'DM Sans', sans-serif; }

        .rf-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 11px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #0f0f0f;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          -webkit-appearance: none;
          appearance: none;
        }
        .rf-input::placeholder { color: rgba(15,15,15,0.3); }
        .rf-input:hover { border-color: rgba(0,0,0,0.18); }
        .rf-input:focus {
          border-color: rgba(5,150,105,0.45);
          box-shadow: 0 0 0 3px rgba(5,150,105,0.08), 0 1px 3px rgba(0,0,0,0.04);
        }
        .rf-input[type="datetime-local"] { color: rgba(15,15,15,0.55); }
        .rf-input[type="datetime-local"]:focus { color: #0f0f0f; }

        .rf-select {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 11px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #0f0f0f;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(0,0,0,0.3)' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 38px;
        }
        .rf-select:hover { border-color: rgba(0,0,0,0.18); }
        .rf-select:focus {
          border-color: rgba(5,150,105,0.45);
          box-shadow: 0 0 0 3px rgba(5,150,105,0.08), 0 1px 3px rgba(0,0,0,0.04);
        }
        .rf-select option { color: #0f0f0f; }

        .rf-textarea {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 11px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #0f0f0f;
          outline: none;
          resize: none;
          line-height: 1.7;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .rf-textarea::placeholder { color: rgba(15,15,15,0.3); }
        .rf-textarea:hover { border-color: rgba(0,0,0,0.18); }
        .rf-textarea:focus {
          border-color: rgba(5,150,105,0.45);
          box-shadow: 0 0 0 3px rgba(5,150,105,0.08), 0 1px 3px rgba(0,0,0,0.04);
        }

        .rf-dropzone {
          border: 1.5px dashed rgba(0,0,0,0.12);
          border-radius: 14px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          background: #fafafa;
          transition: all 0.2s;
        }
        .rf-dropzone:hover { border-color: rgba(5,150,105,0.35); background: rgba(5,150,105,0.02); }
        .rf-dropzone.active { border-color: rgba(5,150,105,0.5); background: rgba(5,150,105,0.04); }

        .rf-step {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(15,15,15,0.38);
          margin-bottom: 8px;
        }
        .rf-step svg { color: rgba(5,150,105,0.7); }

        .rf-preview { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 1; border: 1px solid rgba(0,0,0,0.08); }
        .rf-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rf-preview-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); opacity: 0; transition: opacity 0.15s; }
        .rf-preview:hover .rf-preview-overlay { opacity: 1; }
        .rf-remove-btn {
          position: absolute; top: 6px; right: 6px;
          width: 22px; height: 22px;
          background: #dc2626; color: #fff; border: none;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; opacity: 0; transition: opacity 0.15s;
        }
        .rf-preview:hover .rf-remove-btn { opacity: 1; }

        /* Mobile tap — show remove on touch devices */
        @media (hover: none) {
          .rf-remove-btn { opacity: 1; }
        }
      `}</style>

      <div className="rf-root min-h-screen bg-white relative overflow-hidden">

        {/* Background — emerald tint instead of red */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% -5%, rgba(5,150,105,0.05) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-50"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

          {/* Back link */}
          <Link href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-black/40
              hover:text-black/70 no-underline transition-colors duration-200 mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to home
          </Link>

          {/* Page header */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-600 mb-3">
              Found Something?
            </p>
            <h1 className="text-[clamp(32px,6vw,48px)] font-extrabold text-[#0f0f0f] leading-[1.05] tracking-[-0.04em] mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Report a Found Item
            </h1>
            <p className="text-[15px] font-light text-black/45 leading-relaxed max-w-md">
              Help reunite this item with its owner. The more detail you add, the faster we can find a match.
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-8">
            {['Item Details', 'Time', 'Photos'].map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                    ${i === 0 ? 'bg-emerald-600 text-white' : 'bg-black/6 text-black/30'}`}>
                    {i + 1}
                  </div>
                  <span className={`text-[12px] font-medium hidden sm:block
                    ${i === 0 ? 'text-[#0f0f0f]' : 'text-black/35'}`}>
                    {s}
                  </span>
                </div>
                {i < 2 && <div className="flex-1 h-px bg-black/8 max-w-[40px]" />}
              </React.Fragment>
            ))}
          </div>

          {/* Alert banner — good samaritan nudge */}
          <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl
            bg-emerald-50 border border-emerald-200/80 mb-6">
            <AlertCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-[12.5px] text-emerald-800 leading-relaxed">
              <span className="font-semibold">Good samaritan tip:</span>{" "}
              Don't share the item's exact secret details publicly — use them to verify the real owner when they contact you.
            </p>
          </div>

          {/* Main form card */}
          <div className="bg-white border border-black/8 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden">

            {/* Emerald top accent bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-transparent" />

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

              {/* ── Item Name ── */}
              <div>
                <label className="rf-step">
                  <Tag size={11} strokeWidth={2.5} />
                  Item Name
                  <span className="ml-auto font-normal tracking-normal normal-case text-[10.5px] text-black/25">Required</span>
                </label>
                <input
                  type="text" name="itemName" required
                  value={formData.itemName} onChange={handleInputChange}
                  placeholder="e.g. iPhone 15, Leather Wallet, Blue Backpack"
                  className="rf-input"
                />
              </div>

              {/* ── Description ── */}
              <div>
                <label className="rf-step">
                  <FileText size={11} strokeWidth={2.5} />
                  Description
                  <span className="ml-auto font-normal tracking-normal normal-case text-[10.5px] text-black/25">
                    {formData.description.length}/500
                  </span>
                </label>
                <textarea
                  name="description" required rows={4}
                  value={formData.description} onChange={handleInputChange}
                  maxLength={500}
                  placeholder="Color, size, brand, distinguishing marks — be specific but avoid any secret details the owner should verify..."
                  className="rf-textarea"
                />
              </div>

              {/* ── Date ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="rf-step">
                    <Calendar size={11} strokeWidth={2.5} />
                    Date & Time Found
                  </label>
                  <input
                    type="datetime-local" name="dateTime"
                    value={formData.dateTime} onChange={handleInputChange}
                    className="rf-input"
                  />
                </div>
              </div>

              {/* ── Divider ── */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-black/6" />
                <span className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-black/25">Photos</span>
                <div className="flex-1 h-px bg-black/6" />
              </div>

              {/* ── Upload ── */}
              <div>
                <label className="rf-step">
                  <Camera size={11} strokeWidth={2.5} />
                  Attach Photos
                  <span className="ml-auto font-normal tracking-normal normal-case text-[10.5px] text-black/25">
                    Optional · {formData.images.length}/3 uploaded
                  </span>
                </label>

                {formData.images.length < 3 && (
                  <div
                    className={`rf-dropzone ${dragActive ? 'active' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDrag} onDragLeave={handleDrag}
                    onDragOver={handleDrag} onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file" multiple accept="image/*"
                      className="hidden"
                      onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
                    />
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100
                      flex items-center justify-center mx-auto mb-3">
                      <Upload size={18} className="text-emerald-500" strokeWidth={1.5} />
                    </div>
                    <p className="text-[13.5px] font-medium text-black/55 mb-1">
                      {dragActive ? 'Release to upload' : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-[11.5px] text-black/28">PNG · JPG · WEBP · max 10 MB each</p>
                  </div>
                )}

                {/* Image previews */}
                {formData.images.length > 0 && (
                  <div className={`grid gap-3 ${formData.images.length < 3 ? 'mt-3' : ''} grid-cols-3`}>
                    {formData.images.map((img, i) => (
                      <div key={i} className="rf-preview">
                        <img src={img.url} alt={`Photo ${i + 1}`} />
                        <div className="rf-preview-overlay" />
                        <button type="button" onClick={() => removeImage(i)} className="rf-remove-btn">
                          <X size={10} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-black/50 backdrop-blur-sm">
                          <p className="text-[9.5px] text-white/80 truncate">{img.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Privacy note + Submit ── */}
              <div className="border-t border-black/6 pt-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                  {/* Privacy badge */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/[0.03] border border-black/6">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11.5px] text-gray-700 font-medium">
                      Only matched owners can see your contact info
                    </span>
                  </div>

                  {/* Submit button — emerald */}
                  <button
                    type="submit"
                    // disabled={isLoading}
                    className="group w-full sm:w-auto flex items-center justify-center overflow-hidden
                      rounded-xl bg-emerald-600 hover:bg-emerald-700
                      text-white font-semibold text-[14px] tracking-tight
                      shadow-[0_4px_20px_rgba(5,150,105,0.22)] hover:shadow-[0_8px_28px_rgba(5,150,105,0.32)]
                      hover:-translate-y-0.5 transition-all duration-200
                      disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                      shrink-0 border-none cursor-pointer"
                  >
                    <span className="px-6 py-3.5">
                      {/* {isLoading ? 'Submitting…' : 'Submit Report'} */}
                    </span>
                    <span className="self-stretch flex items-center px-4 bg-black/15 border-l border-white/15">
                      <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </button>
                </div>
              </div>

            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-[12.5px] text-black/30 font-light mt-6">
            Reports are visible to the community for 30 days ·{' '}
            <a href="#" className="underline underline-offset-2 hover:text-black/55 transition-colors">Learn more</a>
          </p>

        </div>
      </div>
    </>
  );
}