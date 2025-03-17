import { useState } from "react";
import { Link } from "react-router-dom";
import AnotherForm from "./popupform";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu toggle
import Second from "./second";
import TestimonialPage from "./Testimonials";
import BlogPage from "./blog";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  return (
    <div className="min-h-screen text-white flex flex-col px-6 md:px-10 relative">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 text-white z-20 bg-[#0C1C2C] shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide text-orange-600">
          Ssparow 
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 flex justify-center text-lg font-medium">
          <li><Link to="/services" className="hover:text-orange-600 transition">Services</Link></li>
          <li><Link to="/portfolio" className="hover:text-orange-600 transition">Portfolio</Link></li>
          <li><Link to="/clients" className="hover:text-orange-600 transition">Clients</Link></li>
          <li><Link to="/about-us" className="hover:text-orange-600 transition">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-orange-600 transition">Contact Us</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#142738] flex flex-col text-center py-4 space-y-4 shadow-md z-10">
          <Link to="/services" className="hover:text-orange-500" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/portfolio" className="hover:text-orange-500" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/clients" className="hover:text-orange-500" onClick={() => setMenuOpen(false)}>Clients</Link>
          <Link to="/about-us" className="hover:text-orange-500" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="hover:text-orange-500" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full mt-24">
        {/* Left Content (Text) */}
        <div className="text-white max-w-lg md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mt-5 text-orange-500">
            "Ssparow – Elevate Your Brand, Dominate the Market!"
          </h1>
          <p className=" text-lg mt-10 text-black">
            At Ssparow, we craft powerful marketing strategies that drive engagement, boost brand visibility, and turn leads into loyal customers.
          </p>
          <div className="mt-13">
            <span className="font-bold text-black text-lg">Contact us: </span>
            <Link
              to="/contact"
              className="border border-[#FFD700] px-6 py-2 rounded-lg bg-black hover:bg-orange-500 hover:text-black transition duration-300"
            >
              +91 1234567896
            </Link>
          </div>
          <div className="mt-13">
            <button
              onClick={() => setShowForm(true)}
              className="bg-orange-500 text-[#0C1C2C] py-3 px-4 rounded-lg font-semibold hover:text-white hover:scale-105 hover:shadow-lg transition "
            >
              Let's Connect
            </button>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/images/team.jpeg"
            alt="Team"
            className="max-w-md rounded-lg shadow-xl border-4 border-orange-500"
          />
        </div>
      </div>

      {/* AnotherForm Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
            >
              ✖
            </button>
            <AnotherForm />
          </div>
        </div>
      )}
      <Second/>
      <TestimonialPage/>
      <BlogPage/>
      
    </div>
    
  );
}






