import { Input, Select } from "antd";
import type { InventoryItemFilterType } from "../types";

export interface InventoryFilterProps {
  filterType: InventoryItemFilterType;
  filterValue: string;
  onTypeChange: (type: InventoryItemFilterType) => void;
  onValueChange: (value: string) => void;
}

export function InventoryFilter({
  filterType,
  filterValue,
  onTypeChange,
  onValueChange,
}: InventoryFilterProps) {
  const getPlaceholder = () => {
    switch (filterType) {
      case "name":
        return "Buscar por nombre...";
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
        <Select.Option value="name">Nombre</Select.Option>
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
