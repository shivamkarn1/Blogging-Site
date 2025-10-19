import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const Register = ({ onSwitchToLogin }) => {
  const { axios } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showErrorToast("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      showErrorToast("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/v1/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        showSuccessToast("Registration successful! Please login to continue.");
        onSwitchToLogin();
      } else {
        showErrorToast(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showErrorToast(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors duration-200 focus:outline-none"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400"
          placeholder="Confirm your password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default Register;
