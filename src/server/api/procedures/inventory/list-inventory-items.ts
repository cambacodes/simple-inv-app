import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { centsToBolivianos } from "~/lib/price";
import type { WithLimitAndPage } from "~/lib/utils";

import { db } from "~/server/db";
import { type InventoryItemFilterSchema } from "~/server/schema/inventory-item-schema";

export const listInventoryItems = async (
  input: WithLimitAndPage<z.infer<typeof InventoryItemFilterSchema>>
) => {
  const { name, limit = 10, page = 1 } = input;

  const where: Prisma.InventoryItemWhereInput = buildWhereClause({
    name,
  });

  try {
    const skip = (page - 1) * limit;

    const [inventoryItems, totalCount] = await Promise.all([
      db.inventoryItem.findMany({
        where,
        orderBy: [{ name: "asc" }, { id: "asc" }],
        take: limit,
        skip,
      }),
      db.inventoryItem.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const inventoryItemsWithPrice = inventoryItems.map((item) => {
      return {
        ...item,
        price: centsToBolivianos(item.basePriceCents),
      };
    });

    return {
      inventoryItems: inventoryItemsWithPrice,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      pageSize: limit,
    };
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR,
    });
  }
};

function buildWhereClause({
  name,
}: z.infer<typeof InventoryItemFilterSchema>): Prisma.InventoryItemWhereInput {
  const where: Prisma.InventoryItemWhereInput = {};

  if (name) {
    where.name = { startsWith: name.trim().toLowerCase() };
  }

  return where;
}
