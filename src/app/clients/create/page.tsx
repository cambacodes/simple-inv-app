"use client";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { clientsPath } from "~/constants/paths";
import ClientUpsertForm, {
  type ClientFormData,
} from "~/feature/client/components/client-upsert-form";
import { api } from "~/trpc/react";

export default function CreateClientPage() {
  const router = useRouter();
  const [form] = useForm();
  const utils = api.useUtils();

  const createMutation = api.cliente.create.useMutation({
    onSuccess: () => {
      message.success("Cliente creado exitosamente");
      void utils.cliente.list.invalidate();
      router.push(clientsPath());
    },
  });

  const handleFinish = async (values: ClientFormData) => {
    try {
      const birthday = values.birthday ? values.birthday.toDate() : null;
      if (!birthday) {
        message.error("La fecha de nacimiento es requerida");
        return;
      }
      const clientData = {
        ...values,
        birthday,
      };

      await createMutation.mutateAsync(clientData);
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
              <Typography.Title level={3}>Crear Cliente</Typography.Title>
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
          <ClientUpsertForm
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
