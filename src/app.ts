import cors from "cors";
import express, { Request, Response } from "express";
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

app.get("/", async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Vehicle Rental System API is running" });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;