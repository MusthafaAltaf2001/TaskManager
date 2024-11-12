import express from "express";
import { signUp, signIn, getUserProfile, forgotPassword, resetPassword, signout } from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// User Routes
router.post("/signup", signUp); // User Signup
router.post("/login", signIn); // User Signin
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword/:token", resetPassword)
router.get("/signout", signout)
router.get("/profile", authenticate, getUserProfile); // Fetch user profile (Protected route)

export default router;
