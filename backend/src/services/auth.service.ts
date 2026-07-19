import User from "../models/User";
import { AppError } from "../utils/AppError";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

// Type Casting
interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterInput) => {
  const existingUser = await User.findOne({ email });

// Check for Existing User
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }


  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    throw new AppError("Password must be at least 6 characters long and contain at least one letter and one number", 400);
  }

//   Password being Hashed
  const hashedPassword = await hashPassword(password);

//   User being created in the backend
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });


//   Jwt token generation
  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return {
    user,
    token,
  };
};

export const login = async ({
  email,
  password,
}: LoginInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

//   Comapring password(String) with Hashed Password
  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

//   Throw error if password not matched
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

//   Token generation for login user
  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return {
    user,
    token,
  };
};