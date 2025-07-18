import { type z } from "zod/v4";

import { TRPCError } from "@trpc/server";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { handlePrismaError } from "~/lib/prisma-error-handler";
import { db } from "~/server/db";
import type { CreateClientSchema } from "~/server/schema/client-schema";

export const createClient = async (
  input: z.infer<typeof CreateClientSchema>
) => {
  try {
    const client = await db.client.create({
      data: input,
    });
    return client;
  } catch (err) {
    handlePrismaError(err, "client");

    console.error(err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
