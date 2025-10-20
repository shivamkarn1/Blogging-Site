import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { createPortal } from "react-dom";
import Moment from "moment";

const CommentTableItem = ({ comment, index, fetchComments }) => {
  const { axios, token } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const approveComment = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/admin/approve-comment`,
        { commentId: comment._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        showSuccessToast("Comment approved successfully");
        fetchComments();
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error("Approve comment error:", error);
      showErrorToast(error.response?.data?.message || error.message);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.post(
        `/api/v1/admin/delete-comment`,
        { commentId: comment._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        showSuccessToast("Comment deleted successfully");
        fetchComments();
        setShowDeleteModal(false);
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error("Delete comment error:", error);
      showErrorToast(error.response?.data?.message || error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const showDeleteConfirmation = () => {
    setShowDeleteModal(true);
  };

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowDeleteModal(false);
      }
    };

    if (showDeleteModal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDeleteModal]);

  const DeleteModal = () => (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes trashShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes dangerPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        @keyframes ripple {
          0% { 
            transform: scale(1);
            opacity: 0.6;
          }
          100% { 
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes warningBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .delete-modal-backdrop {
          animation: modalFadeIn 0.3s ease-out;
        }
        .delete-modal-content {
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .trash-icon-container {
          animation: dangerPulse 2s ease-in-out infinite;
        }
        .trash-icon {
          animation: trashShake 0.5s ease-in-out;
        }
        .ripple-effect {
          animation: ripple 2s ease-out infinite;
        }
        .gradient-animated {
          background: linear-gradient(
            135deg,
            rgba(239, 68, 68, 0.1) 0%,
            rgba(220, 38, 38, 0.15) 25%,
            rgba(239, 68, 68, 0.1) 50%,
            rgba(185, 28, 28, 0.15) 75%,
            rgba(239, 68, 68, 0.1) 100%
          );
          background-size: 400% 400%;
          animation: gradientFlow 8s ease infinite;
        }
        .danger-glow {
          box-shadow: 
            0 0 30px rgba(239, 68, 68, 0.4),
            0 0 60px rgba(220, 38, 38, 0.3),
            0 15px 60px rgba(185, 28, 28, 0.2);
        }
        .delete-button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .delete-button-hover:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 30px rgba(239, 68, 68, 0.5);
        }
        .delete-button-hover:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
        }
        .cancel-button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cancel-button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .warning-stripe {
          background: repeating-linear-gradient(
            45deg,
            rgba(239, 68, 68, 0.1),
            rgba(239, 68, 68, 0.1) 10px,
            rgba(220, 38, 38, 0.15) 10px,
            rgba(220, 38, 38, 0.15) 20px
          );
          animation: warningBlink 3s ease-in-out infinite;
        }
        @keyframes shimmerDelete {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer-delete {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmerDelete 3s infinite;
        }
      `}</style>

      <div className="delete-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-red-500/20 via-rose-600/20 to-pink-500/20 backdrop-blur-md">
        {/* Animated danger particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="delete-modal-content relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden danger-glow">
          {/* Danger warning stripe */}
          <div className="warning-stripe h-3 relative overflow-hidden">
            <div className="shimmer-delete absolute inset-0"></div>
          </div>

          {/* Gradient background overlay */}
          <div className="gradient-animated absolute inset-0 opacity-50"></div>

          <div className="relative p-8">
            {/* Trash Icon Container with Multiple Effects */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Ripple effects */}
                <div className="ripple-effect absolute inset-0 rounded-full border-4 border-red-400"></div>
                <div
                  className="ripple-effect absolute inset-0 rounded-full border-4 border-rose-400"
                  style={{ animationDelay: "0.7s" }}
                ></div>

                {/* Rotating danger ring */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-400 border-r-rose-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                ></div>

                {/* Main icon circle */}
                <div className="trash-icon-container relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 flex items-center justify-center shadow-2xl">
                  <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center">
                    <svg
                      className="trash-icon w-12 h-12 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </div>

                {/* Pulsing danger rings */}
                <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-30"></div>
                <div
                  className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-20"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Delete Comment
              </h3>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <p className="text-gray-600 font-medium">
                  This action cannot be undone
                </p>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 border-2 border-red-200/50 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed text-center mb-3">
                  Are you sure you want to delete this comment? This will
                  permanently remove it from the system.
                </p>
              </div>

              {/* Comment preview with enhanced styling */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-red-300/50 bg-gradient-to-br from-red-100 via-rose-50 to-pink-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"></div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-red-900 mb-1">
                        {comment.name}
                      </p>
                      <p className="text-sm text-red-800 line-clamp-3 leading-relaxed">
                        "{comment.content}"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="cancel-button-hover flex-1 px-6 py-3.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="delete-button-hover flex-1 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isDeleting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6"
                        />
                      </svg>
                      Delete Forever
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-rose-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Decorative bottom danger bar */}
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 relative overflow-hidden">
            <div className="shimmer-delete absolute inset-0"></div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <tr className="hover:bg-amber-50">
        <td className="px-6 py-4">
          <div className="space-y-2">
            <p className="font-medium text-amber-900">
              {comment.blogId?.title || comment.blogId || "Unknown Blog"}
            </p>
            <p className="text-sm text-amber-700">
              <strong>{comment.name}:</strong> {comment.content}
            </p>
          </div>
        </td>
        <td className="px-6 py-4 max-sm:hidden text-amber-600">
          {Moment(comment.createdAt).format("MMM DD, YYYY")}
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            {!comment.isApproved && (
              <button
                onClick={approveComment}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                Approve
              </button>
            )}
            <button
              onClick={showDeleteConfirmation}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Render modal using createPortal to move it outside the table */}
      {showDeleteModal && createPortal(<DeleteModal />, document.body)}
    </>
  );
};

export default CommentTableItem;
