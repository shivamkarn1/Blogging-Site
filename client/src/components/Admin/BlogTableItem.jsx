import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { axios, token, user } = useAppContext();
  const isAdmin = user?.userType === "admin";

  const deleteBlog = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "/api/v1/blog/delete",
        { blogId: blog._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
        setShowDeleteModal(false);
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete blog"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublish = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.post(
        "/api/v1/blog/toggle-publish",
        { blogId: blog._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed to toggle publish status");
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to toggle publish status"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <tr className="hover:bg-amber-50/50 transition-colors">
        <td className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-xs sm:text-sm text-amber-800 font-medium">
          {index}
        </td>
        <td className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
          <div className="max-w-xs">
            <h3 className="text-xs sm:text-sm font-semibold text-amber-900 line-clamp-2">
              {blog.title}
            </h3>
            {blog.subTitle && (
              <p className="text-xs text-amber-600 mt-1 line-clamp-1">
                {blog.subTitle}
              </p>
            )}
          </div>
        </td>
        <td className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-xs sm:text-sm text-amber-700 hidden md:table-cell">
          {formatDate(blog.createdAt)}
        </td>
        <td className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 hidden sm:table-cell">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              blog.isPublished
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {blog.isPublished ? "Published" : "Draft"}
          </span>
        </td>
        <td className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={togglePublish}
                disabled={isLoading}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  blog.isPublished
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "..." : blog.isPublished ? "Unpublish" : "Publish"}
              </button>
            )}

            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isLoading}
              className={`px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Premium Delete Confirmation Modal - Using Portal */}
      {showDeleteModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-2xl shadow-2xl border border-orange-200/50 animate-in zoom-in-95 duration-200">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 rounded-2xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-200/50 rounded-lg transition-colors"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-xl opacity-40 animate-pulse" />
                    <div className="relative p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-900 to-amber-800 bg-clip-text text-transparent mb-3">
                    Delete Blog Post?
                  </h3>
                  <p className="text-orange-800/80 leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-orange-900">
                      "{blog.title}"
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 text-sm font-semibold text-orange-700 bg-white hover:bg-orange-50 border-2 border-orange-300 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteBlog}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      "Delete Permanently"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default BlogTableItem;
