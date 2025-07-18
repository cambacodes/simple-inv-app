import { TRPCError } from "@trpc/server";
import {
  ErrorMessages,
  INTERNAL_SERVER_ERROR,
  RECORD_NOT_FOUND,
} from "~/constants/error-messages";
import { capitalize } from "./utils";

type ErrorKey = keyof typeof ErrorMessages;

export const handlePrismaError = (err: unknown, errorKey: ErrorKey) => {
  if (err instanceof Error && "code" in err && typeof err.code === "string") {
    switch (err.code) {
      case "P2002": {
        if ("meta" in err) {
          const meta = err.meta as { target?: string[] };
          const field = meta.target?.[0] ?? "unknown";
          const messages = ErrorMessages[errorKey];

          const message =
            messages.duplicate?.[field as keyof typeof messages.duplicate] ??
            INTERNAL_SERVER_ERROR;

          throw new TRPCError({
            code: "CONFLICT",
            message,
          });
        }
        break;
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

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: INTERNAL_SERVER_ERROR,
  });
};
