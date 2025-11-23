import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseConfig";

// Simple Firebase Auth check
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(token);

    // Save user info in request
    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
