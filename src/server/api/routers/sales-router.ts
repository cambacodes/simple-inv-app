import { createTRPCRouter, publicProcedure } from "../trpc";

export const salesRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.sale.findMany();
  }),
});
