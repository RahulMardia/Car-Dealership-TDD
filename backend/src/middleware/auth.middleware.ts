import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const authenticate = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Access denied. No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    req.user = decoded;

    next();
  }
);

export const authorizeAdmin = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
      throw new AppError("Access denied. Admin privileges required.", 403);
    }
    next();
  }
);