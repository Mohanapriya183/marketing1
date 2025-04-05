import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ChatBot from "./chatbot";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [signupInputs, setSignupInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginInputs({ ...loginInputs, [name]: value });
    } else {
      setSignupInputs({ ...signupInputs, [name]: value });
    }
  };

  const handleFormSwitch = (signupState) => {
    setIsSignup(signupState);
    setLoginInputs({ email: "", password: "" });
    setSignupInputs({ email: "", password: "", confirmPassword: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignup) {
      if (
        loginInputs.email === "user@example.com" &&
        loginInputs.password === "password123"
      ) {
        alert("Login Successful!");
        navigate("/welcome");
      } else {
        alert("Invalid credentials, please try again.");
      }
    } else {
      if (signupInputs.password !== signupInputs.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Signup Successful! Please login.");
      handleFormSwitch(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl text-center transition-all duration-500">
        {/* Form Switcher */}
        <div className="flex justify-between bg-gray-200 rounded-md p-2">
          <span
            onClick={() => handleFormSwitch(false)}
            className={`flex-1 text-lg font-medium py-2 cursor-pointer transition-all duration-500 rounded-md ${
              !isSignup
                ? "bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] text-white"
                : "bg-white text-gray-900"
            }`}
          >
            Login
          </span>
          <span
            onClick={() => handleFormSwitch(true)}
            className={`flex-1 text-lg font-medium py-2 cursor-pointer transition-all duration-500 rounded-md ${
              isSignup
                ? "bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] text-white"
                : "bg-white text-gray-900"
            }`}
          >
            Signup
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-[#003366] mt-4">
          {isSignup ? "Signup Form" : "Login Form"}
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            required
            value={isSignup ? signupInputs.email : loginInputs.email}
            onChange={(e) => handleChange(e, isSignup ? "signup" : "login")}
            className="w-full p-3 mt-3 border-2 border-[#0073e6] rounded-lg outline-none focus:border-[#0059b3] focus:ring-2 focus:ring-[#0073e6] transition-all duration-300"
          />

          <div className="relative mt-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={isSignup ? signupInputs.password : loginInputs.password}
              onChange={(e) => handleChange(e, isSignup ? "signup" : "login")}
              className="w-full p-3 border-2 border-[#0073e6] rounded-lg outline-none focus:border-[#0059b3] focus:ring-2 focus:ring-[#0073e6] transition-all duration-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#003366]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {isSignup && (
            <div className="relative mt-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={signupInputs.confirmPassword}
                onChange={(e) => handleChange(e, "signup")}
                className="w-full p-3 border-2 border-[#0073e6] rounded-lg outline-none focus:border-[#0059b3] focus:ring-2 focus:ring-[#0073e6] transition-all duration-300"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#003366]"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}

          {!isSignup && (
            <a
              href="#"
              className="block mt-3 text-[#0073e6] text-sm hover:underline"
            >
              Forgot Password?
            </a>
          )}

          <button
            type="submit"
            className="w-full mt-5 p-3 bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] text-white text-lg font-semibold rounded-lg transition-transform duration-300 transform hover:scale-105"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
