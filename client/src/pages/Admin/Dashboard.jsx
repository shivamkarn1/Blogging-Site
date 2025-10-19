import { useEffect } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import { useState } from "react";
import BlogTableItem from "../../components/Admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  const { axios, token } = useAppContext();

  const fetchDashboardData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const responseData = data.data || {};
        setDashboardData({
          blogs: responseData.blogs || 0,
          comments: responseData.comments || 0,
          drafts: responseData.drafts || 0,
          recentBlogs: responseData.recentBlogs || [],
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setTimeout(() => {
          fetchDashboardData();
        }, 100);
      } else {
        setLoading(false);
      }
    }
  }, [token]);

  const getTotalArticles = () => {
    const blogs = Number(dashboardData.blogs) || 0;
    const drafts = Number(dashboardData.drafts) || 0;
    return blogs + drafts;
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 sm:h-16 sm:w-16 border-4 border-amber-200 border-t-amber-500 mx-auto mb-4"></div>
          <p className="text-amber-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900 mb-2 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-amber-600">
            Overview of your blog statistics
          </p>
        </div>

        {/* Content Overview Card */}
        <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-50 rounded-3xl shadow-xl border border-amber-200/50 p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 backdrop-blur-sm">
          <h2 className="text-lg sm:text-xl font-bold text-amber-900 mb-5 sm:mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-full"></span>
            Content Overview
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {/* Total Articles Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col h-full justify-between">
                <p className="text-xs sm:text-sm font-medium text-amber-100 mb-2 sm:mb-3">
                  Total Articles
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {getTotalArticles()}
                </p>
              </div>
            </div>

            {/* Published Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col h-full justify-between">
                <p className="text-xs sm:text-sm font-medium text-green-100 mb-2 sm:mb-3">
                  Published
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {dashboardData.blogs || 0}
                </p>
              </div>
            </div>

            {/* Drafts Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col h-full justify-between">
                <p className="text-xs sm:text-sm font-medium text-blue-100 mb-2 sm:mb-3">
                  Drafts
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {dashboardData.drafts || 0}
                </p>
              </div>
            </div>

            {/* Comments Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col h-full justify-between">
                <p className="text-xs sm:text-sm font-medium text-purple-100 mb-2 sm:mb-3">
                  Comments
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {dashboardData.comments || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Blogs Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-amber-100/50 overflow-hidden backdrop-blur-sm">
          <div className="p-5 sm:p-6 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
                <img
                  src={assets.dashboard_icon_4}
                  alt=""
                  className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-900">
                Latest Blogs
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                <tr>
                  <th
                    scope="col"
                    className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-amber-800 font-semibold text-xs sm:text-sm"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-amber-800 font-semibold text-xs sm:text-sm"
                  >
                    Blog Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-amber-800 font-semibold text-xs sm:text-sm hidden md:table-cell"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-amber-800 font-semibold text-xs sm:text-sm hidden sm:table-cell"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-amber-800 font-semibold text-xs sm:text-sm"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {dashboardData.recentBlogs &&
                dashboardData.recentBlogs.length > 0 ? (
                  dashboardData.recentBlogs.map((blog, index) => (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchDashboardData}
                      index={index + 1}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-2xl bg-amber-100 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-amber-400"
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
                        </div>
                        <p className="text-amber-600 font-medium text-sm sm:text-base">
                          No recent blogs found
                        </p>
                        <p className="text-amber-500 text-xs sm:text-sm mt-1">
                          Create your first blog post to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
