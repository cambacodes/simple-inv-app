import { TRPCError } from "@trpc/server";
import { type z } from "zod/v4";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { handlePrismaError } from "~/lib/prisma-error-handler";
import { db } from "~/server/db";
import { type ClientSchema } from "~/server/schema/client-schema";

export const updateClient = async (input: z.infer<typeof ClientSchema>) => {
  const { id, ...data } = input;
  try {
    const client = await db.client.update({
      where: { id },
      data,
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
