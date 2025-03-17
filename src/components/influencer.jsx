import React, { useState } from 'react';
import Services from './services';
import AnotherForm from './popupform';

const Im = () => {
const[showForm,setShowForm]=useState(false)

  return (
    <div className="flex flex-col items-center bg-gray-100 px-4 sm:px-8 md:px-16 py-6 text-center">
      <h1 className="text-xl sm:text-2xl text-orange-500 md:text-3xl font-bold mb-4">
      Amplify Your Brand with Powerful Influencer Marketing
      </h1>
      <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
      Leverage the power of influencer marketing to amplify your brand’s reach and credibility. We connect your business with the right influencers across social media platforms to create authentic and engaging content that resonates with your target audience.
Our expert team identifies influencers who align with your brand, manages collaborations, and ensures strategic campaign execution. From product promotions to brand storytelling, we craft influencer partnerships that drive engagement, build trust, and increase conversions.
With data-driven insights and performance tracking, we optimize campaigns for maximum impact. Let us help you harness the influence of key industry voices to grow your brand and stay ahead in the competitive digital landscape.  
</p>
<div className='mt-13'>
      <button
      onClick={()=> setShowForm(true)}
       className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-black transition text-sm sm:text-base md:text-lg">
        Let's Connect
      </button>
      </div>
      <br />
      <img 
        src="images/influencer.jpeg" 
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
      )
      }
    </div>
  );
};

export default Im;
