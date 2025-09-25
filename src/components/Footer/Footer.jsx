import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <Search className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-2xl font-bold">lost $ Found</span>
          </div>
          <p className="text-gray-400 text-lg max-w-md">
            Reuniting people with their lost items through the power of community and technology.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Report Issue</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 border-t border-gray-800 mt-8 pt-8">
        <p>&copy; 2025 lost $ Found. All rights reserved.</p>
      </div>
    </footer>
  );
}
