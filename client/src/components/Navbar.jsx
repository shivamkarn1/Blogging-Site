import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
const Navbar = () => {
  const { navigate, token, user, triggerSocialGlow } = useAppContext();

  const handleAuthClick = () => {
    if (token && user) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const getButtonText = () => {
    if (token && user) {
      return user.userType === "admin" ? "Admin Dashboard" : "My Dashboard";
    }
    return "Login";
  };

  const handleContactClick = () => {
    // Scroll to footer smoothly
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    // Trigger social media glow effect after a small delay
    setTimeout(() => {
      triggerSocialGlow();
    }, 800); // Delay to allow scroll to complete
  };

  return (
    <div className="flex justify-between items-start py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo and Contact Section */}
      <div className="flex flex-col items-center gap-3">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="cursor-pointer h-40 sm:h-28 md:h-16 w-auto object-contain rounded-4xl border border-amber-800"
        />

        {/* Contact Button beneath logo */}
        <button
          onClick={handleContactClick}
          aria-label="Contact"
          className="relative flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300/40 shadow-md transition-all duration-300 group"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Contact</span>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Scroll to Contact & Social Media
          </div>
        </button>
      </div>

      {/* Auth Button */}
      <button
        type="button"
        onClick={handleAuthClick}
        aria-label="Sign in"
        className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-amber-300/40 shadow-lg transition-transform"
      >
        {getButtonText()}
        <img src={assets.arrow} className="w-3 sm:w-4" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
