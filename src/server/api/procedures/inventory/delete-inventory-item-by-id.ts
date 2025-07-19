import { TRPCError } from "@trpc/server";
import { RECORD_NOT_FOUND } from "~/constants/error-messages";
import { db } from "~/server/db";

export const deleteInventoryItemById = async (id: number) => {
  const inventoryItem = await db.inventoryItem.delete({
    where: { id },
  });

  if (!inventoryItem) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: RECORD_NOT_FOUND,
    });
  }

  return inventoryItem;
};
