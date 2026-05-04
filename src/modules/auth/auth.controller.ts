import { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await authService.signupUser(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error: error,
    });
  }
};

export const authController = {
  signup,
};
