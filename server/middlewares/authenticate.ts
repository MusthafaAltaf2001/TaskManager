import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "taskflow_bdw0w";

/**
 * Middleware function that is run before calling a protected route
 * Checks if jwt token recieved from client is valid and not expired
 * Sends the JWT token to the protected route
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.user = decoded as { userId: string };
    //@ts-ignore
    // console.log("Decoded user ID:", req.user); // Log the decoded user ID
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
