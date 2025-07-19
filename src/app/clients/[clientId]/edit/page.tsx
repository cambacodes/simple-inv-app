"use client";

import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Form, message, Space } from "antd";
import dayjs from "dayjs";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Spinner from "~/app/components/spinner";
import { clientsPath } from "~/constants/paths";
import ClientHeader from "~/feature/client/components/client-header";
import ClientUpsertForm, {
  type ClientFormData,
} from "~/feature/client/components/client-upsert-form";
import { api } from "~/trpc/react";

export default function EditClientPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const utils = api.useUtils();

  const redirectTo = searchParams.get("redirectTo") ?? clientsPath();

  const {
    data: client,
    isLoading,
    error,
  } = api.cliente.getById.useQuery(
    { id: Number(clientId) },
    { enabled: !!clientId }
  );

  const updateMutation = api.cliente.update.useMutation({
    onSuccess: () => {
      message.success("Cliente actualizado exitosamente");
      void utils.cliente.getById.invalidate({ id: Number(clientId) });
      void utils.cliente.list.invalidate();
      router.push(redirectTo);
    },
  });

  const [form] = Form.useForm<ClientFormData>();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !client) {
    notFound();
  }

  const handleFinish = async (values: ClientFormData) => {
    try {
      const clientData = {
        ...client,
        ...values,
        birthday: values.birthday ? values.birthday.toDate() : client.birthday,
      };

      await updateMutation.mutateAsync(clientData);
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
    router.back();
  };

  const fullName = `${client.firstName} ${client.firstLastName} ${client.secondLastName}`;

  const initialValues: ClientFormData = {
    ...client,
    birthday: client.birthday ? dayjs(client.birthday) : undefined,
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <ClientHeader
          clientId={client.id}
          fullName={fullName}
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

        <ClientUpsertForm
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
