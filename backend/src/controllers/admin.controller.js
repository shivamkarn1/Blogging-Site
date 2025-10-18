import jwt from 'jsonwebtoken'; 
import { asyncHandler } from '../utils/asyncHandler.js';
import { Blog } from '../models/blog.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {Comment} from "../models/comment.model.js"

const adminLogin = async(req , res)=>{
    try {
        const {email,password} = req.body;
        if(email != process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false,message: "Invalid email or password for ADMIN LOGIN"});
        }
        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.status(200).json({success:true,message: "Admin logged in successfully",token});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});   
    }
}

const getAllBlogsAdmin = asyncHandler(async(req,res)=>{
    const blogs = await Blog.find({}).sort({createdAt:-1})
    return res.status(200).json(new ApiResponse(200,{blogs},"Blogs of admin fetched successfully"))
})

const getAllComments = asyncHandler(async(req,res)=>{
    const comments = await Comment.find({}).populate("blog").sort({createdAt:-1})
    return res.status(200).json(new ApiResponse(200,{comments},"All Comments fetched successfully"))
})

const getDashboardData = asyncHandler(async(req,res)=>{
    const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(6);
    const totalBlogs = await Blog.countDocuments()
    const totalComments = await Comment.countDocuments()

    const drafts = await Blog.countDocuments({isPublished:false})
    const dashboardData = {
        recentBlogs,totalBlogs,totalComments,drafts
    }
    return res.status(200).json(new ApiResponse(200,dashboardData,"Dashboard Data fetched successfully"))
})

const deleteCommentById = asyncHandler(async(req,res)=>{
    const {commentId} = req.body;
    await Comment.findByIdAndDelete(commentId)
    return res.status(200).json(new ApiResponse(200,{},"Comment Deleted Successfully"))
})
const approveCommentById = asyncHandler(async(req,res)=>{
    const {commentId} = req.body;
    await Comment.findByIdAndUpdate(commentId,{isApproved:true})
    return res.status(200).json(new ApiResponse(200,{},"Comment Approved Successfully"))
})





export {
    adminLogin,
    getAllBlogsAdmin,
    getAllComments,
    getDashboardData,
    deleteCommentById,
    approveCommentById


}

