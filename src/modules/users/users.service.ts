import { pool } from "../../config/db";
import { User } from "./user.interface";

const getAllUsers = async () => {
  const query = "SELECT id, name, email, phone, role, created_at FROM users";
  const result = await pool.query(query);
  return result.rows;
};

const updateUser = async (id: string, userData: User) => {
  const query = `UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING id, name, email, phone, role, created_at;`;
  const values = [
    userData.name,
    userData.email,
    userData.phone,
    userData.role,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUser = async (id: string) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING id, name, email";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
