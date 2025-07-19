import z from "zod/v4";
import { withLimitAndPageSchema } from "~/lib/utils";
import {
  ClientFilterSchema,
  ClientSchema,
  CreateClientSchema,
} from "~/server/schema/client-schema";
import { createClient } from "../procedures/client/create-client";
import { deleteClientById } from "../procedures/client/delete-client-by-id";
import { getClientById } from "../procedures/client/get-client-by-id";
import { listClients } from "../procedures/client/list-clients";
import { updateClient } from "../procedures/client/upsert-client";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const clientRouter = createTRPCRouter({
  list: publicProcedure
    .input(withLimitAndPageSchema(ClientFilterSchema))
    .query(({ input }) => listClients(input)),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getClientById(input.id)),
  create: publicProcedure
    .input(CreateClientSchema)
    .mutation(({ input }) => createClient(input)),
  update: publicProcedure
    .input(ClientSchema)
    .mutation(({ input }) => updateClient(input)),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteClientById(input.id)),
});
