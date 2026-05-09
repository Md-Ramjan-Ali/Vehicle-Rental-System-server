# Vehicle Rental System API

**Live Deployment:** [https://vehicle-rental-system-server-five.vercel.app]  
**GitHub Repository:** [https://github.com/Md-Ramjan-Ali/Vehicle-Rental-System-server]

---

## 🎯 Project Overview
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

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Security**: JSON Web Tokens (JWT), Bcrypt
- **Validation**: Zod

## ⚙️ Setup & Usage Instructions

### 1. Prerequisites
- Node.js installed.
- PostgreSQL database (Local or Cloud like Supabase/Neon).

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
```

### 4. Running the Project
```bash
# Development mode
npm run dev

# Build and Start
npm run build
npm start
```

---
Developed with ❤️ by Md. Ramjan Ali
