# Vehicle Rental System API 🚗💨

A robust and secure backend API for managing a vehicle rental business. Built with **Node.js, TypeScript, and PostgreSQL**, this system handles vehicle inventory, user management, and booking workflows with role-based access control.

## 🚀 Features
- **Authentication**: Secure Signup and Signin with JWT and Bcrypt.
- **Role-Based Access Control**: Separate permissions for `Admin` and `Customer`.
- **Vehicle Management**: Full CRUD operations for vehicle inventory.
- **Booking System**: 
  - Automatic price calculation.
  - Automatic vehicle availability updates.
  - **Auto-Return Logic**: System automatically marks expired bookings as returned.
- **Security & Validation**: 
  - Robust data validation using **Zod**.
  - Deletion constraints (cannot delete users/vehicles with active bookings).
  - Cancellation constraints (cannot cancel after the start date).

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Security**: JSON Web Tokens (JWT), Bcrypt
- **Validation**: Zod

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed.
- PostgreSQL database running.

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental_db
JWT_SECRET=your_super_secret_key
```

### 4. Running the Project
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📖 API Reference

### Authentication
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/signin` - Login and get JWT

### Vehicles
- `POST /api/v1/vehicles` - Add new vehicle (Admin)
- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:id` - Get single vehicle
- `PUT /api/v1/vehicles/:id` - Update vehicle (Admin)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (Admin)

### Users
- `GET /api/v1/users` - Get all users (Admin)
- `PUT /api/v1/users/:id` - Update profile (Admin/Own)
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### Bookings
- `POST /api/v1/bookings` - Create a booking
- `GET /api/v1/bookings` - View bookings (Role-based)
- `PUT /api/v1/bookings/:id` - Cancel or Return booking

---
Developed with ❤️ by Md. Ramjan Ali
