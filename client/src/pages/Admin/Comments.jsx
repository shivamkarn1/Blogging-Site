import { useState, useEffect } from "react";
import CommentTableItem from "../../components/Admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  const { axios, token } = useAppContext();

  const fetchComments = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/admin/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setComments(data.data || []);
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error("Fetch comments error:", error);
      showErrorToast(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchComments();
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setTimeout(() => {
          fetchComments();
        }, 100);
      } else {
        setLoading(false);
      }
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen pt-5 sm:pt-12 px-4 sm:pl-16 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <p className="text-amber-600 text-sm font-medium">
            Loading comments...
          </p>
        </div>
      </div>
    );
  }

  const approvedCount = comments.filter((c) => c.isApproved === true).length;
  const notApprovedCount = comments.filter(
    (c) => c.isApproved === false
  ).length;
  const filteredComments = comments.filter((comment) => {
    if (filter === "Approved") return comment.isApproved === true;
    return comment.isApproved === false;
  });

  return (
    <div className="flex-1 min-h-screen pt-5 sm:pt-12 px-4 sm:pl-16 pb-8 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-1">
            Comments
          </h1>
          <p className="text-sm text-amber-600">
            Manage and review all blog comments
          </p>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Approved
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-amber-900">
              {approvedCount}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Pending
              </p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-amber-900">
              {notApprovedCount}
            </p>
          </div>
        </div>

        {/* Filter Tabs - Mobile Optimized */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-1.5 mb-6 inline-flex w-full sm:w-auto">
          <button
            onClick={() => setFilter("Not Approved")}
            className={`flex-1 sm:flex-initial rounded-lg px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-all duration-200 ${
              filter === "Not Approved"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "text-gray-600 hover:text-amber-900 hover:bg-amber-50"
            }`}
          >
            <span className="hidden sm:inline">Pending Review</span>
            <span className="sm:hidden">Pending</span>
            <span className="ml-1.5 text-xs opacity-90">
              ({notApprovedCount})
            </span>
          </button>
          <button
            onClick={() => setFilter("Approved")}
            className={`flex-1 sm:flex-initial rounded-lg px-4 sm:px-6 py-2.5 sm:py-2 text-sm font-medium transition-all duration-200 ${
              filter === "Approved"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "text-gray-600 hover:text-amber-900 hover:bg-amber-50"
            }`}
          >
            Approved
            <span className="ml-1.5 text-xs opacity-90">({approvedCount})</span>
          </button>
        </div>

        {/* Table Container - Mobile Optimized */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                <tr>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 sm:py-4 text-left"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-amber-900 uppercase tracking-wide">
                      Blog Title & Comment
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 sm:py-4 text-left hidden md:table-cell"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-amber-900 uppercase tracking-wide">
                      Date
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 sm:py-4 text-right"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-amber-900 uppercase tracking-wide">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {filteredComments.length > 0 ? (
                  filteredComments.map((comment, index) => (
                    <CommentTableItem
                      key={comment._id}
                      comment={comment}
                      index={index + 1}
                      fetchComments={fetchComments}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-amber-900 font-medium mb-1">
                            No {filter.toLowerCase()} comments
                          </p>
                          <p className="text-sm text-amber-600">
                            Comments will appear here once submitted
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

        {/* Mobile Footer Info */}
        {filteredComments.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-amber-600">
              Showing {filteredComments.length} {filter.toLowerCase()}{" "}
              {filteredComments.length === 1 ? "comment" : "comments"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
