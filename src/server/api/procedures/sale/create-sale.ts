import { TRPCError } from "@trpc/server";
import type z from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { db } from "~/server/db";
import type { CreateSaleSchema } from "~/server/schema/sale-schema";

interface StockValidationError {
  inventoryItemId: number;
  itemName: string;
  requestedQuantity: number;
  availableStock: number;
}

export const createSale = async (input: z.infer<typeof CreateSaleSchema>) => {
  if (!input.items || input.items.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "La venta debe incluir al menos un producto",
    });
  }
  try {
    const requestedMap = new Map<number, number>();
    for (const { inventoryItemId, quantity } of input.items) {
      requestedMap.set(
        inventoryItemId,
        (requestedMap.get(inventoryItemId) ?? 0) + quantity
      );
    }

    const uniqueIds = Array.from(requestedMap.keys());

    return await db.$transaction(async (tx) => {
      const inventoryItems = await tx.inventoryItem.findMany({
        where: { id: { in: uniqueIds } },
      });

      if (inventoryItems.length !== uniqueIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Uno o más productos no existen",
        });
      }

      const stockErrors: StockValidationError[] = [];
      for (const item of inventoryItems) {
        const requested = requestedMap.get(item.id)!;
        if (requested > item.stock) {
          stockErrors.push({
            inventoryItemId: item.id,
            itemName: item.name,
            requestedQuantity: requested,
            availableStock: item.stock,
          });
        }
      }

      if (stockErrors.length) {
        const first = stockErrors[0]!;
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `${first.itemName}: solicitado ${first.requestedQuantity}, disponible ${first.availableStock}`,
        });
      }

      await Promise.all(
        Array.from(requestedMap.entries()).map(([inventoryItemId, qty]) =>
          tx.inventoryItem.update({
            where: { id: inventoryItemId },
            data: { stock: { decrement: qty } },
          })
        )
      );

      return tx.sale.create({
        data: {
          clientId: input.clientId,
          saleDate: new Date(),
          saleItems: {
            create: input.items.map(({ inventoryItemId, quantity }) => ({
              inventoryItemId,
              quantity,
            })),
          },
        },
      });
    });
  } catch (err) {
    console.error(err);

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
