"use client";

import { Select, Spin } from "antd";
import { useCallback, useMemo, useState } from "react";
import type z from "zod/v4";
import { useDebounced } from "~/app/hooks/use-debounced";
import type { UpdateInventoryItemSchema } from "~/server/schema/inventory-item-schema";
import { api } from "~/trpc/react";

export interface InventorySearchProps {
  value?: number | null;
  onChange?: (item: z.infer<typeof UpdateInventoryItemSchema> | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function InventorySearch({
  value,
  onChange,
  placeholder = "Buscar producto...",
  disabled = false,
}: InventorySearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounced(searchValue, 300);

  const {
    data = { inventoryItems: [] },
    isLoading,
    isFetching,
  } = api.inventory.list.useQuery({
    name: debouncedSearch || undefined,
    limit: 20,
    page: 1,
  });

  const items = data?.inventoryItems;

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleChange = useCallback(
    (itemId: number | null) => {
      const selectedItem = items.find((item) => item.id === itemId);
      onChange?.(selectedItem ?? null);
    },
    [items, onChange]
  );

  const notFoundContent = useMemo(() => {
    if (isLoading) {
      return <Spin size="small" />;
    }
    if (debouncedSearch && items.length === 0) {
      return "No se encontraron productos";
    }
    return "Escriba para buscar productos";
  }, [isLoading, debouncedSearch, items.length]);

  return (
    <Select
      className="w-full flex-1"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      showSearch
      filterOption={false}
      notFoundContent={notFoundContent}
      disabled={disabled}
      loading={isFetching}
      allowClear
    >
      {items.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name} (Stock: {item.stock}) - {item.price.toFixed(2)} bs
        </Select.Option>
      ))}
    </Select>
  );
}
