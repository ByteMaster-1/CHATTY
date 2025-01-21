import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import User from '../models/user.model.js';
dotenv.config();

//middleware for checking cookie with jwt
export const protectRoute = async (req, res, next) => {
        const { email } = req.body;
        try {
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ msg: "User not authenticated token not found" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ msg: "User not authenticated" });
            }
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(401).json({ msg: "User not authenticated not found" });
            }
            req.user = user;
            next();
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

}