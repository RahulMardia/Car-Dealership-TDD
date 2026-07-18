import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

// Register User
export const register = asyncHandler(async (req: any, res: any) => {
  const { user, token } = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    data: user,
  });
});

// Login User
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: user,
  });
});