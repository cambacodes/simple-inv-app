import { useCallback, useState } from "react";
import type { ClientFilterType } from "../types";
const defaultFilters: Record<ClientFilterType, string> = {
  fullName: "",
  ci: "",
  nit: "",
  email: "",
};

export const useClientFilter = () => {
  const [filterType, setFilterType] = useState<ClientFilterType>("fullName");
  const [filters, setFilters] = useState(defaultFilters);

  const setFilterValue = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    [filterType]
  );

  const changeFilterType = useCallback((type: ClientFilterType) => {
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
