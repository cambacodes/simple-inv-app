"use client";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { inventoryPath } from "~/constants/paths";
import InventoryItemUpsertForm, {
  type InventoryItemFormData,
} from "~/feature/inventory/components/inventory-upsert-form";
import { api } from "~/trpc/react";

export default function CreateInventoryPage() {
  const router = useRouter();
  const [form] = useForm();
  const utils = api.useUtils();

  const createMutation = api.inventory.create.useMutation({
    onSuccess: () => {
      message.success("Item de inventario creado exitosamente");
      void utils.inventory.list.invalidate();
      router.push(inventoryPath());
    },
  });

  const handleFinish = async (values: InventoryItemFormData) => {
    try {
      const inventoryData = {
        ...values,
        description: values.description ?? null,
      };

      await createMutation.mutateAsync(inventoryData);
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error("Error al procesar los datos");
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <Card
          title={
            <div className="flex min-h-16 flex-col items-center justify-between space-x-2 md:flex-row">
              <Typography.Title level={3}>
                Crear Item de Inventario
              </Typography.Title>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  size="large"
                  onClick={() => form.submit()}
                >
                  Guardar
                </Button>
                <Button
                  icon={<UndoOutlined />}
                  onClick={() => form.resetFields()}
                  size="large"
                >
                  Limpiar
                </Button>
              </Space>
            </div>
          }
        >
          <InventoryItemUpsertForm
            isPending={createMutation.isPending}
            onSubmit={() => form.submit()}
            onCancel={handleCancel}
            onFinish={handleFinish}
            form={form}
          />
        </Card>
      </div>
    </div>
  );
}
