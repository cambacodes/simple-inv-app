import { TRPCError } from "@trpc/server";
import type z from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { db } from "~/server/db";
import type { CreateSaleSchema } from "~/server/schema/sale-schema";

export const createSale = async (input: z.infer<typeof CreateSaleSchema>) => {
  try {
    const sale = await db.sale.create({
      data: input,
      include: {
        saleItems: true,
      },
    });
    return sale;
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
