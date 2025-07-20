"use client";

import type { Client } from "@prisma/client";
import {
  Button,
  Card,
  message,
  Typography,
  type TablePaginationConfig,
} from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ClientFilter } from "~/feature/client/components/client-filter";
import { clientColumns } from "~/feature/client/constants";
import { useClientFilter } from "~/feature/client/hooks/use-client-filter";
import { api } from "~/trpc/react";
import { ActionTable } from "../components/actions-table";
import { useDebounced } from "../hooks/use-debounced";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

export default function ClientsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const utils = api.useUtils();

  const { filterType, filterValue, setFilterType, setFilterValue, filters } =
    useClientFilter();
  const debouncedFilters = useDebounced(filters, 500);

  const { data, isLoading, isFetching } = api.cliente.list.useQuery({
    ...debouncedFilters,
    limit: pageSize,
    page: currentPage,
  });

  const deleteMutation = api.cliente.delete.useMutation({
    onSuccess: () => {
      void utils.cliente.list.invalidate();
      message.success("Cliente eliminado exitosamente");
    },
    onError: () => {
      message.error("Error al eliminar el cliente");
    },
  });

  const clients = data?.clients ?? [];
  const totalCount = data?.totalCount ?? 0;

  const handleEdit = useCallback(
    (record: Client) => {
      router.push(`/clients/${record.id}/edit`);
    },
    [router]
  );

  const handleView = useCallback(
    (record: Client) => {
      router.push(`/clients/${record.id}`);
    },
    [router]
  );

  const handleDelete = useCallback(
    async (record: Client) => {
      try {
        await deleteMutation.mutateAsync({ id: record.id });
      } catch (err) {
        console.error(err);
      }
    },
    [deleteMutation]
  );

  const handleTableChange = useCallback(
    (pagination: TablePaginationConfig) => {
      if (pagination.pageSize && pagination.pageSize !== pageSize) {
        setPageSize(pagination.pageSize);
        setCurrentPage(1);
        return;
      }

      if (pagination.current && pagination.current !== currentPage) {
        setCurrentPage(pagination.current);
      }
    },
    [pageSize, currentPage]
  );

  return (
    <div className="min-h-screen p-6">
      <Card
        title={
          <div className="my-2 flex flex-col gap-2">
            <div className="flex w-full flex-col justify-between pt-2 md:flex-row">
              <Typography.Title level={2} className="mb-4">
                Lista de clientes
              </Typography.Title>
              <Button
                type="primary"
                onClick={() => router.push("/clients/create")}
              >
                Nuevo cliente
              </Button>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <ClientFilter
                filterType={filterType}
                filterValue={filterValue}
                onTypeChange={setFilterType}
                onValueChange={setFilterValue}
              />
            </div>
          </div>
        }
        className="shadow-lg"
      >
        <ActionTable
          data={clients}
          columns={clientColumns}
          loading={isLoading || isFetching}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalCount,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            showSizeChanger: true,
            showQuickJumper: totalCount > 100,
            showTotal: (total: number, range: [number, number]) =>
              `${range[0]}-${range[1]} de ${total} clientes`,
            onShowSizeChange: (_: number, size: number) => {
              setPageSize(size);
              setCurrentPage(1);
            },
          }}
          actions={{
            onDelete: (item) => void handleDelete(item),
            onView: handleView,
            onEdit: handleEdit,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
}
