import { z } from "zod";

const createVehicleSchema = z.object({
  body: z.object({
    vehicle_name: z.string().min(1, "Vehicle name is required"),
    type: z.enum(["car", "bike", "van", "SUV"], {
      message: "Type must be car, bike, van, or SUV",
    }),
    registration_number: z.string().min(1, "Registration number is required"),
    daily_rent_price: z.number().positive("Price must be a positive number"),
    availability_status: z.enum(["available", "booked"]).optional(),
  }),
});

const updateVehicleSchema = z.object({
  body: z.object({
    vehicle_name: z.string().optional(),
    type: z.enum(["car", "bike", "van", "SUV"]).optional(),
    registration_number: z.string().optional(),
    daily_rent_price: z.number().positive("Price must be a positive number").optional(),
    availability_status: z.enum(["available", "booked"]).optional(),
  }),
});

export const vehicleValidation = {
  createVehicleSchema,
  updateVehicleSchema,
};
