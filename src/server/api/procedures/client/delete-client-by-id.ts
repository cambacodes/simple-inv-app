import { TRPCError } from "@trpc/server";
import { INTERNAL_SERVER_ERROR } from "~/constants/error-messages";
import { db } from "~/server/db";

export const deleteClientById = async (id: number) => {
  try {
    const client = await db.client.delete({
      where: { id },
    });
    return client;
  } catch (err) {
    console.error(err);

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: INTERNAL_SERVER_ERROR,
    });
  }
};
