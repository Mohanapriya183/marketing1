import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import Second from "./second";
import TestimonialPage from "./Testimonials";
import BlogPage from "./blog";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "",subject:"", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/contact/submit/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message); // Show success message
      setFormData({ name: "", email: "",subject:"", message: "" }); // Reset form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-12 px-6 relative">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-black hover:text-[#FFD700] transition">
          Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full border border-orange-500">
          <h2 className="text-2xl font-bold mb-4 text-center">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FFD700] focus:ring focus:ring-orange-500 outline-none transition placeholder-black"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FFD700] focus:ring focus:ring-orange-500 outline-none transition placeholder-black"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FFD700] focus:ring focus:ring-orange-500 outline-none transition placeholder-black"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-500 outline-none transition placeholder-black"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-black py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition transform duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full border border-orange-500 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Our Contact Details</h2>
          <div className="space-y-4 text-center">
            <p className="flex items-center justify-center space-x-2">
              <FaPhone className="text-orange-500" /> <span>+91-9344402405</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <FaEnvelope className="text-orange-500" /> <span>info@digitalmarketing.com</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <FaMapMarkerAlt className="text-orange-500" /> <span>Cuddalore, India</span>
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center mt-6 space-x-4">
            <a href="https://facebook.com" className="hover:text-orange-500 transition"><FaFacebook size={28} /></a>
            <a href="https://twitter.com" className="hover:text-orange-500 transition"><FaTwitter size={28} /></a>
            <a href="https://instagram.com" className="hover:text-orange-500 transition"><FaInstagram size={28} /></a>
            <a href="https://linkedin.com" className="hover:text-orange-500 transition"><FaLinkedin size={28} /></a>
          </div>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="w-full max-w-6xl mt-12">
        <iframe
          title="Google Map"
          className="w-full h-72 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902268448412!2d-0.127647484579789!3d51.50735057963527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b33039eec5b%3A0x81c07748aa73d7c7!2sLondon!5e0!3m2!1sen!2suk!4v1611131764005!5m2!1sen!2suk"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <Second />
      <TestimonialPage />
      <BlogPage />
    </div>
  );
};

export default ContactPage;




// import React, { useState } from "react";
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import Second from "./second";
// import TestimonialPage from "./Testimonials";
// import BlogPage from "./blog";
// import { Link } from "react-router-dom";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted", formData);
//     alert("Your message has been sent successfully!");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen bg-white text-black flex flex-col items-center py-12 px-6 relative">
//       {/* Home Button */}
//       <div className="absolute top-4 left-4">
//         <Link to="/" className="bg-[#FFD700] text-black px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-black hover:text-[#FFD700] transition">
//           Home
//         </Link>
//       </div>
//       <h1 className="text-3xl font-bold text-black mb-6 uppercase tracking-wide text-center">Contact Us</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        
//         {/* Contact Form */}
//         <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full border border-[#FFD700]">
//           <h2 className="text-2xl font-bold mb-4 text-center">Get In Touch</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] outline-none transition placeholder-black"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] outline-none transition placeholder-black"
//               required
//             />
//             <textarea
//               name="message"
//               placeholder="Your Message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FFD700] focus:ring focus:ring-[#FFD700] outline-none transition placeholder-black"
//               required
//             ></textarea>
//             <button
//               type="submit"
//               className="w-full bg-[#FFD700] text-black py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition transform duration-300"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>

//         {/* Contact Information */}
//         <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full border border-[#FFD700] flex flex-col justify-center items-center">
//           <h2 className="text-2xl font-bold mb-4 text-center text-[#FFD700]">Our Contact Details</h2>
//           <div className="space-y-4 text-center">
//             <p className="flex items-center justify-center space-x-2">
//               <FaPhone className="text-[#FFD700]" /> <span>+91 98765 43210</span>
//             </p>
//             <p className="flex items-center justify-center space-x-2">
//               <FaEnvelope className="text-[#FFD700]" /> <span>info@digitalmarketing.com</span>
//             </p>
//             <p className="flex items-center justify-center space-x-2">
//               <FaMapMarkerAlt className="text-[#FFD700]" /> <span>Gurgaon, India</span>
//             </p>
//           </div>
          
//           {/* Social Media Links */}
//           <div className="flex justify-center mt-6 space-x-4">
//             <a href="https://facebook.com" className="hover:text-[#FFD700] transition"><FaFacebook size={28} /></a>
//             <a href="https://twitter.com" className="hover:text-[#FFD700] transition"><FaTwitter size={28} /></a>
//             <a href="https://instagram.com" className="hover:text-[#FFD700] transition"><FaInstagram size={28} /></a>
//             <a href="https://linkedin.com" className="hover:text-[#FFD700] transition"><FaLinkedin size={28} /></a>
//           </div>
//         </div>
//       </div>

