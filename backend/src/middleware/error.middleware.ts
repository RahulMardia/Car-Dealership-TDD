import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
) => {
  console.error("[Error]:", err.message);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: [{ message: err.message }],
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [{ message: err.message }],
  });
};