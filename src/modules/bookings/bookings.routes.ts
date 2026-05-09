import express from "express";
import auth from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import { bookingController } from "./bookings.controller";
import { bookingValidation } from "./booking.validation";

const router = express.Router();

// Admin or Customer can create bookings
router.post(
  "/",
  auth("admin", "customer"),
  validate(bookingValidation.createBookingSchema),
  bookingController.createBooking,
);

// Admin or Customer can view bookings
router.get("/", auth("admin", "customer"), bookingController.getAllBookings);

// Admin or Customer can update/cancel bookings
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingController.updateBookingStatus,
);

export const bookingRoutes = router;
