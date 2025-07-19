import type { InventoryItem } from "@prisma/client";

export type InventoryItemColumns = {
  title: string;
  dataIndex: keyof InventoryItem | "price";
  width?: number;
  ellipsis?: boolean;
  render?: (value: unknown) => string;
};
export type InventoryItemFilterType = "name";
