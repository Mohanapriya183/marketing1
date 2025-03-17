import React from "react";
import { Link } from "react-router-dom";
import Second from "./second";
import TestimonialPage from "./Testimonials";
import BlogPage from "./blog";

const campaigns = [
  {
    title: "AI Revolution – Smarter Future",
    company: "NexaTech Solutions",
    description:
      "Launched an interactive AI webinar, targeted LinkedIn ads, and influencer collaborations to promote AI automation software. Achieved 35% increase in sign-ups and 2M+ impressions.",
  },
  {
    title: "Eat Fresh, Live Better",
    company: "FreshBites",
    description:
      "Created a YouTube cooking series, Instagram challenge, and partnered with fitness influencers. Resulted in 120K+ website visitors and 18% boost in subscriptions.",
  },
  {
    title: "Fashion for All",
    company: "UrbanStyle",
    description:
      "Launched TikTok trends, virtual try-ons, and sustainability-focused campaigns. Increased online sales by 40% and gained 3M+ views on social media.",
  },
  {
    title: "EcoDrive Green Mobility",
    company: "EcoDrive Motors",
    description:
      "Promoted electric vehicles through influencer partnerships, sustainability campaigns, and test-drive events. Led to a 50% increase in dealership inquiries.",
  },
  {
    title: "Smart Homes, Smarter Living",
    company: "HomeGenius Tech",
    description:
      "Utilized YouTube demos, paid ads, and user testimonials to market home automation devices. Sales rose by 65% in three months.",
  },
  {
    title: "Healthy Skin, Happy You",
    company: "GlowNaturals Skincare",
    description:
      "Developed influencer-led skincare routines, Instagram reels, and wellness blog collaborations. Engagement grew by 70%, with 25K+ new customers.",
  },
];

const Portfolio = () => {
  return (
    <div className="bg-white text-black min-h-screen p-6 md:p-10">
      {/* Home Button */}
      <div className="mb-6 md:mb-8">
        <Link
          to="/"
          className="bg-orange-500 text-black px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-black hover:text-[#FFD700] transition"
        >
          Home
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-black uppercase tracking-wide">
        Our Portfolio
      </h1>

      {/* Previous Campaigns */}
      <section className="mb-10 text-center bg-white text-black p-6 md:p-8 rounded-lg shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-black">Previous Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md border border-orange-500 transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-orange-500">{campaign.title}</h3>
              <p className="font-medium">{campaign.company}</p>
              <p className="text-gray-700 mt-2">{campaign.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Story */}
      <section className="text-center bg-white text-black p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-black">Success Stories</h2>
        <p className="text-lg text-gray-700">
          One of our clients, NexaTech Solutions, saw a{" "}
          <span className="text-orange-500 font-bold">150% increase</span> in engagement after implementing our AI-driven marketing strategy...
        </p>
        <p className="text-orange-500 font-medium hover:underline cursor-pointer mt-4">
          Read more about how we helped them transform their business.
        </p>
      </section>
      <Second/>
      <TestimonialPage/>
      <BlogPage/>
    </div>
  );
};

export default Portfolio;






// import React from "react";

// const campaigns = [
//   {
//     title: "AI Revolution – Smarter Future",
//     company: "NexaTech Solutions",
//     description:
//       "Launched an interactive AI webinar, targeted LinkedIn ads, and influencer collaborations to promote AI automation software. Achieved 35% increase in sign-ups and 2M+ impressions.",
//   },
//   {
//     title: "Eat Fresh, Live Better",
//     company: "FreshBites",
//     description:
//       "Created a YouTube cooking series, Instagram challenge, and partnered with fitness influencers. Resulted in 120K+ website visitors and 18% boost in subscriptions.",
//   },
//   {
//     title: "Fashion for All",
//     company: "UrbanStyle",
//     description:
//       "Launched TikTok trends, virtual try-ons, and sustainability-focused campaigns. Increased online sales by 40% and gained 3M+ views on social media.",
//   },
//   {
//     title: "EcoDrive Green Mobility",
//     company: "EcoDrive Motors",
//     description:
//       "Promoted electric vehicles through influencer partnerships, sustainability campaigns, and test-drive events. Led to a 50% increase in dealership inquiries.",
//   },
//   {
//     title: "Smart Homes, Smarter Living",
//     company: "HomeGenius Tech",
//     description:
//       "Utilized YouTube demos, paid ads, and user testimonials to market home automation devices. Sales rose by 65% in three months.",
//   },
//   {
//     title: "Healthy Skin, Happy You",
//     company: "GlowNaturals Skincare",
//     description:
//       "Developed influencer-led skincare routines, Instagram reels, and wellness blog collaborations. Engagement grew by 70%, with 25K+ new customers.",
//   },
// ];

// const Portfolio = () => {
//   return (
//     <div className="bg-gradient-to-r from-purple-700 to-pink-500 text-white min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-center mb-6 uppercase tracking-wide">
//         Our Portfolio
//       </h1>

//       {/* Previous Campaigns */}
//       <section className="mb-12 text-center bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-4 text-purple-700">Previous Campaigns</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {campaigns.map((campaign, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
//             >
//               <h3 className="text-xl font-semibold text-pink-600">{campaign.title}</h3>
//               <p className="text-gray-600 font-medium">{campaign.company}</p>
//               <p className="text-gray-700 mt-2">{campaign.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Success Story */}
//       <section className="mb-12 text-center bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-4 text-pink-600">Success Stories</h2>
//         <p className="text-lg text-gray-700">
//           One of our clients, NexaTech Solutions, saw a <span className="text-purple-700 font-bold">150% increase</span> in engagement after implementing our AI-driven marketing strategy...
//         </p>
//         <p className="text-blue-600 font-medium hover:underline cursor-pointer">
//           Read more about how we helped them transform their business.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Portfolio;