import express from "express";
import auth from "../../middlewares/auth.middleware";
import { userController } from "./users.controller";

const router = express.Router();

// Only Admin can see all users
router.get("/", auth("admin"), userController.getAllUsers);

// Admin or Owner can update profile
router.put("/:userId", auth("admin", "customer"), userController.updateUser);

// Only Admin can delete a user
router.delete("/:userId", auth("admin"), userController.deleteUser);

export const userRoutes = router;
