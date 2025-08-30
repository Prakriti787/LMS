import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] pt-20">
        <img
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc"
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white bg-black/40">
          <div>
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              About Our Library
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed">
              Discover knowledge, explore ideas, and manage resources seamlessly 
              with our <span className="font-bold">Library Management System (LMS)</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex-grow bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
            Why Choose Our Library?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-3">📚 Vast Collection</h3>
              <p className="text-gray-600">
                Thousands of books across genres to inspire and educate students & readers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-3">⚡ Easy Access</h3>
              <p className="text-gray-600">
                Borrow and return books quickly with a seamless user experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-3">👩‍💻 For Everyone</h3>
              <p className="text-gray-600">
                A platform designed for both librarians and borrowers to stay connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}