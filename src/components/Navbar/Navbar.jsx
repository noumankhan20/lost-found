'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-200 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center select-none">
            <Search className="h-8 w-8 text-red-600 mr-3" />
            <span className="text-2xl font-extrabold text-gray-900 tracking-wide">lost & Found</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-medium text-gray-700">
            <Link
              href="/"
              className="relative group px-3 py-2 rounded-md hover:text-red-600 transition-colors duration-200"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="relative group px-3 py-2 rounded-md hover:text-red-600 transition-colors duration-200"
            >
              About
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="relative group px-3 py-2 rounded-md hover:text-red-600 transition-colors duration-200"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden animate-fade-in"
          >
            <Link
              href="/"
              className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease forwards;
        }
      `}</style>
    </nav>
  );
}
