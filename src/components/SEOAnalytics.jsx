





// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Analytics = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-[#F4E1C6] text-[#2C3E50]">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#2C3E50]">
//         Transform Your Business with Powerful Social Media Marketing
//       </h1>
//       <p className="text-[#2C3E50] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
//         Our social media marketing services help businesses build a strong online presence and connect with their target audience effectively. 
//         We craft engaging content, manage social media accounts, and run strategic ad campaigns on platforms like Facebook, Instagram, LinkedIn, and Twitter.
//         From influencer collaborations to paid advertising (PPC), we ensure your brand reaches the right audience at the right time. Our team integrates 
//         Search Engine Optimization (SEO) to enhance visibility and leverages content marketing to maintain a consistent brand identity. With email marketing, 
//         we nurture leads and improve customer retention. Using in-depth analytics, we continuously optimize campaigns for better engagement, traffic, and conversions. 
//         Let us help you grow your brand and achieve success through expert social media strategies!
//       </p>

//       {/* Button with New Color Scheme */}
//       <div className="mt-6">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#E67E22] text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#D35400] hover:text-[#FFFFFF] transition hover:shadow-lg"
//         >
//           Let's Connect
//         </button>
//       </div>

//       <br />
//       <img 
//         src="images/imagee.jpeg" 
//         alt="Social Media Marketing" 
//         className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
//       />
//       <Services />

//       {/* Popup Form */}
//       {showForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-[#E8D7A1] bg-opacity-80">
//           <div className="bg-[#FAF3E0] p-6 rounded-lg shadow-lg relative border border-[#E67E22]">
//             {/* Close Button */}
//             <button 
//               className="absolute top-2 right-3 text-[#2C3E50] hover:text-[#D35400]"
//               onClick={() => setShowForm(false)}
//             >
//               ✖
//             </button>

//             {/* Render Popup Form */}
//             <AnotherForm />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Analytics;




// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Analytics = () => {
//   // State to manage popup visibility
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
//         Boost Your Online Presence with SEO & Data-Driven Insights
//       </h1>
//       <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
//         Unlock your business’s full potential with our SEO & Analytics services. We optimize your website to rank higher on search engines, drive organic traffic, and increase visibility. Our strategic approach includes keyword research, on-page and technical SEO, backlink building, and content optimization to ensure long-term success.

//         With advanced analytics, we track key performance metrics, user behavior, and conversion rates to refine your marketing strategies. Our data-driven insights help you make informed decisions, improve website performance, and maximize ROI.

//         Stay ahead of the competition with expert SEO solutions and real-time analytics that drive measurable growth. Let us help you turn data into action and achieve digital success! 
//       </p>

//       {/* Button to Open Popup */}
//       <div className="mt-6">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#FFD700] text-[#0C1C2C] py-3 px-4 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition"
//         >
//           Let's Connect
//         </button>
//       </div>

//       <br />
//       <img 
//         src="images/imagee.jpeg" 
//         alt="SEO & Analytics" 
//         className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
//       />
//       <Services />

//       {/* Popup Form */}
//       {showForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg relative">
//             {/* Close Button */}
//             <button 
//               className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowForm(false)}
//             >
//               ✖
//             </button>

//             {/* Render Popup Form */}
//             <AnotherForm />
//           </div>
//          </div>
//       )}
//     </div>
//   );
// };

// export default Analytics;







import React, { useState } from 'react';
import Services from './services';
import AnotherForm from './popupform';

const Analytics = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-gray-100 text-[#2C3E50]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-orange-500">
        Transform Your Business with Powerful Social Media Marketing
      </h1>
      <p className="text-[#2C3E50] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
        Our social media marketing services help businesses build a strong online presence and connect with their target audience effectively. 
        We craft engaging content, manage social media accounts, and run strategic ad campaigns on platforms like Facebook, Instagram, LinkedIn, and Twitter.
        From influencer collaborations to paid advertising (PPC), we ensure your brand reaches the right audience at the right time. Our team integrates 
        Search Engine Optimization (SEO) to enhance visibility and leverages content marketing to maintain a consistent brand identity. With email marketing, 
        we nurture leads and improve customer retention. Using in-depth analytics, we continuously optimize campaigns for better engagement, traffic, and conversions. 
        Let us help you grow your brand and achieve success through expert social media strategies!
      </p>

      {/* Button with New Color Scheme */}
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#A67C52] hover:text-[#FFFFFF] transition hover:shadow-lg"
        >
          Let's Connect
        </button>
      </div>

      <br />
      <img 
        src="images/analytics.jpeg" 
        alt="Social Media Marketing" 
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
      />
      <Services />

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#E8C07D] bg-opacity-80">
          <div className="bg-orange-500 p-6 rounded-lg shadow-lg relative border border-[#D4A373]">
            {/* Close Button */}
            <button 
              className="absolute top-2 right-3 text-[#2C3E50] hover:text-[#A67C52]"
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

export default Analytics;
