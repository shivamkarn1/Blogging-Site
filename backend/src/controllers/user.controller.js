import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const userRegister = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
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

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
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

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: "user",
        },
        expiresIn: rememberMe ? 10 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
});

export { userRegister, userLogin };
