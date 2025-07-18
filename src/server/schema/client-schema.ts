import { z } from "zod/v4";

export const ClientSchema = z.object({
  id: z.number().int(),
  firstName: z.string().min(1).max(50),
  firstLastName: z.string().min(1).max(50),
  secondLastName: z.string().min(1).max(50),
  ci: z.string().min(1).max(50),
  email: z.string().email().max(255),
  phoneNumber: z.string().max(20),
  nit: z.string().min(1).max(50),
  birthday: z.date(),
  countryOfBirth: z.string().min(1).max(50),
});

export const ClientFilterSchema = z.object({
  fullName: z.string().optional(),
  ci: z.string().optional(),
  nit: z.string().optional(),
  email: z.string().optional(),
});

export const CreateClientSchema = ClientSchema.omit({ id: true });
