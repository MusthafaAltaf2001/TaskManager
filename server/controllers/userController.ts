import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema";
import { signUpSchema, signInSchema } from "../lib/userType";
import { EmailParams, Sender, Recipient } from "mailersend";
import { mailerSend } from "../lib/mailersendConfig";
import { getForgotPasswordEmail } from "../lib/emailTemplate";

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

// Reset user password 
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email });
    console.log(user)

    if (!user) {
      return res
        .status(403)
        .json({
          message: "User does not exist"
        })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send the reset token to the user's email
    const sentFrom = new Sender("MS_obeuxU@trial-jpzkmgqrq9v4059v.mlsender.net", "Mohamed Musthafa");
    const recipients = [
      new Recipient(user.email, user?.username)
    ];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Reset Password")
      .setHtml(getForgotPasswordEmail(email, token))

    await mailerSend.email.send(emailParams);
    res
      .status(200)
      .cookie("pw-reset", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
      })
      .send({
        token: token,
        message: 'Check your email for instructions on resetting your password'
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error resettig password", error });
  }
}

// Reset user password 
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Check if token is expired
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    const { userId } = decoded as { userId: string };
    const user = await User.findById(userId)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      {
        $set: {
          password: hashedPassword
        }
      }
    )
    updatedUser?.save()
    res
      .status(200)
      .json({
        message: "Password successfully updated"
      })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error resettig password", error });
  }
}

// signout user 
export const signout = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production' ? true : false })
      .json({
        message: "Password successfully updated"
      })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error resettig password", error });
  }
}
