import express,{Router} from 'express'
import { 
    addBlog, 
    addComment, 
    deleteBlogById, 
    getAllBlog, 
    getBlogById, 
    getBlogComments, 
    togglePublish, 
    updateBlog 
} from '../controllers/blog.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import {auth} from "../middleware/auth.middleware.js"


const blogRouter = Router();

// NON PROTECTED ROUTES
blogRouter.get('/all',getAllBlog)
blogRouter.get("/:blogId",getBlogById)

blogRouter.post('/add-comment',addComment)
blogRouter.get("/comments/:blogId",getBlogComments)

// PROTECTED ROUTES
blogRouter.post("/add",upload.single('image'),auth,addBlog)
blogRouter.post('/delete',auth,deleteBlogById)
blogRouter.post("/toggle-publish",auth,togglePublish)
blogRouter.patch("/:blogId", auth, upload.single('image'), updateBlog)


export default blogRouter;