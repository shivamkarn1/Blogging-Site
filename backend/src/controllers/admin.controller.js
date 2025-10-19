import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (
      email != process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password for ADMIN LOGIN",
      });
    }

    // Set token expiration based on rememberMe
    const expiresIn = rememberMe ? "10d" : "1d"; // 10 days if remember me, 1 day if not

    const token = jwt.sign(
      {
        email,
        userType: "admin",
        name: "Admin",
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      user: {
        email,
        name: "Admin",
        userType: "admin",
      },
      expiresIn: rememberMe ? 10 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // in milliseconds
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllComments = asyncHandler(async (req, res) => {
  try {
    // Only admins can see all comments
    const { userType } = req.user;

    if (userType !== "admin") {
      throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    const comments = await Comment.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json(
        new ApiResponse(200, comments, "All Comments Fetched Successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while fetching comments"
    );
  }
});

const approveCommentById = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.body;
    const { userType } = req.user;

    if (userType !== "admin") {
      throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment approved successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while approving comment"
    );
  }
});

const deleteCommentById = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.body;
    const { userType } = req.user;

    if (userType !== "admin") {
      throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment deleted successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while deleting comment"
    );
  }
});

const getDashboardData = asyncHandler(async (req, res) => {
  try {
    const { userType, email } = req.user;

    // Build filters based on user type
    let blogFilter = {};
    let commentFilter = {};

    if (userType === "user") {
      // Users can only see their own blog statistics
      blogFilter.authorEmail = email;
      // For comments, we'll show comments on their blogs
      const userBlogs = await Blog.find(blogFilter).select("_id");
      const userBlogIds = userBlogs.map((blog) => blog._id);
      commentFilter.blogId = { $in: userBlogIds };
    }
    // Admins see all data (no filter)

    const totalPublishedBlogs = await Blog.countDocuments({
      isPublished: true,
      ...blogFilter,
    });

    const totalComments = await Comment.countDocuments(commentFilter);

    const drafts = await Blog.countDocuments({
      isPublished: false,
      ...blogFilter,
    });

    const recentBlogs = await Blog.find(blogFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title subTitle isPublished createdAt authorName authorType");

    const dashboardData = {
      blogs: totalPublishedBlogs,
      comments: totalComments,
      drafts: drafts,
      recentBlogs: recentBlogs,
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          dashboardData,
          "Dashboard data fetched successfully"
        )
      );
  } catch (error) {
    console.error("Dashboard error:", error);
    throw new ApiError(
      500,
      error?.message || "Something went wrong while fetching dashboard data"
    );
  }
});

const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  try {
    const { userType, email } = req.user;

    let blogFilter = {};
    if (userType === "user") {
      // Users can only see their own blogs
      blogFilter.authorEmail = email;
    }
    // Admins see all blogs (no filter)

    const blogs = await Blog.find(blogFilter).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, blogs, `All Blogs Fetched Successfully`));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while fetching blogs"
    );
  }
});

export {
  adminLogin,
  getAllComments,
  approveCommentById,
  deleteCommentById,
  getDashboardData,
  getAllBlogsAdmin,
};
