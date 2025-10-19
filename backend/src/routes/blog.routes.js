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
import { auth } from "../middleware/auth.middleware.js";

const blogRouter = Router();

// NON PROTECTED ROUTES
blogRouter.get("/all", getAllBlog); // This returns only published blogs
blogRouter.get("/:blogId", getBlogById);

blogRouter.post("/add-comment", addComment);
blogRouter.get("/comments/:blogId", getBlogComments);

// PROTECTED ROUTES (require authentication)
blogRouter.get("/admin/all", auth, getAllBlogsAdmin);
blogRouter.post("/add", upload.single("featuredImage"), auth, addBlog);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.patch("/:blogId", auth, upload.single("featuredImage"), updateBlog);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
