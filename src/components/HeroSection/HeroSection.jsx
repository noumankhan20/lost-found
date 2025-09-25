"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Users } from 'lucide-react';
import {useRouter} from "next/navigation"
export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
const router = useRouter();
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-red-900 overflow-hidden">
      {/* Animated background elements */}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Main content */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}


          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-white bg-clip-text text-transparent leading-tight">
            Lost & Found
            <br />
            <span className="text-4xl md:text-5xl font-light">Made Simple</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
            Connect with your community to find lost items faster than ever. 
            <br className="hidden md:block" />
            Post, search, and reunite with what matters most.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-b from-red-600 to-black-600 rounded-xl font-semibold text-white text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              onClick={() => router.push('/ReportLost')}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Search size={20} />
                Report Lost Item
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-red/20 rounded-xl font-semibold text-white text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                          onClick={() => router.push('/BrowseItem')}
            >
              <MapPin size={20} />
              Browse Found Items
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Active Users", value: "50K+" },
              { icon: Search, label: "Items Reunited", value: "12K+" },
              { icon: Clock, label: "Avg. Resolution", value: "2.5 days" }
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:bg-white/10 hover:border-white/20 group cursor-pointer`}
              >
                <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:text-black-400 transition-colors duration-300" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}

      </div>

      {/* Custom styles for grid pattern */}
      <style jsx>{`
        .bg-grid-white\\/\\[0\\.02\\] {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}