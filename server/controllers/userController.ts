import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema";
import { signUpSchema, signInSchema } from "../lib/userType";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "taskflow_bdw0w";

// Register (Sign Up) a new user
export const signUp = async (req: Request, res: Response) => {
  try {
    // Validate request body
    signUpSchema.parse(req.body);

    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

// Login (Sign In) an existing user
export const signIn = async (req: Request, res: Response) => {
  try {
    // Validate request body
    signInSchema.parse(req.body);

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        // domain: 'http://localhost:3000',
        // sameSite: "none",
        // secure: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({
        message: "Logged in successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      })
      .status(200)
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};

// Get User Profile (Protected route example)
export const getUserProfile = async (req: Request, res: Response) => {
  // console.log(req.cookies);

  //@ts-ignore
  const userId = req.user?.userId; // Extract user ID from the request
  try {
    // Find the user by ID and populate the tasks. Get all the tasks that are not deleted
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "tasks",
        match: {
          isDeleted: { $ne: true } // Gets all the tasks that are not deleted
        }
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({
        message: "User profile fetched successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        tasks: user.tasks,
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};