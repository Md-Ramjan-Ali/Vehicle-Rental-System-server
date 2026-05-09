import express from "express";
import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import { vehicleController } from "./vehicles.controller";
import { vehicleValidation } from "./vehicle.validation";

const router = express.Router();

// Public Routes
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getVehicleById);

// Admin Routes with Validation
router.post(
  "/",
  auth("admin"),
  validate(vehicleValidation.createVehicleSchema),
  vehicleController.createVehicle,
);

router.put(
  "/:vehicleId",
  auth("admin"),
  validate(vehicleValidation.updateVehicleSchema),
  vehicleController.updateVehicle,
);

router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;
