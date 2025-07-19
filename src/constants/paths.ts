import { withRedirectTo } from "~/lib/utils";

export const clientsPath = () => "/clients";
export const clientViewPath = (id: number, redirectTo?: string) => {
  return withRedirectTo(`/clients/${id}`, redirectTo);
};
export const clientEditPath = (id: number, redirectTo?: string) => {
  return withRedirectTo(`/clients/${id}/edit`, redirectTo);
};

export const inventoryPath = () => "/inventory";
export const salesPath = () => "/sales";
