import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] pt-20">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="Contact Library"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white bg-black/50">
          <div>
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed">
              We’d love to hear from you! Reach out with any questions or
              feedback about our Library Management System.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="flex-grow bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-indigo-50 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-6">
              Our team is always here to help you with your queries regarding
              books, borrowing, or library management.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>
                📍 <span className="font-medium">Address:</span> Kathmandu,
                Nepal
              </li>
              <li>
                📞 <span className="font-medium">Phone:</span> +977-9812345678
              </li>
              <li>
                📧 <span className="font-medium">Email:</span>{" "}
                support@library.com
              </li>
            </ul>

            {/* Google Map Embed */}
            <div className="mt-8">
              <iframe
                title="library-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.096935393924!2d85.31721517517225!3d27.70903077619129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1908dfda63f5%3A0x7e9b9e2d6f4f8a0!2sKathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
