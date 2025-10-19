import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Remove password from response
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };

  res
    .status(201)
    .json(new ApiResponse(201, userResponse, "User registered successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Check if user is active
  if (!user.isActive) {
    throw new ApiError(401, "Account is deactivated. Please contact support.");
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Set token expiration based on rememberMe
  const expiresIn = rememberMe ? "10d" : "1d";

  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      userType: "user",
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: "user",
        },
        expiresIn: rememberMe ? 10 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      },
      "User logged in successfully"
    )
  );
});

export { userRegister, userLogin };
