import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import type { ColumnType } from "antd/es/table";

export interface ActionHandlers<T> {
  onView?: (record: T) => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
}

export const createActionsColumn = <T,>(
  handlers: ActionHandlers<T>
): ColumnType<T> => {
  return {
    title: "Acciones",
    key: "actions",
    width: 120,
    fixed: "right",
    render: (_, record) => {
      const { onView, onEdit, onDelete } = handlers;

      return (
        <Space size="small">
          {onView && (
            <Tooltip title="Ver detalles">
              <Button
                type="default"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => onView(record)}
              />
            </Tooltip>
          )}

          {onEdit && (
            <Tooltip title="Editar">
              <Button
                type="dashed"
                size="small"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
              />
            </Tooltip>
          )}

          {onDelete && (
            <Popconfirm
              title="¿Eliminar registro?"
              description="Esta acción no se puede deshacer"
              onConfirm={() => onDelete(record)}
              okText="Eliminar"
              cancelText="Cancelar"
              okType="danger"
            >
              <Tooltip title="Eliminar">
                <Button
                  type="primary"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      );
    },
  };
};
