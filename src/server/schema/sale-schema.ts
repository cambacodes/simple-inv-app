import { z } from "zod/v4";

export const SaleItemSchema = z.object({
  inventoryItemId: z.number().int(),
  quantity: z.number().int().positive(),
});

export const SaleSchema = z.object({
  id: z.string(),
  saleNumber: z.number().int().optional(),
  clientId: z.number().int(),
  saleDate: z.string().optional(),
  items: z.array(SaleItemSchema).min(1),
});

export const CreateSaleSchema = SaleSchema.omit({
  id: true,
  saleDate: true,
  saleNumber: true,
});
