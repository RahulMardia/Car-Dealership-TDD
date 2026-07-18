import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};