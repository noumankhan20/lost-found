"use client"
import React, { useState } from 'react';
import { Upload, MapPin, Calendar, Camera, CheckCircle2, X, Tag, FileText, ChevronRight } from 'lucide-react';

export default function ReportLostItem() {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    dateTime: '',
    images: []
  });
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // ── SUCCESS ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white/[0.07] border border-white/[0.12] rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-[22px] font-bold text-white mb-3">Report Submitted!</h3>
          <p className="text-white/55 text-[14px] leading-relaxed mb-8">
            Your lost item report has been posted. You'll receive notifications when potential matches are found.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ itemName: '', description: '', location: '', dateTime: '', images: [] }); }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[14px] font-semibold transition-colors duration-150"
          >
            Report Another Item
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // ── FORM ──
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-gray-900 to-black py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[clamp(28px,5vw,44px)] font-black text-white tracking-tight leading-tight mb-3">
            Report Lost Item
          </h1>
          <p className="text-[15px] text-white/50 max-w-md mx-auto leading-relaxed">
            Provide as much detail as possible to help others identify and return your item.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Item Name */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] mb-2">
                <Tag size={11} strokeWidth={2.5} />
                Item Name
              </label>
              <input
                type="text" name="itemName" required
                value={formData.itemName} onChange={handleInputChange}
                placeholder="e.g. iPhone 15, Gold Wedding Ring"
                className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/[0.18] focus:border-white/30 focus:ring-4 focus:ring-white/[0.05] rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] mb-2">
                <FileText size={11} strokeWidth={2.5} />
                Description
                <span className="ml-auto text-[10px] text-white/25 normal-case tracking-normal font-normal">Color, brand, unique features</span>
              </label>
              <textarea
                name="description" required rows={4}
                value={formData.description} onChange={handleInputChange}
                placeholder="Describe color, size, brand, any unique marks or features..."
                className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/[0.18] focus:border-white/30 focus:ring-4 focus:ring-white/[0.05] rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200 resize-none leading-relaxed"
              />
              <div className="flex justify-end mt-1.5">
                <span className="text-[10.5px] text-white/20">{formData.description.length} / 500</span>
              </div>
            </div>

            {/* Location + Date row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] mb-2">
                  <MapPin size={11} strokeWidth={2.5} />
                  Last Known Location
                </label>
                <input
                  type="text" name="location" required
                  value={formData.location} onChange={handleInputChange}
                  placeholder="e.g. Main Library, Block B"
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/[0.18] focus:border-white/30 focus:ring-4 focus:ring-white/[0.05] rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] mb-2">
                  <Calendar size={11} strokeWidth={2.5} />
                  Date & Time Lost
                </label>
                <input
                  type="datetime-local" name="dateTime"
                  value={formData.dateTime} onChange={handleInputChange}
                  style={{ colorScheme: 'dark' }}
                  className="w-full bg-white/[0.06] border border-white/[0.1] hover:border-white/[0.18] focus:border-white/30 focus:ring-4 focus:ring-white/[0.05] rounded-xl px-4 py-3 text-[14px] text-white/70 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] mb-2">
                <Camera size={11} strokeWidth={2.5} />
                Photos
                <span className="ml-auto text-[10px] text-white/25 normal-case tracking-normal font-normal">Optional · up to 3</span>
              </label>

              <div
                onClick={() => document.getElementById('file-upload').click()}
                onDragEnter={handleDrag} onDragLeave={handleDrag}
                onDragOver={handleDrag} onDrop={handleDrop}
                className={`relative rounded-xl px-6 py-8 text-center cursor-pointer transition-all duration-200
                  ${dragActive
                    ? 'border-2 border-dashed border-white/40 bg-white/[0.08]'
                    : 'border-2 border-dashed border-white/[0.1] hover:border-white/25 bg-white/[0.03]'
                  }`}
              >
                <input
                  id="file-upload" type="file" multiple accept="image/*"
                  className="hidden" onChange={(e) => handleFiles(e.target.files)}
                />
                <div className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/[0.1] flex items-center justify-center mx-auto mb-3">
                  <Upload size={17} className="text-white/40" strokeWidth={1.5} />
                </div>
                <p className="text-[13px] text-white/45 mb-1">
                  {dragActive ? 'Drop to upload' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-[11px] text-white/20">PNG · JPG · WEBP · 10 MB each</p>
              </div>

              {/* Previews */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative group rounded-xl overflow-hidden border border-white/[0.1] aspect-square">
                      <img src={img.url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                      <button
                        type="button" onClick={() => removeImage(i)}
                        className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.07]" />

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[12px] text-white/25 text-center sm:text-left">
                Your info is only shared with verified finders.
              </p>
              <button
                type="submit"
                className="group w-full sm:w-auto flex items-center justify-center overflow-hidden rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-[14px] tracking-tight transition-colors duration-150 shrink-0"
              >
                <span className="px-6 py-3.5">Submit Report</span>
                <span className="self-stretch flex items-center px-4 bg-black/20 border-l border-white/10">
                  <ChevronRight size={16} />
                </span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}