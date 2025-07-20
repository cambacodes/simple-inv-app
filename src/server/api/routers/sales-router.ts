import z from "zod/v4";
import { withLimitAndPageSchema } from "~/lib/utils";
import {
  CreateSaleSchema,
  SaleFilterSchema,
} from "~/server/schema/sale-schema";
import { createSale } from "../procedures/sale/create-sale";
import { getSaleById } from "../procedures/sale/get-sale-by-id";
import { listSales } from "../procedures/sale/list-sales";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const salesRouter = createTRPCRouter({
  list: publicProcedure
    .input(withLimitAndPageSchema(SaleFilterSchema))
    .query(({ input }) => listSales(input)),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => getSaleById(input.id)),
  create: publicProcedure
    .input(CreateSaleSchema)
    .mutation(({ input }) => createSale(input)),
});
