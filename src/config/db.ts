import { Pool } from "pg";
import configFile from "./env";

export const pool = new Pool({
  connectionString: configFile.connection_string,
})

const createTables = async () => {
  try {
    // 1. Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Vehicles Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(255) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price DECIMAL(10, 2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'booked')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Bookings Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT check_dates CHECK (rent_end_date >= rent_start_date)
      );
    `);

    console.log("Database tables initialized successfully");
  } catch (err) {
    console.error("Error creating database tables:", err);
  }
};

export default createTables;