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
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const result = await bookingService.getAllBookings(role, id);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookings",
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
};
