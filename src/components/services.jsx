import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBullhorn, FaAd, FaChartLine, FaEnvelope, FaUserFriends, FaSearch, FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import Second from "./second";
import TestimonialPage from "./Testimonials";
import BlogPage from "./blog";


const services = [
  {
    title: "Social Media Marketing",
    description: "We help businesses grow through strategic social media campaigns on platforms like Facebook, Instagram, and Twitter.",
    icon: <FaFacebook className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "Search Engine Optimization (SEO)",
    description: "Improve your website ranking and visibility on search engines with our expert SEO strategies.",
    icon: <FaSearch className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "Content Marketing",
    description: "Engaging content that attracts and retains customers, including blogs, videos, and infographics.",
    icon: <FaPenFancy className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "Influencer Marketing",
    description: "Boost brand credibility and reach by collaborating with top influencers in your industry.",
    icon: <FaUserFriends className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "Email Marketing",
    description: "Drive customer engagement with personalized email campaigns and newsletters.",
    icon: <FaEnvelope className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "Paid Advertising (PPC)",
    description: "Maximize conversions with targeted advertising on Google Ads and social media platforms.",
    icon: <FaAd className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "Branding & Identity",
    description: "We create strong brand identities that connect with your audience and make a lasting impact.",
    icon: <FaBullhorn className="text-orange-500 text-6xl mb-4" />,
  },
  {
    title: "SEO & Analytics",
    description: "Optimize your website for search engines and track performance with in-depth analytics.",
    icon: <FaChartLine className="text-orange-500 text-6xl mb-4" />,
  },
];

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 md:p-12 lg:p-20 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="bg-orange-500 text-black px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-black hover:text-[#FFD700] transition">
          Home
        </Link>
      </div>
      {/* Services Section */}
      <section className="w-full bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Our Marketing Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center bg-white text-black border border-[#FFD700] shadow-lg rounded-xl p-6 transform hover:scale-105 hover:shadow-2xl transition duration-300">
              {service.icon}
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center">{service.title}</h2>
              <p className="text-gray-700 text-center text-sm sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Second />
      <TestimonialPage />
      <BlogPage />
      
      
    </div>
  );
};

export default Services;






// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBullhorn, FaAd, FaChartLine } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Second from "./second";
// import TestimonialPage from "./Testimonials";
// import BlogPage from "./blog";

// const services = [
//   {
//     title: "Social Media Marketing",
//     description: "We help businesses grow through strategic social media campaigns on platforms like Facebook, Instagram, and Twitter.",
//     icon: <FaFacebook className="text-[#FFD700] text-6xl mb-4" />,
//   },
//   {
//     title: "Branding & Identity",
//     description: "We create strong brand identities that connect with your audience and make a lasting impact.",
//     icon: <FaBullhorn className="text-[#FFD700] text-6xl mb-4" />,
//   },
//   {
//     title: "Advertising Campaigns",
//     description: "Boost your reach with effective online ad campaigns on Google Ads, Facebook Ads, and more.",
//     icon: <FaAd className="text-[#FFD700] text-6xl mb-4" />,
//   },
//   {
//     title: "SEO & Analytics",
//     description: "Optimize your website for search engines and track performance with in-depth analytics.",
//     icon: <FaChartLine className="text-[#FFD700] text-6xl mb-4" />,
//   },
// ];

// const Services = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-6 md:p-12 lg:p-20 space-y-6">
//       <div className="flex justify-between items-center mb-6">
//         <Link to="/" className="bg-[#FFD700] text-black px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-black hover:text-[#FFD700] transition">
//           Home
//         </Link>
//       </div>
//       {/* Services Section */}
//       <section className="w-full bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Our Marketing Services</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => (
//             <div key={index} className="flex flex-col items-center bg-white text-black border border-[#FFD700] shadow-lg rounded-xl p-6 transform hover:scale-105 hover:shadow-2xl transition duration-300">
//               {service.icon}
//               <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center">{service.title}</h2>
//               <p className="text-gray-700 text-center text-sm sm:text-base">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//       <Second/>
//       <TestimonialPage/>
//       <BlogPage/>
    
//     </div>
//   );
// };

// export default Services;




