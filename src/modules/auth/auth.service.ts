import bcrypt from "bcrypt";
import { pool } from "../../config/db";
import { User } from "../users/user.interface";
import { generateToken } from "../../utils/jwt";

const signupUser = async (userData: User) => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
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
  const result = await pool.query(query, values);
  return result.rows[0];
};

const signinUser = async (loginData: { email: string; password?: string }) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(query, [loginData.email.toLowerCase()]);
  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found with this email");
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(
    loginData.password!,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }

  //Generate token
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  //Remove password from user object before returning
  delete user.password;

  return {
    token,
    user,
  };
};

export const authService = {
  signupUser,
  signinUser,
};
