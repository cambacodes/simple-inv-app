import { useCallback, useState } from "react";
import type { InventoryItemFilterType } from "../types";

const defaultFilters: Record<InventoryItemFilterType, string> = {
  name: "",
};

export const useInventoryFilter = () => {
  const [filterType, setFilterType] = useState<InventoryItemFilterType>("name");
  const [filters, setFilters] = useState(defaultFilters);

  const setFilterValue = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    [filterType]
  );

  const changeFilterType = useCallback((type: InventoryItemFilterType) => {
    setFilterType(type);
    setFilters(defaultFilters);
  }, []);

  return {
    filterType,
    filterValue: filters[filterType],
    filters,
    setFilterValue,
    setFilterType: changeFilterType,
  };
};
