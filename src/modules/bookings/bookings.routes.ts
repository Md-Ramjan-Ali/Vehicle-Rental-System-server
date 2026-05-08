import express from "express";
import auth from "../../middlewares/auth.middleware";
import { bookingController } from "./bookings.controller";

const router = express.Router();

// Admin or Customer can create bookings
router.post("/", auth("admin", "customer"), bookingController.createBooking);

// Admin or Customer can view bookings
router.get("/", auth("admin", "customer"), bookingController.getAllBookings);

export const bookingRoutes = router;
