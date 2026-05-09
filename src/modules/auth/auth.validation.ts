import { z } from "zod";

const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Invalid phone number"),
    role: z.enum(["admin", "customer"]).default("customer"),
  }),
});

const signinSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const authValidation = {
  signupSchema,
  signinSchema,
};
