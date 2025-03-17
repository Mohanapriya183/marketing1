import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[60vh] bg-black p-6 space-y-6 md:space-y-0 md:space-x-6 justify-between">
      {/* Left Sidebar */}
      <aside className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center">
        <img src="/images/logo5.jpeg" alt="Logo" className="w-30 h-30 mb-3 " />
        <h1 className="text-xl font-bold text-gray-800">Ssparow</h1>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          We provide top-notch marketing solutions tailored to grow your business and maximize engagement.
        </p>
        <div className="flex space-x-4 text-blue-600 mt-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} />
          </a>
        </div>
      </aside>

      {/* Center Content - Useful Links */}
      <nav className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-black mt-5 mb-3">Links</h2>
        <ul className="space-y-2 text-sm sm:text-base">
          <li>
            <Link to="/" className="text-blue-600 hover:underline w-full">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-blue-600 hover:underline w-full">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="text-blue-600 hover:underline w-full">
              About Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Sidebar - Our Services */}
      <main className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl text-black font-bold mb-4">Our Marketing Services</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base text-left mx-auto max-w-xs">
          <li>
            <Link to="/smm" className="text-blue-600 hover:underline">
              Social Media Marketing
            </Link>
          </li>
          <li>
            <Link to="/seo" className="text-blue-600 hover:underline">
              Search Engine Optimization (SEO)
            </Link>
          </li>
          <li>
            <Link to="/content" className="text-blue-600 hover:underline">
              Content Marketing
            </Link>
          </li>
          <li>
            <Link to="/influencer" className="text-blue-600 hover:underline">
              Influencer Marketing
            </Link>
          </li>
          <li>
            <Link to="/email" className="text-blue-600 hover:underline">
              Email Marketing
            </Link>
          </li>
          <li>
            <Link to="/paidad" className="text-blue-600 hover:underline">
              Paid Advertising (PPC)
            </Link>
          </li>
          <li>
            <Link to="/branding" className="text-blue-600 hover:underline">
              Branding & Identity
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="text-blue-600 hover:underline">
              SEO & Analytics
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default BlogPage;






// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import { Link } from "react-router-dom"; // Import the useNavigate hook

// const BlogPage = () => {
//   // Create the navigate function from useNavigate
  

//   return (
//     <div className="flex flex-col md:flex-row min-h-[60vh] bg-black p-6 space-y-6 md:space-y-0 md:space-x-6 justify-between">
//       {/* Left Sidebar */}
//       <aside className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center">
//         <img src="/images/logo5.jpeg" alt="Logo" className="w-16 h-16 mb-3" />
//         <h1 className="text-xl font-bold text-gray-800">Ssparow</h1>
//         <p className="text-gray-700 mt-2 text-sm sm:text-base">
//           We provide top-notch marketing solutions tailored to grow your business and maximize engagement.
//         </p>
//         <div className="flex space-x-4 text-blue-600 mt-3">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <FaFacebook size={20} />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <FaTwitter size={20} />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <FaInstagram size={20} />
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//             <FaLinkedin size={20} />
//           </a>
//         </div>
//       </aside>

//       {/* Center Content - Useful Links */}
//       <nav className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-md text-center">
//         <h2 className="text-lg font-semibold text-black mt-5 mb-3"> Links</h2>
//         <ul className="space-y-2 text-sm sm:text-base">
//           <li>
//             <Link to="/"
//               className="text-blue-600 hover:underline w-full"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact"
//               className="text-blue-600 hover:underline w-full"
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link to ="/about-us"
//               className="text-blue-600 hover:underline w-full"
//             >
//               About Us
//             </Link>
//           </li>
        
//         </ul>
//       </nav>

//       {/* Right Sidebar - Our Services */}
//       <main className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl text-black font-bold mb-4">Our Marketing Services</h2>
//         <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base text-left mx-auto max-w-xs">
//           <li>
//             <Link to="/ssm"> Social Media Marketing</Link></li>
//           <li>Search Engine Optimization (SEO)</li>
//           <li>Content Marketing</li>
//           <li>
//             <Link to="/influencer" ></Link>
//             Influencer Marketing</li>
//           <li>Email Marketing</li>
//           <li>Paid Advertising (PPC)</li>
//           <li>Branding & Identity</li>
//           <li>SEO & Analytics</li>
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default BlogPage;






// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const BlogPage = () => {
//   return (
//     <div className="flex min-h-[60vh] bg-gray-100 p-6">
//       {/* Left Sidebar */}
//       <aside className="w-1/4 bg-white p-5 rounded-lg shadow-md">
//         <div className="flex items-center mb-4">
//           <img src="/images/logo5.jpeg" alt="Logo" className="w-10 h-10 mr-3" />
//           <h1 className="text-xl font-bold">AdElevate</h1>
//         </div>
//         <p className="text-gray-700 mb-4 text-sm">
//           We provide top-notch marketing solutions tailored to grow your business and maximize engagement.
//         </p>
//         <div className="flex space-x-3 text-blue-600">
//           <FaFacebook size={18} />
//           <FaTwitter size={18} />
//           <FaInstagram size={18} />
//           <FaLinkedin size={18} />
//         </div>
//       </aside>

//       {/* Right Sidebar */}
//       <nav className="w-1/4 text-right pr-5">
//         <h2 className="text-lg font-semibold mb-3">Useful Links</h2>
//         <ul className="space-y-2 text-sm">
//           <li className="text-blue-600 hover:underline cursor-pointer">Home</li>
//           <li className="text-blue-600 hover:underline cursor-pointer">Contact Us</li>
//           <li className="text-blue-600 hover:underline cursor-pointer">About Us</li>
//         </ul>
//       </nav>

//       {/* Center Content */}
//       <main className="w-1/3 bg-white p-6 pl-30 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Our Marketing Services</h2>
//         <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
//           <li>Social Media Marketing</li>
//           <li>Search Engine Optimization (SEO)</li>
//           <li>Content Marketing</li>
//           <li>Influencer Marketing</li>
//           <li>Email Marketing</li>
//           <li>Paid Advertising (PPC)</li>
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default BlogPage;