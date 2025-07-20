import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { centsToBolivianos } from "~/lib/price";
import type { WithLimitAndPage } from "~/lib/utils";

import { db } from "~/server/db";
import { type SaleFilterSchema } from "~/server/schema/sale-schema";

export const listSales = async (
  input: WithLimitAndPage<z.infer<typeof SaleFilterSchema>>
) => {
  const { fullName, ci, nit, email, saleNumber, limit = 10, page = 1 } = input;

  const where: Prisma.SaleWhereInput = buildWhereClause({
    fullName,
    ci,
    nit,
    email,
    saleNumber,
  });

  try {
    const skip = (page - 1) * limit;

    const [sales, totalCount] = await Promise.all([
      db.sale.findMany({
        where,
        include: {
          client: true,
          saleItems: {
            include: {
              inventoryItem: true,
            },
          },
        },
        orderBy: [{ saleDate: "desc" }, { id: "desc" }],
        take: limit,
        skip,
      }),
      db.sale.count({ where }),
    ]);
    const salesWithPrice = sales.map((sale) => {
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
    });

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      sales: salesWithPrice,
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
  fullName,
  ci,
  nit,
  email,
  saleNumber,
}: z.infer<typeof SaleFilterSchema>): Prisma.SaleWhereInput {
  const where: Prisma.SaleWhereInput = {};

  if (saleNumber) {
    where.saleNumber = saleNumber;
  }

  if (fullName || ci || nit || email) {
    where.client = {};

    if (fullName) {
      const words = fullName.trim().toLowerCase().split(/\s+/);
      where.client.OR = words.flatMap((word) => [
        { firstName: { startsWith: word } },
        { firstLastName: { startsWith: word } },
        { secondLastName: { startsWith: word } },
      ]);
    }
    if (ci) where.client.ci = { startsWith: ci.trim().toLowerCase() };
    if (nit) where.client.nit = { startsWith: nit.trim().toLowerCase() };
    if (email) where.client.email = { startsWith: email.trim().toLowerCase() };
  }

  return where;
}
