import { useState, useEffect } from "react";

const SecureVaultAd = ({
  isPopup = false,
  onClose = null,
  onRemindLater = null,
}) => {
  const [isVisible, setIsVisible] = useState(!isPopup);
  const [showFullPopup, setShowFullPopup] = useState(false);

  const handleVisitSite = () => {
    window.open("https://passwordmanager-mu.vercel.app/", "_blank");
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
    }
  };

  const handleRemindLater = () => {
    if (onRemindLater) {
      onRemindLater();
    }
    handleClose();
  };

  const handleSidebarClick = () => {
    setShowFullPopup(true);
  };

  const handlePopupClose = () => {
    setShowFullPopup(false);
  };

  // Add the CSS as a style element in the head
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes marquee {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .animate-marquee {
        animation: marquee 15s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!isVisible && !isPopup) return null;

  // Sidebar Marquee Version
  const SidebarMarquee = () => (
    <>
      <div
        onClick={handleSidebarClick}
        className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Animated Background Dots */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute -bottom-1 -left-1 w-6 h-6 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Marquee Container */}
        <div className="relative z-10 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block text-white font-semibold text-sm">
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Try SecureVault? 🔐 Secure Password Manager by Shivam Karn
              <span className="mx-4">•</span>
              Try SecureVault? 🔐 Secure Password Manager by Shivam Karn
              <span className="mx-4">•</span>
            </span>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      </div>

      {/* Full Popup when clicked */}
      {showFullPopup && <FullPopupAd onClose={handlePopupClose} />}
    </>
  );

  // Full Popup Ad Component
  const FullPopupAd = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
        <div className="relative p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 bg-purple-400 rounded-full blur-xl"></div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 z-20"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">SecureVault</h3>
                <p className="text-xs text-blue-600 font-medium">
                  Password Manager
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              <span className="font-semibold">
                Forget passwords frequently?
              </span>{" "}
              Store them safely with our secure password manager!
            </p>

            <div className="bg-white/70 rounded-xl p-3 mb-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-700">
                  End-to-end encryption
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-700">
                  Auto-fill passwords
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-700">
                  Cross-platform sync
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative z-10">
            <button
              onClick={handleVisitSite}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-2"
            >
              Try SecureVault Now
            </button>
          </div>

          {/* Creator Credit */}
          <div className="relative z-10 mt-3 pt-3 border-t border-blue-200/50">
            <p className="text-xs text-gray-500 text-center">
              Created by{" "}
              <span className="font-semibold text-blue-600">Shivam Karn</span> •
              Same creator of this blog platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Regular Popup Version (from SecureVaultPopup component)
  const RegularPopupAd = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
        <div className="relative p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 bg-purple-400 rounded-full blur-xl"></div>
          </div>

          {/* Header */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">SecureVault</h3>
                <p className="text-xs text-blue-600 font-medium">
                  Password Manager
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              <span className="font-semibold">
                Forget passwords frequently?
              </span>{" "}
              Store them safely with our secure password manager!
            </p>

            <div className="bg-white/70 rounded-xl p-3 mb-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-700">
                  End-to-end encryption
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-700">
                  Auto-fill passwords
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs font-medium text-gray-700">
                  Cross-platform sync
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex gap-3">
            <button
              onClick={handleVisitSite}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-2"
            >
              Try SecureVault
            </button>
            <button
              onClick={handleRemindLater}
              className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200"
            >
              Remind Later
            </button>
            <button
              onClick={handleClose}
              className="px-3 py-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Creator Credit */}
          <div className="relative z-10 mt-3 pt-3 border-t border-blue-200/50">
            <p className="text-xs text-gray-500 text-center">
              Created by{" "}
              <span className="font-semibold text-blue-600">Shivam Karn</span> •
              Same creator of this blog platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Return appropriate version based on isPopup prop
  if (isPopup) {
    return <RegularPopupAd />;
  }

  return <SidebarMarquee />;
};

export default SecureVaultAd;
