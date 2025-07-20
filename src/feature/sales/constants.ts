import type { SaleColumns } from "./types";

export const saleColumns: SaleColumns[] = [
  { title: "Número", dataIndex: "saleNumber", width: 100 },
  { title: "Cliente", dataIndex: "clientName", width: 200, ellipsis: true },
  {
    title: "Fecha",
    dataIndex: "saleDate",
    width: 120,
    render: (date: unknown) => new Date(date as string).toLocaleDateString(),
  },
  { title: "Items", dataIndex: "items", width: 100 },
  {
    title: "Total",
    dataIndex: "total",
    width: 100,
    render: (total: unknown) => `${Number(total)} bs`,
  },
];
