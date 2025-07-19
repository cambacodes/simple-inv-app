import { z } from "zod/v4";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function withRedirectTo(path: string, redirectTo?: string) {
  if (!redirectTo) return path;

  const hasQuery = path.includes("?");
  const separator = hasQuery ? "&" : "?";
  return `${path}${separator}redirectTo=${encodeURIComponent(redirectTo)}`;
}

export type WithLimitAndPage<T> = T & {
  page?: number;
  limit?: number;
};

export const withLimitAndPageSchema = <T extends z.ZodRawShape>(
  zodSchema: z.ZodObject<T>
) =>
  z.object({
    ...zodSchema.shape,
    page: z.number().optional(),
    limit: z.number().optional(),
  });
