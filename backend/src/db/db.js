import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`🌲MongoDB connected Successfully: ${connectionInstance.connection.host}`);
    }catch(error){
        console.error(`🔥MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;