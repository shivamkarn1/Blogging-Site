import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const DashboardNavbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { navigate, token, user, setToken, setUser, axios } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");

    // Clear context state
    setToken(null);
    setUser(null);

    // Clear axios default header
    delete axios.defaults.headers.common["Authorization"];

    toast.success("Logged out successfully");
    navigate("/");
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const getUserDisplayName = () => {
    if (user) {
      return user.name || user.username || user.email || "User";
    }
    return "User";
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsDropdownOpen(false); // Close dropdown when hiding
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Hide navbar when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      setIsVisible(false);
      setIsDropdownOpen(false);
    } else {
      setIsVisible(true);
    }
  }, [isSidebarOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowLogoutModal(false);
      }
    };

    if (showLogoutModal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogoutModal]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsDropdownOpen(false);
    action();
  };

  const showLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center py-4 px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Left side - Dashboard Title */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu Button - Only visible on mobile when sidebar is closed */}
            <button
              onClick={onToggleSidebar}
              className={`md:hidden p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Dashboard Title */}
            <div>
              <h1 className="text-xl font-bold text-amber-900">
                {user?.userType === "admin" ? "Admin Panel" : "Dashboard"}
              </h1>
              <p className="text-sm text-amber-600 hidden sm:block">
                Welcome back, {getUserDisplayName()}
              </p>
            </div>
          </div>

          {/* Right side - User menu and actions */}
          <div className="flex items-center gap-3">
            {/* User Avatar and Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold text-sm">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-amber-900">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-amber-600 capitalize">
                    {user?.userType || "user"}
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-amber-100 transition-all duration-200 transform ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleMenuItemClick(showLogoutConfirmation)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump when navbar is fixed */}
      <div className="h-20"></div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { 
                opacity: 0;
                transform: scale(0.9) translateY(10px);
              }
              to { 
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes shimmer {
              0% { background-position: -1000px 0; }
              100% { background-position: 1000px 0; }
            }
            .modal-backdrop {
              animation: fadeIn 0.3s ease-out;
            }
            .modal-content {
              animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .icon-container {
              animation: float 3s ease-in-out infinite;
            }
            .warning-icon {
              animation: pulse 2s ease-in-out infinite;
            }
            .gradient-bg {
              background: linear-gradient(
                135deg,
                rgba(255, 154, 0, 0.1) 0%,
                rgba(251, 146, 60, 0.15) 25%,
                rgba(249, 115, 22, 0.1) 50%,
                rgba(234, 88, 12, 0.15) 75%,
                rgba(255, 154, 0, 0.1) 100%
              );
              background-size: 400% 400%;
              animation: gradientShift 8s ease infinite;
            }
            @keyframes gradientShift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .shimmer {
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.4),
                transparent
              );
              background-size: 200% 100%;
              animation: shimmer 3s infinite;
            }
            .glow-effect {
              box-shadow: 
                0 0 20px rgba(249, 115, 22, 0.3),
                0 0 40px rgba(251, 146, 60, 0.2),
                0 10px 50px rgba(234, 88, 12, 0.15);
            }
            .button-hover {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .button-hover:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
            }
            .button-hover:active {
              transform: translateY(0);
            }
            .cancel-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
          `}</style>

          <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-orange-500/20 via-orange-600/20 to-red-500/20 backdrop-blur-md">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-20 right-20 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="modal-content relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden glow-effect">
              {/* Decorative top bar with gradient */}
              <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 relative overflow-hidden">
                <div className="shimmer absolute inset-0"></div>
              </div>

              {/* Gradient background overlay */}
              <div className="gradient-bg absolute inset-0 opacity-50"></div>

              <div className="relative p-8">
                {/* Icon Container */}
                <div className="icon-container flex justify-center mb-6">
                  <div className="relative">
                    {/* Rotating ring */}
                    <div
                      className="absolute inset-0 rounded-full border-4 border-orange-200 animate-spin"
                      style={{ animationDuration: "3s" }}
                    ></div>

                    {/* Main icon circle */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                      <div className="warning-icon w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-30"></div>
                    <div
                      className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-20"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                </div>

                {/* Modal Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
                    Confirm Logout
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to logout?
                  </p>
                </div>

                {/* Modal Content */}
                <div className="mb-8 text-center">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200/50">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      You will be redirected to the home page and need to login
                      again to access your dashboard.
                    </p>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={cancelLogout}
                    className="cancel-button flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="button-hover flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                      </svg>
                      Logout
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>

              {/* Decorative bottom accent */}
              <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardNavbar;
