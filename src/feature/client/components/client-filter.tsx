import { Input, Select } from "antd";
import type { ClientFilterType } from "../types";

export interface ClientFilterProps {
  filterType: ClientFilterType;
  filterValue: string;
  onTypeChange: (type: ClientFilterType) => void;
  onValueChange: (value: string) => void;
}

export function ClientFilter({
  filterType,
  filterValue,
  onTypeChange,
  onValueChange,
}: ClientFilterProps) {
  const getPlaceholder = () => {
    switch (filterType) {
      case "fullName":
        return "Buscar por nombre...";
      case "ci":
        return "Buscar por CI...";
      case "nit":
        return "Buscar por NIT...";
      case "email":
        return "Buscar por email...";
      default:
        return "Buscar...";
    }
  };
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <Select
        value={filterType}
        onChange={onTypeChange}
        className="md:w-36"
        placeholder="Filtrar por"
      >
        <Select.Option value="fullName">Nombre</Select.Option>
        <Select.Option value="ci">CI</Select.Option>
        <Select.Option value="nit">NIT</Select.Option>
        <Select.Option value="email">Email</Select.Option>
      </Select>
      <Input
        placeholder={getPlaceholder()}
        value={filterValue}
        onChange={(e) => onValueChange(e.target.value)}
        className="md:max-w-96"
        allowClear
      />
    </div>
  );
}
