import type { InventoryItemColumns } from "./types";

export const inventoryItemColumns: InventoryItemColumns[] = [
  { title: "Nombre", dataIndex: "name", width: 200 },
  {
    title: "Descripción",
    dataIndex: "description",
    width: 300,
    ellipsis: true,
  },
  { title: "Stock", dataIndex: "stock", width: 100 },
  {
    title: "Precio",
    dataIndex: "price",
    width: 100,
    render: (value: unknown) => `${Number(value)} bs`,
  },
];
