import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//health check
app.get("/", async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Vehicle Rental System API is running" });
});

//not found route
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//golobal Error handler

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
