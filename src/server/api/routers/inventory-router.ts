import z from "zod/v4";
import { withLimitAndPageSchema } from "~/lib/utils";
import {
  CreateInventoryItemSchema,
  InventoryItemFilterSchema,
  UpdateInventoryItemSchema,
} from "~/server/schema/inventory-item-schema";
import { createInventoryItem } from "../procedures/inventory/create-inventory-item";
import { deleteInventoryItemById } from "../procedures/inventory/delete-inventory-item-by-id";
import { getInventoryItemById } from "../procedures/inventory/get-inventory-item-by-id";
import { listInventoryItems } from "../procedures/inventory/list-inventory-items";
import { upsertInventoryItem } from "../procedures/inventory/upsert-inventory-item";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const inventoryRouter = createTRPCRouter({
  list: publicProcedure
    .input(withLimitAndPageSchema(InventoryItemFilterSchema))
    .query(({ input }) => listInventoryItems(input)),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getInventoryItemById(input.id)),
  create: publicProcedure
    .input(CreateInventoryItemSchema)
    .mutation(({ input }) => createInventoryItem(input)),
  update: publicProcedure
    .input(UpdateInventoryItemSchema)
    .mutation(({ input }) => upsertInventoryItem(input)),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteInventoryItemById(input.id)),
});
