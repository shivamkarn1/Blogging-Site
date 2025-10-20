import express, { Router } from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlog,
  getAllBlogsAdmin,
  getBlogById,
  getBlogComments,
  togglePublish,
  updateBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js"; // Make sure this import exists

const blogRouter = Router();

// NON PROTECTED ROUTES
blogRouter.get("/all", getAllBlog);
blogRouter.post("/add-comment", addComment);

// PROTECTED ROUTES (require authentication)
blogRouter.get("/admin/all", auth, getAllBlogsAdmin);
blogRouter.post("/add", upload.single("featuredImage"), auth, addBlog);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish); // This should come BEFORE the /:blogId route
blogRouter.patch("/:blogId", auth, upload.single("featuredImage"), updateBlog);
blogRouter.post("/generate", auth, generateContent);

blogRouter.get("/comments/:blogId", getBlogComments);
blogRouter.get("/:blogId", getBlogById); // This should be at the end

export default blogRouter;
