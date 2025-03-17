import React from 'react';
import Services from './services';
import AnotherForm from './popupform';
import { useState } from 'react';

const Email = () => {
  const[showForm,setShowForm]=useState(false)

  return (
    <div className="flex flex-col items-center bg-gray-100 px-4 sm:px-8 md:px-16 py-6 text-center">
      <h1 className="text-xl text-orange-500 sm:text-2xl md:text-3xl font-bold mb-4">
      Power Up Your Business with Result-Driven Email Marketing.
      </h1>
      <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
      Unlock the power of email marketing to engage your audience, nurture leads, and drive conversions. We offer tailored email marketing solutions designed to strengthen customer relationships and maximize ROI.
Our services include personalized email campaigns, automated workflows, newsletter creation, and promotional emails that capture attention and encourage action. With data-driven segmentation and compelling content, we ensure your messages reach the right audience at the right time.
From crafting engaging subject lines to optimizing email designs for higher open and click-through rates, our expert team handles every aspect of your email marketing strategy. Trust us to deliver impactful email campaigns that boost customer retention and accelerate business growth
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
        src="images/email.jpeg" 
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

export default Email;
