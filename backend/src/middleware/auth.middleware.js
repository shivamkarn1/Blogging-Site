import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js';

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Extract token from "Bearer <token>" format
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Optional: attach user info to request
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token!" });
    }
}

export { auth }