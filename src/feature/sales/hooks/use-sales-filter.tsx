import { useCallback, useState } from "react";
import type { SaleFilterType } from "../types";

const defaultFilters: Record<SaleFilterType, string> = {
  fullName: "",
  ci: "",
  nit: "",
  email: "",
  saleNumber: "",
};

export const useSalesFilter = () => {
  const [filterType, setFilterType] = useState<SaleFilterType>("fullName");
  const [filters, setFilters] = useState(defaultFilters);

  const setFilterValue = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    [filterType]
  );

  const changeFilterType = useCallback((type: SaleFilterType) => {
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
