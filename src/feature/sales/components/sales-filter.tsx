import { Input, Select } from "antd";
import type { SaleFilterType } from "../types";

const { Option } = Select;

export interface SalesFilterProps {
  filterType: SaleFilterType;
  filterValue: string;
  onTypeChange: (type: SaleFilterType) => void;
  onValueChange: (value: string) => void;
}

export function SalesFilter({
  filterType,
  filterValue,
  onTypeChange,
  onValueChange,
}: SalesFilterProps) {
  const getPlaceholder = () => {
    switch (filterType) {
      case "fullName":
        return "Buscar por nombre del cliente...";
      case "ci":
        return "Buscar por CI del cliente...";
      case "nit":
        return "Buscar por NIT del cliente...";
      case "email":
        return "Buscar por email del cliente...";
      case "saleNumber":
        return "Buscar por número de venta...";
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
        <Option value="fullName">Nombre Cliente</Option>
        <Option value="ci">CI Cliente</Option>
        <Option value="nit">NIT Cliente</Option>
        <Option value="email">Email Cliente</Option>
        <Option value="saleNumber">Número Venta</Option>
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
