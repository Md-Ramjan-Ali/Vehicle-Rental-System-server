import { pool } from "../../config/db";
import { Booking } from "./booking.interface";

const createBooking = async (bookingData: Booking) => {
  // 1. Get vehicle price
  const vehicle = await pool.query(
    "SELECT daily_rent_price FROM vehicles WHERE id = $1",
    [bookingData.vehicle_id],
  );
  const pricePerDay = vehicle.rows[0].daily_rent_price;

  // 2. Price Calculation (Days * Price)
  const days =
    Math.ceil(
      (new Date(bookingData.rent_end_date).getTime() -
        new Date(bookingData.rent_start_date).getTime()) /
        (1000 * 3600 * 24),
    ) || 1;
  const totalPrice = days * pricePerDay;

  // 3. Insert Booking
  const query = `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;
  const values = [
    bookingData.customer_id,
    bookingData.vehicle_id,
    bookingData.rent_start_date,
    bookingData.rent_end_date,
    totalPrice,
  ];
  const result = await pool.query(query, values);

  // 4. Update Vehicle status
  await pool.query(
    "UPDATE vehicles SET availability_status = 'booked' WHERE id = $1",
    [bookingData.vehicle_id],
  );

  return result.rows[0];
};

const getAllBookings = async (role: string, userId: number) => {
  const query =
    role === "admin"
      ? "SELECT * FROM bookings"
      : "SELECT * FROM bookings WHERE customer_id = $1";
  const values = role === "admin" ? [] : [userId];
  const result = await pool.query(query, values);
  return result.rows;
};

const updateBookingStatus = async (id: string, status: string) => {
  // 1. the booking to check
  const bookingCheck = await pool.query("SELECT * FROM bookings WHERE id = $1", [
    id,
  ]);
  const booking = bookingCheck.rows[0];

  if (!booking) return null;

  // 2. Only cancel if it hasn't started yet
  if (status === "cancelled") {
    const startDate = new Date(booking.rent_start_date);
    const now = new Date();

    if (now >= startDate) {
      throw new Error(
        "Cannot cancel a booking after the start date has passed",
      );
    }
  }

  // 3. Update the booking status
  const query = "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *";
  const result = await pool.query(query, [status, id]);
  const updatedBooking = result.rows[0];

  // 4. Reset vehicle availability
  if (status === "returned" || status === "cancelled") {
    await pool.query(
      "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
      [booking.vehicle_id],
    );
  }

  return updatedBooking;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};
