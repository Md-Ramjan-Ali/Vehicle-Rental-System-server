import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import globalErrorHandler from "./middlewares/error.middleware";
import { authRoutes } from "./modules/auth/auth.routes";

dotenv.config();

const app = express();

// Parsers
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// health check
app.get("/", async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Vehicle Rental System API is running" });
});

// App Routes
app.use("/api/v1/auth", authRoutes);

//not found route
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
