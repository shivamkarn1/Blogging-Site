import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import fs from 'fs';
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addBlog = asyncHandler(async (req, res) => {
    // Debug consoles
    console.log("=== CREATE BLOG DEBUG ===")
    console.log("req body is : ", req.body)
    console.log("req.file:", req.file);

    // 1. get contents
    const { title, subTitle, description, category, isPublished } = req.body;

    // 2. check for content fields
    if (!title || !subTitle || !description || !category) {
        throw new ApiError(400, "Title, Subtitle, Description and Category are required")
    }

    // 3. check for image and upload
    let featuredImageUrl = "";
    if (req.file) {
        const featuredImageLocalPath = req.file.path;
        const featuredImage = await uploadOnCloudinary(featuredImageLocalPath)
        featuredImageUrl = featuredImage?.url || ""
    }

    // 4. create blog directly (no need to fetch again)
    const blog = await Blog.create({
        title,
        subTitle,
        description,
        category,
        featuredImage: featuredImageUrl,
        isPublished: isPublished === 'true' || isPublished === true
    });

    // 5. send response immediately with created blog
    return res
        .status(201)
        .json(new ApiResponse(201, { blog }, "Blog Created Successfully"))
});