// src/TestimonialPage.js
import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


const testimonials = [
  {
    company: "TechWave Solutions",
    logo: "/images/logo1.jpeg",
    feedback: "Amazing service! Our engagement increased by 50% in just two months.",
    rating: 5,
  },
  {
    company: "GreenFuture Corp",
    logo: "/images/logo2.jpeg",
    feedback: "Professional team with great marketing strategies. Highly recommend!",
    rating: 4.5,
  },
  {
    company: "UrbanStyle Fashions",
    logo: "/images/logo3.jpeg",
    feedback: "Their influencer marketing campaign was a game-changer for us!",
    rating: 4,
  },
];

const TestimonialPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-[#FFD700] justify-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i + fullStars} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-black p-6">
      <div className="bg-[#14293E] p-6 rounded-lg shadow-lg text-center max-w-md sm:max-w-lg border border-orange-500">
        <img
          src={testimonials[currentIndex].logo}
          alt="Company Logo"
          className=" md:w-30 md:h-30 mx-auto mb-4 rounded-full border-2 border-orange-500"
        />
        <h2 className="text-lg sm:text-xl font-bold text-orange-500 mb-2">
          {testimonials[currentIndex].company}
        </h2>
        <p className="text-[#D3D3D3] italic mb-3 text-sm sm:text-base">
          "{testimonials[currentIndex].feedback}"
        </p>
        {renderStars(testimonials[currentIndex].rating)}
      </div>

      {/* Include the BlogPage here */}
       {/* This will render the BlogPage component below the testimonials */}
    </div>
  );
};

export default TestimonialPage;




