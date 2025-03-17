import React, { useState } from 'react';
import Services from './services';
import AnotherForm from './popupform';

const Smm = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-gray-100 text-[#000000]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#E67E22]">
        Transform Your Business with Powerful Social Media Marketing
      </h1>
      <p className="text-[#000000] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
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
          className="bg-orange-500 text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#D35400] hover:text-[#FFFFFF] transition hover:shadow-lg"
        >
          Let's Connect
        </button>
      </div>

      <br />
      <img 
        src="images/social.jpeg" 
        alt="Social Media Marketing" 
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
      />
      <Services />

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#E67E22] bg-opacity-80">
          <div className="bg-[#D9D9D9] p-6 rounded-lg shadow-lg relative border border-[#E67E22]">
            {/* Close Button */}
            <button 
              className="absolute top-2 right-3 text-[#E67E22] hover:text-[#D35400]"
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

export default Smm;






// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Smm = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-[#E5D8B6] text-[#2F4F2F]">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#2F4F2F]">
//         Transform Your Business with Powerful Social Media Marketing
//       </h1>
//       <p className="text-[#2F4F2F] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
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
//           className="bg-[#C69214] text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#A37510] hover:text-[#FFFFFF] transition hover:shadow-lg"
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
//         <div className="fixed inset-0 flex items-center justify-center bg-[#D4C3A3] bg-opacity-80">
//           <div className="bg-[#FAF3E0] p-6 rounded-lg shadow-lg relative border border-[#C69214]">
//             {/* Close Button */}
//             <button 
//               className="absolute top-2 right-3 text-[#2F4F2F] hover:text-[#A37510]"
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

// export default Smm;



// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Smm = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-[#F4E1C1] text-[#4B3621]">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#4B3621]">
//         Transform Your Business with Powerful Social Media Marketing
//       </h1>
//       <p className="text-[#4B3621] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
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
//           className="bg-[#D4A017] text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#B8860B] hover:text-[#FFFFFF] transition hover:shadow-lg"
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
//         <div className="fixed inset-0 flex items-center justify-center bg-[#E6D5B8] bg-opacity-80">
//           <div className="bg-[#FAF0DC] p-6 rounded-lg shadow-lg relative border border-[#D4A017]">
//             {/* Close Button */}
//             <button 
//               className="absolute top-2 right-3 text-[#4B3621] hover:text-[#B8860B]"
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

// export default Smm;







// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Smm = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-[#E0F2F1] text-[#1E3A5F]">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#0288D1]">
//         Transform Your Business with Powerful Social Media Marketing
//       </h1>
//       <p className="text-[#37474F] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
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
//           className="bg-[#0288D1] text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#0277BD] hover:text-[#FFFFFF] transition hover:shadow-lg"
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
//         <div className="fixed inset-0 flex items-center justify-center bg-[#B2DFDB] bg-opacity-80">
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
//         </div>
//       )}
//     </div>
//   );
// };

// export default Smm;









// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Smm = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center bg-[#F0F0F0] text-[#333333]">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#FF6600]">
//         Transform Your Business with Powerful Social Media Marketing
//       </h1>
//       <p className="text-[#333333] text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
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
//           className="bg-[#FF6600] text-[#FFFFFF] py-3 px-4 rounded-lg font-semibold hover:bg-[#003366] hover:text-[#FF6600] transition hover:shadow-lg"
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
//         </div>
//       )}
//     </div>
//   );
// };

// export default Smm;











// import React, { useState } from 'react';
// import Services from './services';
// import AnotherForm from './popupform';

// const Smm = () => {
// const[showForm,setShowForm]=useState(false)

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-6 text-center">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
//         Transform Your Business with Powerful Social Media Marketing
//       </h1>
//       <p className="text-gray-700 text-sm sm:text-base mt-10 text-justify md:text-lg leading-relaxed mb-6 max-w-2xl">
//         Our social media marketing services help businesses build a strong online presence and connect with their target audience effectively. 
//         We craft engaging content, manage social media accounts, and run strategic ad campaigns on platforms like Facebook, Instagram, LinkedIn, and Twitter.
//         From influencer collaborations to paid advertising (PPC), we ensure your brand reaches the right audience at the right time. Our team integrates 
//         Search Engine Optimization (SEO) to enhance visibility and leverages content marketing to maintain a consistent brand identity. With email marketing, 
//         we nurture leads and improve customer retention. Using in-depth analytics, we continuously optimize campaigns for better engagement, traffic, and conversions. 
//         Let us help you grow your brand and achieve success through expert social media strategies!
//       </p>
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
//         alt="Social Media Marketing" 
//         className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg mx-auto rounded-lg shadow-md mt-4"
//       />
//       <Services/>
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
//         </div>
//       )}
//     </div>
//   );
// };

// export default Smm;

