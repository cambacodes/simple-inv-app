import { TRPCError } from "@trpc/server";
import type z from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { bolivianosToCents } from "~/lib/price";
import { handlePrismaError } from "~/lib/prisma-error-handler";
import { db } from "~/server/db";
import type { UpdateInventoryItemSchema } from "~/server/schema/inventory-item-schema";

export const upsertInventoryItem = async (
  input: z.infer<typeof UpdateInventoryItemSchema>
) => {
  try {
    const { price = 0, ...rest } = input;
    const inventoryItem = await db.inventoryItem.upsert({
      where: { id: input.id },
      update: {
        ...rest,
        basePriceCents: bolivianosToCents(price),
      },
      create: {
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
