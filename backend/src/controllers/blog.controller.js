import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Comment } from "../models/comment.model.js";
import main from "../config/gemini.js";




const addBlog = asyncHandler(async (req, res) => {
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
const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        return res
            .status(200)
            .json(new ApiResponse(200, blogs , "All Blogs Fetched Successfully"))
    } catch (error) {
        throw new ApiError(400, "Error Fetching Blogs")
    }
})
const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        throw new ApiError(404, "Blog Id not Found")
    }
    const blog = await Blog.findById(blogId)
    if (!blog) {
        throw new ApiError(404, "Blog Post not found/ Doesn't Exists")
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            blog,
            "Blog post Fetched Successfully"
        )
        )
})

const deleteBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found/ Doesn't Exits")
    }
    await Blog.findByIdAndDelete(blogId);

    // ALso delte all the comments of this blog
    await Comment.deleteMany({blog:blogId});
    return res.json(new ApiResponse(200, {}, "Blog Deleted Successfully"))
})

const togglePublish = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId).select("-description");
    if (!blog) {
        throw new ApiError(404, "No blog found with such Blog Id")
    }
    blog.isPublished = !blog.isPublished;
    await blog.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200, { blog }, "Blog Publish status toggled Successfully"))

})

const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, subTitle, description, category } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "No blog found with such Blog Id")
    }
    let featuredImageUrl = blog.featuredImage;
    if (req.file) {
        const featuredImageLocalPath = req.file.path;
        const featuredImage = await uploadOnCloudinary(featuredImageLocalPath);
        featuredImageUrl = featuredImage?.url || blog.featuredImage;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
            title: title || blog.title,
            subTitle: subTitle || blog.subTitle,
            description: description || blog.description,
            featuredImage: featuredImageUrl
        }, { new: true }
    ).select("-token")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedBlog, "Blog updated SuccessFully")
        )


})

const addComment = asyncHandler(async (req, res) => {
    const { blogId, name, content } = req.body;
    
    if (!blogId || !name || !content) {
        throw new ApiError(400, "All fields are required");
    }
    
    // Check if blog exists
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
        throw new ApiError(404, "Blog not found");
    }
    
    const comment = await Comment.create({
        blogId: blogId, 
        name: name.trim(),
        content: content.trim(),
        isApproved: false
    });
    
    return res.status(201).json(
        new ApiResponse(201, comment, "Comment added successfully. It will be visible after approval.")
    );
});

const getBlogComments = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    
    if (!blogId) {
        throw new ApiError(400, "Blog ID is required");
    }
    
    // Check if blog exists
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
        throw new ApiError(404, "Blog not found");
    }
    
    // Get pagination parameters from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const comments = await Comment.find({ 
        blogId: blogId 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('name content createdAt');
    
    const totalComments = await Comment.countDocuments({ 
        blogId: blogId 
    });
    
    const totalPages = Math.ceil(totalComments / limit);
    
    return res.status(200).json(
        new ApiResponse(200, {
            comments,
            pagination: {
                currentPage: page,
                totalPages,
                totalComments,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        }, "Comments fetched successfully")
    );
});

const getAllBlogsAdmin = asyncHandler(async (req, res) => {
    try {
        // Get ALL blogs both published and unpublished for admin
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        
        return res
            .status(200)
            .json(new ApiResponse(200, blogs, "All Blogs Fetched Successfully (Admin)"));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching blogs");
    }
});

const generateContent = asyncHandler(async(req,res)=>{
    console.log("=== GENERATE CONTENT DEBUG ===");
    console.log("Request body:", req.body);
    
    const {prompt} = req.body;
    
    if (!prompt || prompt.trim() === '') {
        console.log("Error: No prompt provided");
        throw new ApiError(400, "Prompt is required");
    }
    
    console.log("Prompt:", prompt);
    
    try {
        console.log("Calling main function...");
        const content = await main(prompt + ' Generate a Blog Content for this topic in simple text format');
        console.log("Content generated:", content ? "Success" : "Failed");
        
        return res.status(200).json(new ApiResponse(200, content, "Content generated Successfully"));
    } catch (error) {
        console.error('Generate content error:', error);
        throw new ApiError(500, error.message || "Failed to generate content with AI");
    }
});



export {
    addBlog,
    getAllBlog,
    getAllBlogsAdmin,
    getBlogById,
    deleteBlogById,
    togglePublish,
    updateBlog,
    addComment,
    getBlogComments,
    generateContent
}