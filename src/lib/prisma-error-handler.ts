import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  ErrorMessages,
  INTERNAL_SERVER_ERROR,
  RECORD_NOT_FOUND,
} from "~/constants/error-messages";
import { capitalize } from "./utils";

type ErrorKey = keyof typeof ErrorMessages;

export const handlePrismaError = (err: unknown, errorKey: ErrorKey) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        const meta = err.meta as {
          target?: string | string[];
          modelName?: string;
        };
        const field = Array.isArray(meta.target)
          ? meta.target.at(0)
          : (meta.target?.split("_").at(1) ?? "unknown");

        const messages = ErrorMessages[errorKey];

        const message =
          messages.duplicate?.[field as keyof typeof messages.duplicate] ??
          INTERNAL_SERVER_ERROR;

        throw new TRPCError({
          code: "CONFLICT",
          message,
        });
      }
      case "P2025": {
        const name = capitalize(errorKey);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `${name} ${RECORD_NOT_FOUND}`,
        });
      }
    }
  }

  console.error("Unhandled error in handlePrismaError:", err);

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: INTERNAL_SERVER_ERROR,
  });
};
