import React, { useState } from "react";
import { Link } from "react-router-dom";
import Second from "./second";
import TestimonialPage from "./Testimonials";
import BlogPage from "./blog";

const teamMembers = [
  { name: "Madhu", role: "Marketing Strategist", bio: "Madhu is a seasoned marketing strategist with over 10 years of experience in digital marketing and brand growth.", image: "/images/person3.jpeg" },
  { name: "Sarah", role: "Social Media Manager", bio: "Sarah specializes in social media campaigns, content creation, and audience engagement strategies.", image: "/images/person2.jpeg" },
  { name: "Michael", role: "SEO Specialist", bio: "Michael focuses on search engine optimization and analytics to drive traffic and improve online visibility.", image: "/images/person5.jpeg" },
  { name: "Gowtham", role: "Social Media Manager", bio: "Gowtham specializes in social media campaigns, content creation, and audience engagement strategies.", image: "/images/person5.jpeg" },
  { name: "Pragathi", role: "Marketing Strategist", bio: "Pragathi is a seasoned marketing strategist with over 8 years of experience in digital marketing and brand growth.", image: "/images/person1.jpeg" },
  { name: "Maran", role: "Social Media Manager", bio: "Maran specializes in social media campaigns, content creation, and audience engagement strategies.", image: "/images/person4.jpeg" }
];

const About = () => {
  const [activeTab, setActiveTab] = useState(null);
  
  const content = {
    Mission: "Digital Cappuccino, the leading Marketing Agency in Gurgaon, India offers a full range of effective marketing services. We use data-driven marketing to increase your online presence.",
    Vision: "Our vision is to be a leading force in the marketing industry, pioneering new approaches to digital engagement and brand success.",
    Values: "We value integrity, creativity, collaboration, and data-driven decision-making to deliver exceptional results for our clients."
  };

  return (
    <div className="bg-white text-black min-h-screen p-4 md:p-8 relative">
      {/* Home Button */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5">
        <Link to="/" className="bg-orange-500 text-black px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold shadow-lg hover:bg-black hover:text-[#FFD700] transition">Home</Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 uppercase tracking-wide text-orange-500">Meet Our Marketing Team</h1>

      <div className="flex justify-center mb-6 md:mb-10">
        <img src="/images/team.jpeg" alt="Team" className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
      </div>

      {/* Mission, Vision, Values */}
      <section className="mb-8 md:mb-12 text-center bg-gray-100 p-4 md:p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {Object.keys(content).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(activeTab === tab ? null : tab)}
              className={`px-3 py-1 md:px-4 md:py-2 font-semibold rounded-md transition duration-300 ${activeTab === tab ? "bg-orange-500 text-black" : "bg-black text-orange-500 border border-orange-500"}`}>{tab}</button>
          ))}
        </div>
        {Object.keys(content).map((tab) => (
          <div key={tab} className={`mt-4 p-3 border rounded-lg shadow-md ${activeTab === tab ? "block" : "hidden"} bg-white text-black`}>
            <h2 className="text-xl md:text-2xl font-semibold text-orange-500">{tab}</h2>
            <p className="mt-2 text-sm md:text-base">{content[tab]}</p>
          </div>
        ))}
      </section>

      {/* Our Team */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 uppercase tracking-wide text-black">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 text-black p-4 md:p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 hover:border-black border border-orange-500">
              <img src={member.image} alt={member.name} className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 border-orange-500 hover:border-black transition duration-300" onError={(e) => (e.target.src = "https://via.placeholder.com/150")} />
              <h3 className="text-lg md:text-xl font-semibold mt-3">{member.name}</h3>
              <p className="text-orange-500 font-medium text-sm md:text-base">{member.role}</p>
              <p className="text-black mt-2 text-sm md:text-base">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <Second/>
      <TestimonialPage/>
      <BlogPage/>
    
    </div>
  );
};

export default About;









// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const teamMembers = [
//   {
//     name: "Madhu",
//     role: "Marketing Strategist",
//     bio: "Madhu is a seasoned marketing strategist with over 10 years of experience in digital marketing and brand growth.",
//     image: "/images/person3.jpeg",
//   },
//   {
//     name: "Sarah",
//     role: "Social Media Manager",
//     bio: "Sarah specializes in social media campaigns, content creation, and audience engagement strategies.",
//     image: "/images/person2.jpeg",
//   },
//   {
//     name: "Michael",
//     role: "SEO Specialist",
//     bio: "Michael focuses on search engine optimization and analytics to drive traffic and improve online visibility.",
//     image: "/images/person5.jpeg",
//   },
//   {
//     name: "Gowtham",
//     role: "Social Media Manager",
//     bio: "Gowtham specializes in social media campaigns, content creation, and audience engagement strategies.",
//     image: "/images/person5.jpeg",
//   },
//   {
//     name: "Pragathi",
//     role: "Marketing Strategist",
//     bio: "Pragathi is a seasoned marketing strategist with over 8 years of experience in digital marketing and brand growth.",
//     image: "/images/person1.jpeg",
//   },
//   {
//     name: "Maran",
//     role: "Social Media Manager",
//     bio: "Maran specializes in social media campaigns, content creation, and audience engagement strategies.",
//     image: "/images/person4.jpeg",
//   },
// ];

// const About = () => {
//   const [activeTab, setActiveTab] = useState(null);

//   const content = {
//     Mission:
//       "Digital Cappuccino, the leading Marketing Agency in Gurgaon, India offers a full range of effective marketing services in Gurgaon. We use data-driven marketing to increase your online visibility and online presence.",
//     Vision:
//       "Our vision is to be a leading force in the marketing industry, pioneering new approaches to digital engagement and brand success.",
//     Values:
//       "We value integrity, creativity, collaboration, and data-driven decision-making to deliver exceptional results for our clients.",
//   };

//   return (
//     <div className="bg-[#0C1C2C] text-white min-h-screen p-8 relative">
//       {/* Home Button */}
//       <div className="absolute top-5 left-5">
//         <Link
//           to="/"
//           className="bg-[#FFD700] text-[#0C1C2C] px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-[#e6c200] transition"
//         >
//           Home
//         </Link>
//       </div>

//       <h1 className="text-4xl font-bold text-center mb-6 uppercase tracking-wide text-[#FFD700]">
//         Meet Our Marketing Team
//       </h1>

//       <div className="flex justify-center mb-10">
//         <img
//           src="/images/team.jpeg"
//           alt="Team"
//           className="rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/3"
//         />
//       </div>

//       {/* Mission, Vision, Values */}
//       <section className="mb-12 text-center bg-[#142738] text-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
//         <div className="flex justify-center space-x-6 mb-4">
//           {Object.keys(content).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(activeTab === tab ? null : tab)}
//               className={`px-4 py-2 font-semibold rounded-md transition duration-300 ${
//                 activeTab === tab ? "bg-[#FFD700] text-[#0C1C2C]" : "bg-[#0C1C2C] text-[#FFD700] border border-[#FFD700]"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         {Object.keys(content).map((tab) => (
//           <div
//             key={tab}
//             className={`mt-4 p-4 border rounded-lg shadow-md ${
//               activeTab === tab ? "block" : "hidden"
//             } bg-[#1E2A38] text-[#D3D3D3]`}
//           >
//             <h2 className="text-2xl font-semibold text-[#FFD700]">{tab}</h2>
//             <p className="mt-2">{content[tab]}</p>
//           </div>
//         ))}
//       </section>

//       {/* What We Do */}
//       <section className="mb-12 text-center bg-[#142738] text-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">What We Do</h2>
//         <p className="text-[#D3D3D3]">
//           We specialize in social media marketing, branding, paid advertising, SEO, and content marketing to
//           ensure our clients achieve maximum visibility and success.
//         </p>
//       </section>

//       {/* Our Team */}
//       <section className="text-center">
//         <h2 className="text-3xl font-semibold mb-6 uppercase tracking-wide text-[#FFD700]">Our Team</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teamMembers.map((member, index) => (
//             <div
//               key={index}
//               className="bg-[#142738] text-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
//             >
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-24 h-24 mx-auto rounded-full border-4 border-[#FFD700] hover:border-[#e6c200] transition duration-300"
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
//               />
//               <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
//               <p className="text-[#FFD700] font-medium">{member.role}</p>
//               <p className="text-[#D3D3D3] mt-2">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
