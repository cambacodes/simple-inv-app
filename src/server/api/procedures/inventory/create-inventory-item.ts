import { TRPCError } from "@trpc/server";
import type z from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { bolivianosToCents } from "~/lib/price";
import { handlePrismaError } from "~/lib/prisma-error-handler";
import { db } from "~/server/db";
import type { CreateInventoryItemSchema } from "~/server/schema/inventory-item-schema";

export const createInventoryItem = async (
  input: z.infer<typeof CreateInventoryItemSchema>
) => {
  const { price, ...rest } = input;
  try {
    const inventoryItem = await db.inventoryItem.create({
      data: {
        ...rest,
        basePriceCents: bolivianosToCents(price),
      },
    });
    return inventoryItem;
  } catch (err) {
    handlePrismaError(err, "inventoryItem");

    console.error(err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
