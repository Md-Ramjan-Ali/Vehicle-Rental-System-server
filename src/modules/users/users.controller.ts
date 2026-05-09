import { Request, Response } from "express";
import { userService } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
      errors: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role, id } = req.user;
    const updateData = { ...req.body };

    // CONSTRAINT: Customer can only update their own profile and cannot change role
    if (role !== "admin") {
      delete updateData.role;
      if (id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
          errors: "You can only update your own profile",
        });
      }
    }

    const result = await userService.updateUser(userId as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        errors: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update user",
      errors: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUser(userId as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        errors: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete user",
      errors: error.message,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
};
