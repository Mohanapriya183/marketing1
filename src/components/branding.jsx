import React from 'react';
import Services from './services';
import { useState } from 'react';
import AnotherForm from './popupform';

const Branding = () => {
const[showForm,setShowForm]=useState(false)

  return (
    <div className="flex flex-col bg-gray-100 items-center px-4 sm:px-8 md:px-16 py-6 text-center">
      <h1 className="text-xl text-orange-500 sm:text-2xl md:text-3xl font-bold mb-4">
      Build a Powerful Brand Identity That Stands Out.
      </h1>
      <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
      Build a strong and memorable brand with our expert Branding & Identity services. We help businesses create a unique brand presence that resonates with their target audience and sets them apart from the competition.
Our services include logo design, brand strategy, visual identity development, and messaging to ensure consistency across all platforms. We craft compelling brand stories, design impactful visuals, and establish a tone that reflects your brand’s values and mission.
From startups to established businesses, we create powerful branding solutions that enhance recognition, build trust, and drive customer loyalty. Let us help you create a brand identity that leaves a lasting impression and fuels your business growth.
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
        src="images/branding.jpeg" 
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

export default Branding;
