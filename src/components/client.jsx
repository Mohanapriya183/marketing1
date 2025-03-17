import React from "react";
import { Link } from "react-router-dom";
import Second from "./second";
import TestimonialPage from "./Testimonials";
import BlogPage from "./blog";

export default function Clients() {
  const companyLogos = [
    "/images/logo1.jpeg",
    "/images/logo2.jpeg",
    "/images/logo3.jpeg",
    "/images/logo4.jpeg",
    "/images/logo5.jpeg",
    "/images/logo6.jpeg",
    "/images/logo7.jpeg",
    "/images/logo8.jpeg",
    "/images/logo9.jpeg",
    "/images/logo10.jpeg",
    "/images/logo11.jpeg",
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-12 px-4 relative">
      {/* Home Button */}
      <div className="absolute top-5 left-5">
        <Link
          to="/"
          className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-black hover:text-yellow-500 transition"
        >
          Home
        </Link>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center uppercase tracking-wide">
        Our Clients
      </h2>
      <p className="text-gray-700 text-base md:text-lg text-center mb-8 max-w-xl">
        We’ve had the privilege of working with some amazing companies, helping them grow and achieve their marketing goals.
      </p>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {companyLogos.map((logo, index) => (
          <div
            key={index}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md flex justify-center items-center 
                       hover:shadow-xl hover:scale-105 transition duration-300 border border-orange-500"
          >
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="h-16 md:h-20 w-auto object-contain"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
          </div>
        ))}
      </div>
      <Second/>
      <TestimonialPage/>
      <BlogPage/>
    </div>
    
  );
}
