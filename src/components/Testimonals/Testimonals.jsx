'use client';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Stories, Real People
          </h2>
          <p className="text-lg text-gray-600">
            Hear from users who found what they thought was lost forever.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md group hover:shadow-lg transition">
            <Quote className="text-indigo-500 w-8 h-8 mb-4" />
            <p className="text-gray-700 text-base mb-6">
              "I lost my backpack on campus, and within hours someone reported it found! We connected the same day. Incredible platform!"
            </p>
            <div className="text-gray-900 font-semibold">— Faheem</div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md group hover:shadow-lg transition">
            <Quote className="text-sky-500 w-8 h-8 mb-4" />
            <p className="text-gray-700 text-base mb-6">
              "My dog slipped his collar in the park. Someone posted a 'found' report with a photo, and we were reunited in less than a day."
            </p>
            <div className="text-gray-900 font-semibold">— Akshat</div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md group hover:shadow-lg transition">
            <Quote className="text-emerald-500 w-8 h-8 mb-4" />
            <p className="text-gray-700 text-base mb-6">
              "Lost & Found isn’t just a tool — it’s a lifesaver. I got my lost phone back thanks to someone kind enough to post it here."
            </p>
            <div className="text-gray-900 font-semibold">— Aquib</div>
          </div>
        </div>
      </div>
    </section>
  );
}
