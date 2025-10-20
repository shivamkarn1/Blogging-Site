import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import main from "../config/gemini.js";
import mongoose from "mongoose"; // Add this import
import fs from "fs";
import path from "path";

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    // Only return published blogs for public viewing
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, blogs, "All Published Blogs Fetched Successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while fetching blogs"
    );
  }
});

const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

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

const addBlog = asyncHandler(async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = req.body;

    console.log("Add blog request body:", req.body);
    console.log("Add blog file:", req.file);

    if (!title || !description || !category) {
      // Clean up uploaded file if validation fails
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      throw new ApiError(400, "Title, description, and category are required");
    }

    if (category === "All") {
      // Clean up uploaded file if validation fails
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      throw new ApiError(400, "Please select a valid category");
    }

    let featuredImageUrl = "";
    if (req.file) {
      console.log("File path:", req.file.path);
      console.log("File exists:", fs.existsSync(req.file.path));

      // Check if file exists before uploading
      if (!fs.existsSync(req.file.path)) {
        throw new ApiError(
          400,
          "Uploaded file not found at path: " + req.file.path
        );
      }

      const featuredImageResult = await uploadOnCloudinary(req.file.path);
      if (featuredImageResult) {
        featuredImageUrl = featuredImageResult.secure_url;
        console.log("Image uploaded to cloudinary:", featuredImageUrl);
      } else {
        throw new ApiError(500, "Failed to upload image to cloudinary");
      }
    }

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      featuredImage: featuredImageUrl || "",
      isPublished: isPublished === "true" || isPublished === true,
    });

    console.log("Blog created successfully:", blog._id);

    return res
      .status(201)
      .json(new ApiResponse(201, blog, "Blog added successfully!"));
  } catch (error) {
    console.error("Add blog error:", error);

    // Clean up uploaded file if there's an error
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("Cleaned up uploaded file:", req.file.path);
      } catch (cleanupError) {
        console.error("Error cleaning up file:", cleanupError);
      }
    }

    throw new ApiError(
      500,
      error?.message || "Something went wrong while adding blog"
    );
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog fetched successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while fetching blog"
    );
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, subTitle, description, category, isPublished } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      // Clean up uploaded file if blog not found
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      throw new ApiError(404, "Blog not found");
    }

    // Handle image update
    let featuredImageUrl = blog.featuredImage;
    if (req.file) {
      console.log("Updating blog image, file path:", req.file.path);

      if (!fs.existsSync(req.file.path)) {
        throw new ApiError(
          400,
          "Uploaded file not found at path: " + req.file.path
        );
      }

      const featuredImageResult = await uploadOnCloudinary(req.file.path);
      if (featuredImageResult) {
        featuredImageUrl = featuredImageResult.secure_url;
      } else {
        throw new ApiError(500, "Failed to upload image to cloudinary");
      }
    }

    // Update fields
    const updateData = {
      title: title || blog.title,
      subTitle: subTitle || blog.subTitle,
      description: description || blog.description,
      category: category || blog.category,
      featuredImage: featuredImageUrl,
    };

    if (isPublished !== undefined) {
      updateData.isPublished = isPublished === "true" || isPublished === true;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
  } catch (error) {
    console.error("Update blog error:", error);

    // Clean up uploaded file if there's an error
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Error cleaning up file:", cleanupError);
      }
    }

    throw new ApiError(
      500,
      error?.message || "Something went wrong while updating blog"
    );
  }
});

const deleteBlogById = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      throw new ApiError(400, "Blog ID is required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    await Blog.findByIdAndDelete(blogId);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Blog deleted successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while deleting blog"
    );
  }
});

const togglePublish = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;
    const { userType } = req.user;

    console.log("Toggle publish request:", { blogId, userType });

    if (!blogId) {
      throw new ApiError(400, "Blog ID is required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    // Only admins should be able to toggle publish status
    if (userType !== "admin") {
      throw new ApiError(
        403,
        "Only administrators can publish/unpublish blogs"
      );
    }

    // Use findByIdAndUpdate with runValidators: false to bypass validation
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { isPublished: !blog.isPublished },
      {
        new: true,
        runValidators: false, // This will skip validation
        validateBeforeSave: false, // Additional validation bypass
      }
    );

    if (!updatedBlog) {
      throw new ApiError(500, "Failed to update blog");
    }

    const message = updatedBlog.isPublished
      ? "Blog published successfully"
      : "Blog unpublished successfully";

    return res.status(200).json(new ApiResponse(200, updatedBlog, message));
  } catch (error) {
    console.error("Toggle publish error:", error);
    throw new ApiError(
      500,
      error?.message || "Something went wrong while toggling publish status"
    );
  }
});

const addComment = asyncHandler(async (req, res) => {
  try {
    console.log("Add comment request body:", req.body);

    const { blogId, name, content } = req.body;

    // Validate required fields
    if (!blogId || !name || !content) {
      throw new ApiError(400, "Blog ID, name, and content are required");
    }

    // Validate blogId format
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw new ApiError(400, "Invalid blog ID format");
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    // Create comment
    const comment = await Comment.create({
      blogId,
      name: name.trim(),
      content: content.trim(),
      isApproved: false, // Comments need approval
    });

    console.log("Comment created successfully:", comment._id);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          comment,
          "Comment added successfully. It will be visible after approval."
        )
      );
  } catch (error) {
    console.error("Add comment error:", error);
    console.error("Error stack:", error.stack);

    // Handle specific mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      throw new ApiError(400, `Validation error: ${errors.join(", ")}`);
    }

    // Handle mongoose cast errors
    if (error.name === "CastError") {
      throw new ApiError(400, "Invalid data format provided");
    }

    throw new ApiError(
      500,
      error?.message || "Something went wrong while adding comment"
    );
  }
});

const getBlogComments = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    // Only show approved comments to public
    const comments = await Comment.find({
      blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments fetched successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while fetching comments"
    );
  }
});

const generateContent = asyncHandler(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      throw new ApiError(400, "Prompt is required");
    }

    // Check if GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY) {
      throw new ApiError(500, "AI service not configured");
    }

    // Use the main function from gemini config
    const generatedText = await main(prompt);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { content: generatedText },
          "Content generated successfully"
        )
      );
  } catch (error) {
    console.error("Content generation error:", error);
    throw new ApiError(500, error?.message || "Failed to generate content");
  }
});

export {
  addBlog,
  getAllBlog,
  getAllBlogsAdmin,
  getBlogById,
  updateBlog,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
  generateContent,
};
