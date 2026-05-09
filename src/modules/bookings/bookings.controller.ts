import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = {
      ...req.body,
      customer_id: req.user.id,
    };

    const result = await bookingService.createBooking(bookingData);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create booking",
      errors: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const result = await bookingService.getAllBookings(role, id);

    res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookings",
      errors: error.message,
    });
  }
};

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const result = await bookingService.updateBookingStatus(
      bookingId as string,
      status,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        errors: "Booking not found",
      });
    }

    const message =
      status === "cancelled"
        ? "Booking cancelled successfully"
        : "Booking marked as returned. Vehicle is now available";

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update booking",
      errors: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};
