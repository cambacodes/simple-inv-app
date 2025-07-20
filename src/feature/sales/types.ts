import type { InventoryItem, Sale } from "@prisma/client";

export type SaleColumns = {
  title: string;
  dataIndex: keyof Sale | "clientName" | "total" | "items";
  width?: number;
  ellipsis?: boolean;
  render?: (value: unknown) => string;
};

export type SaleFilterType = "fullName" | "ci" | "nit" | "email" | "saleNumber";

export type SaleItemFormData = {
  inventoryItemId: number;
  quantity: number;
};

export type SaleFormData = {
  clientId: number;
  items: SaleItemFormData[];
};

export type SelectedInventoryItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string | null;
};

export interface SaleItemWithDetails extends SaleItemFormData {
  subtotal: number;
  inventoryItem?: SelectedInventoryItem;
  isValid: boolean;
}

export type SaleIventoryItem =
  | (Omit<InventoryItem, "basePriceCents"> & { price: number })
  | null;
