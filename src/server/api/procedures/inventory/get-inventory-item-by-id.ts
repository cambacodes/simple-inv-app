import { TRPCError } from "@trpc/server";
import { RECORD_NOT_FOUND } from "~/constants/error-messages";
import { centsToBolivianos } from "~/lib/price";
import { db } from "~/server/db";

export const getInventoryItemById = async (id: number) => {
  const baseInventoryItem = await db.inventoryItem.findUnique({
    where: { id },
  });

  if (!baseInventoryItem) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: RECORD_NOT_FOUND,
    });
  }

  const inventoryItem = {
    ...baseInventoryItem,
    price: centsToBolivianos(baseInventoryItem.basePriceCents),
  };

  return inventoryItem;
};
