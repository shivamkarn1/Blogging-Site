import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed Position - Only show when closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-6 left-4 z-50 p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
            <span className="block w-6 h-0.5 bg-white rounded-full"></span>
            <span className="block w-6 h-0.5 bg-white rounded-full"></span>
            <span className="block w-6 h-0.5 bg-white rounded-full"></span>
          </div>
        </button>
      )}

      {/* Backdrop Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative
        top-0 left-0 
        h-full w-72 md:w-auto
        z-40
        flex flex-col 
        border-r border-gray-200 
        bg-gradient-to-b from-gray-50 to-white 
        shadow-2xl md:shadow-sm
        transition-all duration-500 ease-out
        ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
        }
      `}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-8 border-b border-gray-200 relative">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse-slow">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-500 mt-1">Manage your content</p>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={closeSidebar}
              className="md:hidden p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
          <NavLink
            end={true}
            to="/admin"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                isActive
                  ? "bg-primary/5 text-primary border-l-4 border-primary shadow-sm scale-[1.02]"
                  : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 rotate-0"
                      : "group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110"
                  }`}
                >
                  <img src={assets.home_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm transition-transform duration-300 group-hover:translate-x-1">
                  Dashboard
                </p>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                    isActive ? "hidden" : ""
                  }`}
                ></div>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/addBlog"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                isActive
                  ? "bg-primary/5 text-primary border-l-4 border-primary shadow-sm scale-[1.02]"
                  : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 rotate-0"
                      : "group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110"
                  }`}
                >
                  <img src={assets.add_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm transition-transform duration-300 group-hover:translate-x-1">
                  Add Blogs
                </p>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                    isActive ? "hidden" : ""
                  }`}
                ></div>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/listBlog"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                isActive
                  ? "bg-primary/5 text-primary border-l-4 border-primary shadow-sm scale-[1.02]"
                  : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 rotate-0"
                      : "group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110"
                  }`}
                >
                  <img src={assets.list_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm transition-transform duration-300 group-hover:translate-x-1">
                  List Blogs
                </p>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                    isActive ? "hidden" : ""
                  }`}
                ></div>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/admin/comments"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                isActive
                  ? "bg-primary/5 text-primary border-l-4 border-primary shadow-sm scale-[1.02]"
                  : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 rotate-0"
                      : "group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110"
                  }`}
                >
                  <img src={assets.comment_icon} alt="" className="w-5 h-5" />
                </div>
                <p className="font-medium text-sm transition-transform duration-300 group-hover:translate-x-1">
                  Comments
                </p>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                    isActive ? "hidden" : ""
                  }`}
                ></div>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <p className="text-xs font-semibold text-gray-700 mb-1 relative z-10">
              Need Help?
            </p>
            <p className="text-xs text-gray-500 relative z-10">
              Check our documentation
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
