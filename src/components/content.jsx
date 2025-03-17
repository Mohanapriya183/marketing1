import React, { useState } from 'react';
import Services from './services';
import AnotherForm from './popupform';

const cm = () => {
const[showForm,setShowForm]=useState(false)

  return (
    <div className="flex flex-col items-center px-4 bg-gray-100 sm:px-8 md:px-16 py-6 text-center">
      <h1 className="text-xl sm:text-2xl text-orange-500 md:text-3xl font-bold mb-4">
      Drive Engagement & Boost Conversions with Strategic Content Marketing
      </h1>
      <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
      We are a leading content marketing service provider, dedicated to helping businesses establish a strong digital presence. Our expert team crafts compelling, SEO-driven content tailored to engage your audience and boost brand awareness.

We specialize in blog writing, website content, social media storytelling, email campaigns, and ad copy that resonate with your target market. Our data-driven approach ensures content strategies align with your business goals, driving organic traffic, improving engagement, and maximizing conversions.

From strategy development to execution, we create impactful content that positions your brand as an industry leader. Partner with us to transform your content into a powerful marketing tool that drives business growth in the competitive digital landscape.
      </p>
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-[#0C1C2C] py-3 px-4 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition"
        >
          Let's Connect
        </button>
      </div>
      <br />
      <img 
        src="images/content.jpeg" 
        alt="Social Media Marketing" 
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
      />
      <Services/>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button 
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>

            {/* Render Popup Form */}
            <AnotherForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default cm;
