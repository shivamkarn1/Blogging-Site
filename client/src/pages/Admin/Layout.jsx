import { useNavigate, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/Admin/Sidebar";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

const Layout = () => {
  const { user, logout } = useAppContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const isAdmin = user?.userType === "admin";
  const displayName = isAdmin ? "Admin" : user?.name || "User";

  return (
    <>
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-amber-50 via-yellow-50 to-rose-50 border-b border-amber-200 shadow-sm">
        <img
          src="../../public/blogify-high-resolution-logo.png"
          alt="Blogify logo"
          className="h-40 sm:h-28 md:h-16 w-auto object-contain rounded-4xl border border-amber-800"
        />

        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="text-right">
            <p className="text-sm font-semibold text-amber-900">
              Welcome, {displayName}
            </p>
            <p className="text-xs text-amber-600">
              {isAdmin ? "Administrator" : "Blogger"} Dashboard
            </p>
          </div>

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={handleLogoutClick}
            className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-rose-300/40 shadow-lg transition-transform group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 group-hover:rotate-12 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to login again to
              access the dashboard.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
