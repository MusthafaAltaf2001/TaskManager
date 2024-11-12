import { forgotPassword, getUserProfile, resetPassword, signIn, signUp, signout } from "../controllers/userController";

import { authenticate } from "../middlewares/authenticate";
import express from "express";

const router = express.Router();

// User Routes
router.post("/signup", signUp); // User Signup
router.post("/login", signIn); // User Signin
router.post("/forgotPassword", forgotPassword) // Forgot password
router.post("/resetPassword/:token", resetPassword) // Reset password
router.get("/signout", signout) // Signout user
router.get("/profile", authenticate, getUserProfile); // Fetch user profile (Protected route)

export default router;
