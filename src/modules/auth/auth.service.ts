import bcrypt from "bcrypt";
import { pool } from "../../config/db";
import { User } from "../users/user.interface";

const signupUser = async (userData: User) => {
  // 1. Hash the password
  const hashedPassword = await bcrypt.hash(userData.password!, 10);

  // 2. Prepare the query
  const query = `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role, created_at;
  `;

  const values = [
    userData.name,
    userData.email.toLowerCase(),
    hashedPassword,
    userData.phone,
    userData.role || "customer",
  ];

  // 3. Execute query
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const authService = {
  signupUser,
};
