import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BlogCard = ({ blog }) => {
  const { title, description, category, featuredImage, _id, createdAt } = blog;
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get reading time estimation
  const getReadingTime = (content) => {
    const words = content
      ? content.replace(/<[^>]*>/g, "").split(" ").length
      : 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 ease-out cursor-pointer border border-gray-100"
      style={{
        transform: isHovered
          ? "translateY(-8px) scale(1.02)"
          : "translateY(0) scale(1)",
      }}
    >
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-amber-600/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Section with Advanced Animations */}
      <div className="relative h-56 overflow-hidden">
        {featuredImage ? (
          <>
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
            )}

            <img
              src={featuredImage}
              alt={title || "Blog image"}
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
              } group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />

            {/* Dynamic overlay with glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating category badge */}
            <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover:scale-110">
              <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-lg border border-white/20">
                {category}
              </span>
            </div>

            {/* Reading time indicator */}
            <div className="absolute top-4 right-4 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150">
              <div className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {getReadingTime(description)}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full animate-float" />
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full animate-float-delayed" />
            </div>

            <div className="text-center z-10">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-300 to-amber-400 rounded-2xl flex items-center justify-center shadow-inner">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-gray-500 text-sm font-medium">
                Blog without Image
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section with Micro-interactions */}
      <div className="p-6 relative">
        {/* Animated border line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-orange-400 transition-colors duration-500" />

        {/* Title with character-by-character animation */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {title}
        </h3>

        {/* Description with fade-in effect */}
        <div
          className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 transition-all duration-300 group-hover:text-gray-700"
          dangerouslySetInnerHTML={{
            __html:
              description?.slice(0, 140) + "..." ||
              "No description available...",
          }}
        />

        {/* Metadata section with staggered animations */}
        <div className="flex items-center justify-end text-xs text-gray-500">
          {createdAt && (
            <div className="flex items-center gap-1 transform transition-transform duration-300 group-hover:-translate-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formatDate(createdAt)}</span>
            </div>
          )}
        </div>

        {/* Read more indicator with morphing arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-200">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <svg
              className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtle glow effect with orange theme */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-yellow-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </div>
  );
};

export default BlogCard;
