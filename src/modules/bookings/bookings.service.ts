import { pool } from "../../config/db";
import { Booking } from "./booking.interface";

const createBooking = async (bookingData: Booking) => {
  // 1. Get vehicle details
  const vehicleQuery = await pool.query(
    "SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1",
    [bookingData.vehicle_id],
  );
  const vehicleInfo = vehicleQuery.rows[0];

  // 2. Price Calculation (Days * Price)
  const days =
    Math.ceil(
      (new Date(bookingData.rent_end_date).getTime() -
        new Date(bookingData.rent_start_date).getTime()) /
        (1000 * 3600 * 24),
    ) || 1;
  const totalPrice = days * vehicleInfo.daily_rent_price;

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

  // 5. Return with nested vehicle info as per API Reference
  return {
    ...result.rows[0],
    vehicle: vehicleInfo,
  };
};

const getAllBookings = async (role: string, userId: number) => {
  // Auto-mark expired bookings as 'returned'
  await pool.query(`
    UPDATE bookings 
    SET status = 'returned' 
    WHERE status = 'active' AND rent_end_date < NOW()
  `);

  // JOIN query to get nested customer and vehicle objects
  let queryText = `
    SELECT b.*, 
    json_build_object('name', u.name, 'email', u.email) as customer,
    json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number, 'type', v.type, 'daily_rent_price', v.daily_rent_price) as vehicle
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
  `;

  const values: any[] = [];
  if (role !== "admin") {
    queryText += ` WHERE b.customer_id = $1`;
    values.push(userId);
  }

  const result = await pool.query(queryText, values);
  return result.rows;
};

const updateBookingStatus = async (id: string, status: string) => {
  // 1. Fetch the booking to check the date
  const bookingCheck = await pool.query(
    "SELECT * FROM bookings WHERE id = $1",
    [id],
  );
  const booking = bookingCheck.rows[0];

  if (!booking) return null;

  // 2. CONSTRAINT: Only cancel if it hasn't started yet
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

  // 4. Reset vehicle availability
  if (status === "returned" || status === "cancelled") {
    await pool.query(
      "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
      [booking.vehicle_id],
    );
  }

  // 5. Fetch updated data with nested vehicle info for the response
  const finalResult = await pool.query(
    `
    SELECT b.*, 
    json_build_object('availability_status', v.availability_status) as vehicle
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.id = $1
  `,
    [id],
  );

  return finalResult.rows[0];
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};