//       {/* Embedded Google Map */}
//       <div className="w-full max-w-6xl mt-12">
//         <iframe
//           title="Google Map"
//           className="w-full h-72 rounded-lg shadow-lg"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902268448412!2d-0.127647484579789!3d51.50735057963527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b33039eec5b%3A0x81c07748aa73d7c7!2sLondon!5e0!3m2!1sen!2suk!4v1611131764005!5m2!1sen!2suk"
//           allowFullScreen=""
//           loading="lazy"
//         ></iframe>
        
//       </div>
//       <Second/>
//       <TestimonialPage/>
//       <BlogPage/>
    
      
//     </div>
    
//   );
// };


// export default ContactPage;




// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const BlogPage = () => {
//   return (
//     <div className="flex min-h-[60vh] bg-[#0C1C2C] p-6 space-x-6 justify-between text-white">
      
//       {/* Left Sidebar */}
//       <aside className="w-1/3 bg-[#142738] p-5 rounded-lg shadow-md flex flex-col items-center text-center">
//         <img src="/images/logo5.jpeg" alt="Logo" className="w-16 h-16 mb-3" />
//         <h1 className="text-xl font-bold text-[#FFD700]">AdElevate</h1>
//         <p className="text-[#D3D3D3] mt-2 text-sm">
//           We provide top-notch marketing solutions tailored to grow your business and maximize engagement.
//         </p>
//         <div className="flex space-x-3 text-[#FFD700] mt-3">
//           <FaFacebook size={18} />
//           <FaTwitter size={18} />
//           <FaInstagram size={18} />
//           <FaLinkedin size={18} />
//         </div>
//       </aside>

//       {/* Center Content - Useful Links */}
//       <nav className="w-1/3 bg-[#142738] p-5 rounded-lg shadow-md text-center">
//         <h2 className="text-lg font-semibold mb-3 text-[#FFD700]">Useful Links</h2>
//         <ul className="space-y-2 text-sm">
//           <li className="text-[#D3D3D3] hover:text-[#FFD700] cursor-pointer transition">Home</li>
//           <li className="text-[#D3D3D3] hover:text-[#FFD700] cursor-pointer transition">Contact Us</li>
//           <li className="text-[#D3D3D3] hover:text-[#FFD700] cursor-pointer transition">About Us</li>
//         </ul>
//       </nav>

//       {/* Right Sidebar - Our Services */}
//       <main className="w-1/3 bg-[#142738] p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Our Marketing Services</h2>
//         <ul className="list-disc list-inside text-[#D3D3D3] space-y-2 text-sm text-left mx-auto max-w-xs">
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








// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const BlogPage = () => {
//   return (
//     <div className="flex min-h-[60vh] bg-gray-100 p-6 space-x-6 justify-between">
//       {/* Left Sidebar */}
//       <aside className="w-1/3 bg-white p-5 rounded-lg shadow-md flex flex-col items-center text-center">
//         <img src="/images/logo5.jpeg" alt="Logo" className="w-16 h-16 mb-3" />
//         <h1 className="text-xl font-bold">AdElevate</h1>
//         <p className="text-gray-700 mt-2 text-sm">
//           We provide top-notch marketing solutions tailored to grow your business and maximize engagement.
//         </p>
//         <div className="flex space-x-3 text-blue-600 mt-3">
//           <FaFacebook size={18} />
//           <FaTwitter size={18} />
//           <FaInstagram size={18} />
//           <FaLinkedin size={18} />
//         </div>
//       </aside>

//       {/* Center Content - Useful Links */}
//       <nav className="w-1/3 bg-white p-5 rounded-lg shadow-md text-center">
//         <h2 className="text-lg font-semibold mb-3">Useful Links</h2>
//         <ul className="space-y-2 text-sm">
//           <li className="text-blue-600 hover:underline cursor-pointer">Home</li>
//           <li className="text-blue-600 hover:underline cursor-pointer">Contact Us</li>
//           <li className="text-blue-600 hover:underline cursor-pointer">About Us</li>
//         </ul>
//       </nav>

//       {/* Right Sidebar - Our Services */}
//       <main className="w-1/3 bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Our Marketing Services</h2>
//         <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm text-left mx-auto max-w-xs">
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
