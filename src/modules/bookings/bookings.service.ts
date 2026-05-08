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

export const bookingService = {
  createBooking,
  getAllBookings,
};
