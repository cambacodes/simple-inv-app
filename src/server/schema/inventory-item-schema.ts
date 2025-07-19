import { z } from "zod/v4";

export const InventoryItemSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(255),
  description: z.string().nullable(),
  stock: z.number().int().nonnegative(),
  basePriceCents: z.number().int().nonnegative(),
});

export const InventoryItemFilterSchema = z.object({
  name: z.string().max(255).optional(),
});

export const CreateInventoryItemSchema = InventoryItemSchema.omit({
  id: true,
  basePriceCents: true,
}).extend({ price: z.number().nonnegative() });

export const UpdateInventoryItemSchema = InventoryItemSchema.omit({
  basePriceCents: true,
}).extend({ price: z.number().nonnegative() });
