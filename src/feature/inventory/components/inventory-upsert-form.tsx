"use client";

import { type z } from "zod/v4";

type InventoryItemData = z.infer<typeof UpdateInventoryItemSchema>;

export type InventoryItemFormData = Omit<InventoryItemData, "id">;

import {
  InboxOutlined,
  SaveOutlined,
  UndoOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
} from "antd";
import type { FormProps } from "antd/es/form/Form";
import type { UpdateInventoryItemSchema } from "~/server/schema/inventory-item-schema";

interface InventoryItemUpsertFormProps
  extends Omit<FormProps<InventoryItemFormData>, "onFinish"> {
  isPending: boolean;
  isEditMode?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  onFinish?: (values: InventoryItemFormData) => void;
}

export default function InventoryItemUpsertForm({
  isPending,
  isEditMode = false,
  onSubmit,
  onCancel,
  onFinish,
  ...formProps
}: InventoryItemUpsertFormProps) {
  const actionText = isEditMode ? "Guardar Cambios" : "Crear Item";
  const descriptionText = isEditMode
    ? "Revisa y guarda los cambios del item de inventario."
    : "Completa la información para registrar un nuevo item de inventario.";

  return (
    <Form<InventoryItemFormData>
      layout="vertical"
      className="space-y-6"
      onFinish={onFinish}
      {...formProps}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          title={
            <div className="flex items-center space-x-2">
              <InboxOutlined />
              <span>Información del Item</span>
            </div>
          }
          className="shadow-lg"
        >
          <div className="space-y-4">
            <Form.Item<InventoryItemFormData>
              label="Nombre"
              name="name"
              rules={[
                { required: true, message: "El nombre es obligatorio" },
                { max: 255, message: "Máximo 255 caracteres" },
              ]}
            >
              <Input prefix={<InboxOutlined />} />
            </Form.Item>

            <Form.Item<InventoryItemFormData>
              label="Descripción"
              name="description"
              rules={[{ max: 255, message: "Máximo 255 caracteres" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Descripción opcional del item"
              />
            </Form.Item>
          </div>
        </Card>

        <Card
          title={
            <div className="flex items-center space-x-2">
              <UngroupOutlined />
              <span>Detalles</span>
            </div>
          }
          className="shadow-lg backdrop-blur-sm"
        >
          <div className="space-y-4">
            <Form.Item<InventoryItemFormData>
              label="Cantidad en Stock"
              name="stock"
              rules={[
                { required: true, message: "El stock es obligatorio" },
                {
                  type: "number",
                  min: 0,
                  message: "El stock debe ser mayor o igual a 0",
                },
              ]}
            >
              <InputNumber className="w-full" min={0} placeholder="0" />
            </Form.Item>

            <Form.Item<InventoryItemFormData>
              label="Precio en Bs"
              name="price"
              rules={[
                { required: true, message: "El precio es obligatorio" },
                {
                  validator: (_, value) =>
                    typeof value === "number" && value >= 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("El precio debe ser mayor o igual a 0")
                        ),
                },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === null || value === "") {
                      return Promise.resolve();
                    }

                    const isValidDecimal =
                      typeof value === "number" &&
                      Number.isFinite(value) &&
                      /^\d+(\.\d{1,2})?$/.test(value.toString());

                    return isValidDecimal
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Solo se permiten hasta 2 decimales")
                        );
                  },
                },
              ]}
            >
              <InputNumber
                className="w-full"
                min={0}
                step={0.01}
                precision={2}
                placeholder="0.00"
              />
            </Form.Item>
          </div>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <Typography.Title level={4}>{actionText}</Typography.Title>
            <Typography.Text>{descriptionText}</Typography.Text>
          </div>
          <Space>
            <Button
              icon={<UndoOutlined />}
              onClick={onCancel}
              size="large"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              size="large"
              onClick={onSubmit}
              loading={isPending}
            >
              {actionText}
            </Button>
          </Space>
        </div>
      </Card>
    </Form>
  );
}
