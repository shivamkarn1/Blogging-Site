import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import Register from "../User/Register";

const Login = () => {
  const { axios, setToken, navigate, setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("user"); // 'user' or 'admin'
  const [showRegister, setShowRegister] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkExistingSession = () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const userData = localStorage.getItem("user");

      if (token && tokenExpiry && userData) {
        const now = new Date().getTime();
        const expiryTime = parseInt(tokenExpiry);

        if (now < expiryTime) {
          // Token is still valid
          setToken(token);
          setUser(JSON.parse(userData));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          navigate("/admin");
          return;
        } else {
          // Token expired, clear storage
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          localStorage.removeItem("user");
        }
      }
    };

    checkExistingSession();
  }, [setToken, navigate, axios, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      loginType === "admin" ? "/api/v1/admin/login" : "/api/v1/user/login";

    try {
      const { data } = await axios.post(endpoint, {
        email,
        password,
        rememberMe,
      });

      console.log("Login response:", data); // Debug log

      if (data.success) {
        // Handle different response structures for admin vs user
        let token, user, expiresIn;

        if (loginType === "admin") {
          // Admin response structure
          token = data.token;
          user = data.user;
          expiresIn = data.expiresIn;
        } else {
          // User response structure (from ApiResponse)
          token = data.data.token;
          user = data.data.user;
          expiresIn = data.data.expiresIn;
        }

        setToken(token);
        setUser(user);

        // Store token, expiry time, and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Calculate expiry time
        const expiryTime = new Date().getTime() + expiresIn;
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        // Set authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const userTypeText = loginType === "admin" ? "Admin" : "User";
        toast.success(
          `${userTypeText} login successful! ${
            rememberMe ? "You will stay logged in for 10 days." : ""
          }`
        );
        navigate("/admin");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        toast.error(error.response.data?.message || "Invalid credentials");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (showRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 flex items-center justify-center p-6">
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-amber-900 mb-2">
                Create Account
              </h1>
              <p className="text-amber-700 text-sm">
                Join our blogging community
              </p>
            </div>

            <Register onSwitchToLogin={() => setShowRegister(false)} />

            <div className="mt-6 text-center">
              <p className="text-sm text-amber-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="font-semibold text-amber-800 hover:text-amber-900 transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 top-0 -left-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div
            className="absolute -z-10 bottom-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              <span className="text-amber-600">
                {loginType === "admin" ? "Admin" : "User"}
              </span>{" "}
              Login
            </h1>
            <p className="text-amber-700 text-sm">
              {loginType === "admin"
                ? "Enter your credentials to access the admin panel"
                : "Sign in to start blogging"}
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className="flex mb-6 bg-amber-50 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setLoginType("user")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                loginType === "user"
                  ? "bg-white text-amber-900 shadow-sm"
                  : "text-amber-600 hover:text-amber-800"
              }`}
            >
              User Login
            </button>
            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                loginType === "admin"
                  ? "bg-white text-amber-900 shadow-sm"
                  : "text-amber-600 hover:text-amber-800"
              }`}
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400"
                placeholder="Enter email...."
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400"
                  placeholder="............."
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors duration-200 focus:outline-none"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
                      xmlns="http://www.w3.org/2000/svg"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-amber-700 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                />
                <span className="group-hover:text-amber-800 transition-colors">
                  Remember me for 10 days
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              Login to Dashboard
            </button>
          </form>

          {loginType === "user" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-amber-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="font-semibold text-amber-800 hover:text-amber-900 transition-colors"
                >
                  Create one here
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-0 -left-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -z-10 bottom-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
