import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import SecureVaultAd from "./SecureVaultAd";

const Sidebar = ({ isOpen, onClose }) => {
  const [showAd, setShowAd] = useState(true);

  // Add the CSS as a style element in the head
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .animate-shimmer {
        animation: shimmer 1.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
        h-full w-64 md:w-64
        z-40
        flex flex-col 
        border-r border-gray-200 
        bg-white
        shadow-2xl md:shadow-sm
        transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100"
            : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 scale-95 md:scale-100"
        }
      `}
        style={{
          transformOrigin: "left center",
        }}
      >
        {/* Animated glow effect on open */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-orange-400/10 via-orange-300/10 to-orange-400/10 pointer-events-none transition-opacity duration-700 ${
            isOpen ? "opacity-100 animate-shimmer" : "opacity-0"
          }`}
          style={{
            backgroundSize: "200% 100%",
          }}
        ></div>

        {/* Sidebar Header */}
        <div
          className={`px-5 py-5 border-b border-gray-200 relative transition-all duration-500 ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 md:translate-y-0 md:opacity-100"
          }`}
          style={{
            transitionDelay: isOpen ? "100ms" : "0ms",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
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
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"></div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5 p-3 flex-1 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              } ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0 md:translate-x-0 md:opacity-100"
              }`
            }
            style={{
              transitionDelay: isOpen ? "200ms" : "0ms",
              transitionProperty: "all",
            }}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            <span className="text-sm font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/add-blog"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              } ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0 md:translate-x-0 md:opacity-100"
              }`
            }
            style={{
              transitionDelay: isOpen ? "300ms" : "0ms",
              transitionProperty: "all",
            }}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            <span className="text-sm font-medium">Add Blog</span>
          </NavLink>

          <NavLink
            to="/admin/blog-list"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              } ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0 md:translate-x-0 md:opacity-100"
              }`
            }
            style={{
              transitionDelay: isOpen ? "400ms" : "0ms",
              transitionProperty: "all",
            }}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            <span className="text-sm font-medium">All Blogs</span>
          </NavLink>

          <NavLink
            to="/admin/comments"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              } ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0 md:translate-x-0 md:opacity-100"
              }`
            }
            style={{
              transitionDelay: isOpen ? "500ms" : "0ms",
              transitionProperty: "all",
            }}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            <span className="text-sm font-medium">Comments</span>
          </NavLink>

          {/* SecureVault Ad */}
          {showAd && (
            <div
              className={`mt-4 transition-all duration-500 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0 md:translate-x-0 md:opacity-100"
              }`}
              style={{
                transitionDelay: isOpen ? "600ms" : "0ms",
              }}
            >
              <SecureVaultAd />
            </div>
          )}
        </nav>

        {/* Footer */}
        <div
          className={`p-3 border-t border-gray-200 bg-gray-50 transition-all duration-500 ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 md:translate-y-0 md:opacity-100"
          }`}
          style={{
            transitionDelay: isOpen ? "700ms" : "0ms",
          }}
        >
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Need Help?
            </p>
            <a
              href="https://github.com/shivamkarn1/Blogging-Site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-2 rounded-lg border border-orange-200 hover:border-orange-300 transition-all duration-200 w-full group"
            >
              Check our documentation
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
