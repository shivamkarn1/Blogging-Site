import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import adminRouter from "./routes/admin.routes.js"
import blogRouter from './routes/blog.routes.js';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended: true ,limit:"16kb"}));

app.get('/',(req,res)=> res.send('Server is running Relax 😉...'));

await connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error("Error : ",error);
        throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.error("MongoDB Connection Failed: ", error);
})

// Routes 
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/blog',blogRouter)

const PORT = process.env.PORT || 8000;


export default app;