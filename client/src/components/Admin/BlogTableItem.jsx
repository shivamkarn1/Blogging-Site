import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { axios, token, user } = useAppContext();
  const isAdmin = user?.userType === "admin";

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete the blog?");
    if (!confirm) return;

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

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
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
          {/* Toggle Publish Button - Only for Admins */}
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

          {/* Delete Button */}
          <button
            onClick={deleteBlog}
            disabled={isLoading}
            className={`px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "..." : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
