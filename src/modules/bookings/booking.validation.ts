import { z } from "zod";

const createBookingSchema = z.object({
  body: z
    .object({
      vehicle_id: z.number().int().positive("Invalid vehicle ID"),
      rent_start_date: z.string().min(1, "Start date is required"),
      rent_end_date: z.string().min(1, "End date is required"),
    })
    .refine(
      (data) => {
        const start = new Date(data.rent_start_date);
        const end = new Date(data.rent_end_date);
        return end > start;
      },
      {
        message: "End date must be after start date",
        path: ["rent_end_date"],
      },
    ),
});

export const bookingValidation = {
  createBookingSchema,
};
