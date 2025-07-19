import { withRedirectTo } from "~/lib/utils";

export const clientsPath = () => "/clients";
export const clientViewPath = (id: number, redirectTo?: string) => {
  return withRedirectTo(`/clients/${id}`, redirectTo);
};
export const clientEditPath = (id: number, redirectTo?: string) => {
  return withRedirectTo(`/clients/${id}/edit`, redirectTo);
};

export const inventoryPath = () => "/inventory";
export const inventoryViewPath = (id: number, redirectTo?: string) => {
  return withRedirectTo(`/inventory/${id}`, redirectTo);
};
export const inventoryEditPath = (id: number, redirectTo?: string) => {
  return withRedirectTo(`/inventory/${id}/edit`, redirectTo);
};

export const salesPath = () => "/sales";
export const salesViewPath = (id: string, redirectTo?: string) => {
  return withRedirectTo(`/sales/${id}`, redirectTo);
};
