"use client";

import type { Sale } from "@prisma/client";
import { Button, Card, Typography, type TablePaginationConfig } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SalesFilter } from "~/feature/sales/components/sales-filter";
import { saleColumns } from "~/feature/sales/constants";
import { useSalesFilter } from "~/feature/sales/hooks/use-sales-filter";
import { api } from "~/trpc/react";
import { ActionTable } from "../components/actions-table";
import { useDebounced } from "../hooks/use-debounced";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

export default function SalesPage() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { filterType, filterValue, setFilterType, setFilterValue, filters } =
    useSalesFilter();
  const debouncedFilters = useDebounced(filters, 500);

  const { data, isLoading, isFetching } = api.sales.list.useQuery({
    ...debouncedFilters,
    saleNumber: debouncedFilters.saleNumber
      ? Number(debouncedFilters.saleNumber)
      : undefined,
    limit: pageSize,
    page: currentPage,
  });

  const sales = data?.sales ?? [];
  const totalCount = data?.totalCount ?? 0;

  const transformedSales = sales.map((sale) => {
    const clientName = `${sale.client.firstName} ${sale.client.firstLastName} ${sale.client.secondLastName}`;
    const total = sale.saleItems
      .reduce((sum, item) => {
        return sum + item.quantity * item.inventoryItem.price;
      }, 0)
      .toFixed(2);

    return {
      ...sale,
      clientName,
      total: Number(total),
      items: sale.saleItems.length,
    };
  });

  const handleView = useCallback(
    (record: Sale & { clientName: string; total: number }) => {
      router.push(`/sales/${record.id}`);
    },
    [router]
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
                Historial de Ventas
              </Typography.Title>
              <Button
                type="primary"
                onClick={() => router.push("/sales/create")}
              >
                Nueva Venta
              </Button>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <SalesFilter
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
          data={transformedSales}
          columns={saleColumns}
          loading={isLoading || isFetching}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalCount,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            showSizeChanger: true,
            showQuickJumper: totalCount > 100,
            showTotal: (total: number, range: [number, number]) =>
              `${range[0]}-${range[1]} de ${total} ventas`,
            onShowSizeChange: (_: number, size: number) => {
              setPageSize(size);
              setCurrentPage(1);
            },
          }}
          actions={{
            onView: handleView,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
}
