import express from "express";
import auth from "../../middlewares/auth.middleware";
import { vehicleController } from "./vehicles.controller";

const router = express.Router();

// Public Routes
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getVehicleById);

// Admin Only Routes
router.post("/", auth("admin"), vehicleController.createVehicle);
router.put("/:vehicleId", auth("admin"), vehicleController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;
