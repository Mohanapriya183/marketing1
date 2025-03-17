import React, { useState } from 'react';
import Services from './services';
import AnotherForm from './popupform';

const Seo = () => {
    const[showForm,setShowForm]=useState(false)

  return (
    <div className="flex bg-gray-100 flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-orange-500 font-bold mb-4">
      Enhance Your Online Visibility with Expert SEO Strategies
      </h1>
      <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
      Search Engine Optimization (SEO) is the key to improving your website's visibility and ranking higher on search engines like Google. Our SEO experts use proven strategies to optimize your website structure, content, and keywords to drive organic traffic.

We conduct in-depth keyword research, implement on-page and technical SEO improvements, and build high-quality backlinks to boost your search engine rankings. Our content marketing approach ensures that your website delivers valuable, engaging content to your audience. With local SEO optimization, we help businesses reach potential customers in their target locations.

Through continuous performance analysis and strategic adjustments, we ensure long-term success for your brand. Let us help you increase website traffic, generate leads, and achieve sustainable growth with our expert SEO solutions! 
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
        src="images/seo.jpeg" 
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

export default Seo;
