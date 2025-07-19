import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import type { WithLimitAndPage } from "~/lib/utils";

import { db } from "~/server/db";
import { type ClientFilterSchema } from "~/server/schema/client-schema";

export const listClients = async (
  input: WithLimitAndPage<z.infer<typeof ClientFilterSchema>>
) => {
  const { fullName, ci, nit, email, limit = 10, page = 1 } = input;

  const where: Prisma.ClientWhereInput = buildWhereClause({
    fullName,
    ci,
    nit,
    email,
  });

  try {
    const skip = (page - 1) * limit;

    const [clients, totalCount] = await Promise.all([
      db.client.findMany({
        where,
        orderBy: [{ firstName: "asc" }, { id: "asc" }],
        take: limit,
        skip,
      }),
      db.client.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      clients,
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
}: z.infer<typeof ClientFilterSchema>): Prisma.ClientWhereInput {
  const where: Prisma.ClientWhereInput = {};

  if (fullName) {
    const words = fullName.trim().toLowerCase().split(/\s+/);
    where.OR = words.flatMap((word) => [
      { firstName: { startsWith: word } },
      { firstLastName: { startsWith: word } },
      { secondLastName: { startsWith: word } },
    ]);
  }
  if (ci) where.ci = { startsWith: ci.trim().toLowerCase() };
  if (nit) where.nit = { startsWith: nit.trim().toLowerCase() };
  if (email) where.email = { startsWith: email.trim().toLowerCase() };

  return where;
}
