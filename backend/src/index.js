import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db/db.js';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { log } from 'console';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=> res.send('Server is running Relax 😉...'));

connectDB()
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


const PORT = process.env.PORT || 8000;


export default app;