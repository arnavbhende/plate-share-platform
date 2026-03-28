import { z } from "zod";

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["DONOR", "NGO", "VOLUNTEER"]).optional().default("DONOR"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Donation Schemas ─────────────────────────────────────────────────────────

export const createDonationSchema = z.object({
  title: z.string().min(1, "Food name is required"),
  category: z.string().min(1, "Category is required"),
  dietary: z.string().optional(),
  description: z.string().optional(),
  servings: z.number().int().min(1, "Must serve at least 1 person"),
  packaging: z.array(z.string()).optional().default([]),
  shelfLife: z.string().optional(),
  handling: z.string().optional(),
  pickupTime: z.string().transform((val) => new Date(val)),
  pickupSlot: z.string().optional(),
  location: z.string().min(1, "Pickup location is required"),
  locationName: z.string().optional(),
  dropLocation: z.string().optional(),
  image: z.string().optional(),
  pickupInstructions: z.string().optional(),
});

export const updateDonationStatusSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED", "IN_TRANSIT", "DELIVERED", "CANCELLED"]),
});

// ─── Profile Schema ──────────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  vehicle: z.string().optional(),
  availability: z.string().optional(),
  preferences: z.string().optional(),
  isActive: z.boolean().optional(),
});
