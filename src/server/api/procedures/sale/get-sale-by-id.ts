import { TRPCError } from "@trpc/server";
import { RECORD_NOT_FOUND } from "~/constants/error-messages";
import { centsToBolivianos } from "~/lib/price";
import { db } from "~/server/db";

export const getSaleById = async (id: string) => {
  const sale = await db.sale.findUnique({
    where: { id },
    include: {
      client: true,
      saleItems: {
        include: {
          inventoryItem: true,
        },
      },
    },
  });

  if (!sale) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: RECORD_NOT_FOUND,
    });
  }

  return {
    ...sale,
    saleItems: sale.saleItems.map((item) => ({
      ...item,
      inventoryItem: {
        ...item.inventoryItem,
        price: centsToBolivianos(item.inventoryItem.basePriceCents),
        stock: item.inventoryItem.stock,
      },
    })),
  };
};
