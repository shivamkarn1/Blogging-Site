import express,{Router} from 'express'
import { addBlog } from '../controllers/blog.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import {auth} from "../middleware/auth.middleware.js"
const blogRouter = Router();

blogRouter.post("/add",upload.single('image'),auth,addBlog)

export default blogRouter;