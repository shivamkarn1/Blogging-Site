import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 border-t border-amber-200">
      <div className="mx-6 sm:mx-12 xl:mx-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <img 
              src="../../public/blogify-high-resolution-logo.png"
              alt="Blogify logo" 
              className="h-12 w-auto object-contain rounded-xl border border-amber-700 shadow-sm mb-4"
            />
            <p className="text-sm text-amber-700 leading-relaxed mb-4">
              Your platform for sharing stories, ideas, and expertise with readers worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-900 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Home</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">All Blogs</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Categories</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-amber-900 font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Write a Blog</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Style Guide</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">FAQ</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-amber-900 font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Privacy Policy</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Terms of Service</a></li>
              <li><a href="#" className="text-amber-700 hover:text-amber-900 hover:underline transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-amber-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-amber-600">© 2025 Blogify. All rights reserved.</p>
          <p className="text-xs text-amber-500">Built with ❤️ Shivam Karn</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer