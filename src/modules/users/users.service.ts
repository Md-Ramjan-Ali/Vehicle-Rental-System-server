import { pool } from "../../config/db";
import { User } from "./user.interface";

const getAllUsers = async () => {
  const query = "SELECT id, name, email, phone, role FROM users";
  const result = await pool.query(query);
  return result.rows;
};

const updateUser = async (id: string, updateData: any) => {
  const query = `
    UPDATE users 
    SET name = COALESCE($1, name), 
        email = COALESCE($2, email), 
        phone = COALESCE($3, phone),
        role = COALESCE($4, role)
    WHERE id = $5 
    RETURNING id, name, email, phone, role
  `;

  const values = [
    updateData.name || null,
    updateData.email || null,
    updateData.phone || null,
    updateData.role || null,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUser = async (id: string) => {
  // Check for active bookings
  const bookingCheck = await pool.query(
    "SELECT * FROM bookings WHERE customer_id = $1 AND status = 'active'",
    [id],
  );

  if (bookingCheck.rows.length > 0) {
    throw new Error("Cannot delete user with active bookings");
  }

  const query = "DELETE FROM users WHERE id = $1 RETURNING id";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
