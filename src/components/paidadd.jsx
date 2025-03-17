import React, { useState } from 'react';
import Services from './services';
import AnotherForm from './popupform';

const PaidAd = () => {
    const[showForm,setShowForm]=useState(false)

  return (
    <div className="flex flex-col items-center bg-gray-100 px-4 sm:px-8 md:px-16 py-6 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-orange-500 font-bold mb-4">
      Maximize Your Growth with High-Impact Paid Advertising
      </h1>
      <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
      Maximize your brand’s visibility and drive high-quality leads with our expert Paid Advertising (PPC) services. We create targeted ad campaigns on platforms like Google Ads, Facebook, Instagram, and LinkedIn to ensure your business reaches the right audience at the right time.
Our data-driven approach includes keyword research, ad copywriting, audience segmentation, bid management, and performance tracking to optimize your ad spend for maximum ROI. Whether it's search ads, display ads, or social media promotions, we craft high-converting campaigns that generate traffic, leads, and sales.
With continuous monitoring and strategic adjustments, we ensure your ads deliver the best results. Let us help you grow your business faster with cost-effective and performance-driven paid advertising solutions.
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
        src="images/paid.jpeg" 
        alt="Social Media Marketing" 
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
      />
      <Services/>
      {/* Popup Form */}
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

export default PaidAd;
