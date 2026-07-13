import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().trim().min(2),
  genericName: z.string().optional(),
  description: z.string().optional(),
  category: z.string().trim().min(1),
  manufacturer: z.string().optional(),
  price: z.number().nonnegative().optional(),
});
