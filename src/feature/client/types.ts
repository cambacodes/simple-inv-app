import type { Client } from "@prisma/client";

export type ClientColumns = {
  title: string;
  dataIndex: keyof Client;
  width?: number;
  ellipsis?: boolean;
  render?: (date: string) => string;
};
export type ClientFilterType = "fullName" | "ci" | "nit" | "email";
