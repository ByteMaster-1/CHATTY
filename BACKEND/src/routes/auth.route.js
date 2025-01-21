import express from 'express';
import { login, logout, signup ,updateProfile,checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const app=express();


const router=express.Router();

router.post("/signup", signup);

router.post("/login",login);

router.post("/logout",logout);
// add a middleware to protect the route
router.put("/update-profile",protectRoute, updateProfile);

router.get("/check",protectRoute,checkAuth);

export default router;
