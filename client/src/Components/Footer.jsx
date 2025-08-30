import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-10 mt-12 shadow-lg">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Eduva</h3>
            <p className="text-sm text-gray-100 leading-relaxed">
              A clean and modern way to manage and borrow books.  
              Easy access for librarians and borrowers anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-yellow-200 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-200 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect with us</h3>
            <div className="flex justify-center md:justify-start gap-6 text-2xl">
              <a href="#" className="hover:text-blue-300 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-sky-300 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-300 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-indigo-300 transition-colors"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/40 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-100">
          © {new Date().getFullYear()} Eduva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
