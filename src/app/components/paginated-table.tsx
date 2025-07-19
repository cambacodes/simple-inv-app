import { Table } from "antd";
import type { TableProps } from "antd/es/table";

export interface PaginatedTableProps<T>
  extends Omit<TableProps<T>, "dataSource"> {
  data: T[];
}

export function PaginatedTable<T>({
  data,
  columns,
  loading = false,
  pagination = false,
  onChange,
  rowKey = "id",
  scroll = { x: 1200 },
  className = "shadow-sm",
  size = "middle",
  ...tableProps
}: PaginatedTableProps<T>) {
  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      loading={loading}
      scroll={scroll}
      pagination={pagination}
      onChange={onChange}
      className={className}
      size={size}
      {...tableProps}
    />
  );
}
