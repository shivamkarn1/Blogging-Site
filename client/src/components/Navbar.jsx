import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
const Navbar = () => {
  const { navigate, token, user } = useAppContext();

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

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="cursor-pointer h-40 sm:h-28 md:h-16 w-auto object-contain rounded-4xl border border-amber-800"
      />
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
