import {
  createActionsColumn,
  type ActionHandlers,
} from "~/lib/create-actions-column";
import { PaginatedTable, type PaginatedTableProps } from "./paginated-table";

export interface ActionTableProps<T> extends PaginatedTableProps<T> {
  actions: ActionHandlers<T>;
}

export function ActionTable<T>({
  columns = [],
  actions,
  ...tableProps
}: ActionTableProps<T>) {
  const actionsColumn = createActionsColumn(actions);

  return (
    <PaginatedTable {...tableProps} columns={[...columns, actionsColumn]} />
  );
}
