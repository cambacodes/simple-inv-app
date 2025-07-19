import type { ClientColumns } from "./types";

export const clientColumns: ClientColumns[] = [
  { title: "Nombre", dataIndex: "firstName", width: 120 },
  { title: "Apellido Paterno", dataIndex: "firstLastName", width: 140 },
  { title: "Apellido Materno", dataIndex: "secondLastName", width: 140 },
  { title: "CI", dataIndex: "ci", width: 100 },
  { title: "Email", dataIndex: "email", width: 200, ellipsis: true },
  { title: "Phone", dataIndex: "phoneNumber", width: 120 },
  { title: "NIT", dataIndex: "nit", width: 100 },
  {
    title: "Fecha de nacimiento",
    dataIndex: "birthday",
    width: 100,
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  { title: "Pais de nacimiento", dataIndex: "countryOfBirth", width: 120 },
];
