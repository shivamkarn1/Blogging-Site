import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
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
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-500 mt-1">Manage your content</p>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
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
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`
            }
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8 15 4 4 4-4"
              />
            </svg>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-blog"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`
            }
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Blog
          </NavLink>

          <NavLink
            to="/admin/blog-list"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`
            }
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            All Blogs
          </NavLink>

          <NavLink
            to="/admin/comments"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`
            }
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Comments
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
