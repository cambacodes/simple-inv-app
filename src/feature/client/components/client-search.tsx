"use client";

import type { Client } from "@prisma/client";
import { Select, Spin } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDebounced } from "~/app/hooks/use-debounced";
import { api } from "~/trpc/react";

export interface ClientSearchProps {
  value?: number | null;
  onChange?: (item: Client | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ClientSearch({
  value,
  onChange,
  placeholder = "Buscar cliente por nombre...",
  disabled = false,
}: ClientSearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounced(searchValue, 300);

  const {
    data = { clients: [] },
    isLoading,
    isFetching,
  } = api.cliente.list.useQuery({
    fullName: debouncedSearch || undefined,
    limit: 20,
    page: 1,
  });

  const clients = data?.clients;

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleChange = useCallback(
    (clientId: number | null) => {
      const selectedClient = clients.find((client) => client.id === clientId);
      onChange?.(selectedClient ?? null);
    },
    [clients, onChange]
  );

  const notFoundContent = useMemo(() => {
    if (isLoading) {
      return <Spin size="small" />;
    }
    if (debouncedSearch && clients.length === 0) {
      return "No se encontraron clientes";
    }
    return "Escriba para buscar clientes";
  }, [isLoading, debouncedSearch, clients.length]);

  return (
    <Select
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
      {clients.map((client) => (
        <Select.Option key={client.id} value={client.id}>
          {`${client.firstName} ${client.firstLastName} ${client.secondLastName}`}
        </Select.Option>
      ))}
    </Select>
  );
}
