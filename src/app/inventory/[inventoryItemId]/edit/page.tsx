"use client";

import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Form, message, Space } from "antd";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Spinner from "~/app/components/spinner";
import { inventoryPath } from "~/constants/paths";
import InventoryHeader from "~/feature/inventory/components/inventory-header";
import InventoryItemUpsertForm, {
  type InventoryItemFormData,
} from "~/feature/inventory/components/inventory-upsert-form";
import { api } from "~/trpc/react";

export default function EditInventoryPage() {
  const { inventoryItemId } = useParams<{ inventoryItemId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const utils = api.useUtils();

  const redirectTo = searchParams.get("redirectTo") ?? inventoryPath();

  const {
    data: inventoryItem,
    isLoading,
    error,
  } = api.inventory.getById.useQuery(
    { id: Number(inventoryItemId) },
    { enabled: !!inventoryItemId }
  );

  const updateMutation = api.inventory.update.useMutation({
    onSuccess: () => {
      message.success("Item de inventario actualizado exitosamente");
      void utils.inventory.getById.invalidate({ id: Number(inventoryItemId) });
      void utils.inventory.list.invalidate();
      router.push(redirectTo);
    },
  });

  const [form] = Form.useForm<InventoryItemFormData>();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !inventoryItem) {
    notFound();
  }

  const handleFinish = async (values: InventoryItemFormData) => {
    console.log("🚀 ~ handleFinish ~ values:", values);
    try {
      const inventoryData = {
        ...inventoryItem,
        ...values,
        price: Number(values.price),
      };

      await updateMutation.mutateAsync(inventoryData);
    } catch (err) {
      console.error("Validation error:", err);

      if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error("Error al procesar los datos");
      }
    }
  };

  const handleCancel = () => {
    router.push(inventoryPath());
  };

  const initialValues: InventoryItemFormData = {
    ...inventoryItem,
    description: inventoryItem.description ?? "",
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <InventoryHeader
          inventoryItemId={inventoryItem.id}
          name={inventoryItem.name}
          actionButtons={
            <Space>
              <Button
                size="large"
                icon={<UndoOutlined />}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="large"
                onClick={() => form.submit()}
                loading={updateMutation.isPending}
              >
                Guardar
              </Button>
            </Space>
          }
        />

        <InventoryItemUpsertForm
          isPending={updateMutation.isPending}
          initialValues={initialValues}
          isEditMode
          onSubmit={() => form.submit()}
          onCancel={handleCancel}
          onFinish={handleFinish}
          form={form}
        />
      </div>
    </div>
  );
}
