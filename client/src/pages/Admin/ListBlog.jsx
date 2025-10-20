import { useEffect, useState } from "react";
import BlogTableItem from "../../components/Admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { axios, token, user } = useAppContext();
  const isAdmin = user?.userType === "admin";

  const fetchBlogs = async () => {
    if (!token) {
      console.log("No token available, skipping fetch");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Use the correct endpoint for fetching admin blogs
      const { data } = await axios.get("/api/v1/blog/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetch blogs response:", data);

      if (data.success) {
        setBlogs(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch blogs"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Wait for token to be available before fetching
  useEffect(() => {
    const initializeBlogs = async () => {
      if (token) {
        await fetchBlogs();
      } else {
        // Token might be loading from localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          // Token exists but context hasn't updated yet, wait a bit
          setTimeout(() => {
            fetchBlogs();
          }, 100);
        } else {
          setLoading(false);
          toast.error("Please login to access admin panel");
        }
      }
    };

    initializeBlogs();
  }, [token]);

  // Filter blogs based on search and filters
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.subTitle &&
        blog.subTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && blog.isPublished) ||
      (filterStatus === "draft" && !blog.isPublished);

    return matchesSearch && matchesStatus;
  });

  // Get statistics
  const getStats = () => {
    const total = blogs.length;
    const published = blogs.filter((blog) => blog.isPublished).length;
    const drafts = blogs.filter((blog) => !blog.isPublished).length;

    return { total, published, drafts };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <p className="ml-4 text-amber-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">
          {isAdmin ? "All Blog Posts" : "My Blog Posts"}
        </h1>
        <p className="text-amber-600">
          {isAdmin
            ? `Manage and organize all blog posts (${blogs.length} posts)`
            : `Manage your submitted blog posts (${blogs.length} posts)`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200/50">
          <p className="text-sm font-medium text-amber-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-amber-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-green-200/50">
          <p className="text-sm font-medium text-green-600 mb-1">Published</p>
          <p className="text-2xl font-bold text-green-700">{stats.published}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-yellow-200/50">
          <p className="text-sm font-medium text-yellow-600 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.drafts}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200/50 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search blogs by title, subtitle, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="mt-3 pt-3 border-t border-amber-100">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b border-amber-200">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-4 text-left text-amber-800 font-semibold"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 text-left text-amber-800 font-semibold"
                >
                  Blog Details
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 text-left text-amber-800 font-semibold max-sm:hidden"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 text-left text-amber-800 font-semibold max-sm:hidden"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 text-left text-amber-800 font-semibold"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => {
                  return (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchBlogs}
                      index={index + 1}
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-12 text-center text-amber-600"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-amber-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-amber-700 mb-1">
                          {searchTerm || filterStatus !== "all"
                            ? "No blogs match your filters"
                            : "No blogs found"}
                        </p>
                        <p className="text-sm text-amber-500">
                          {searchTerm || filterStatus !== "all"
                            ? "Try adjusting your search criteria or filters"
                            : "Create your first blog post to get started"}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Summary */}
      {filteredBlogs.length > 0 && filteredBlogs.length !== blogs.length && (
        <div className="mt-4 text-center">
          <p className="text-amber-600 text-sm">
            Showing {filteredBlogs.length} of {blogs.length} blog posts
          </p>
        </div>
      )}
    </div>
  );
};

export default ListBlog;
