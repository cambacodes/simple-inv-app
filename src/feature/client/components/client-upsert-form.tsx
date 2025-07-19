"use client";

import type { Dayjs } from "dayjs";
import { type z } from "zod/v4";
import { type ClientSchema } from "~/server/schema/client-schema";

type ClientData = z.infer<typeof ClientSchema>;

export type ClientFormData = Omit<ClientData, "birthday" | "id"> & {
  birthday: Dayjs | undefined;
};

import {
  GlobalOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UndoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, Space, Typography } from "antd";
import type { FormProps } from "antd/es/form/Form";

interface ClientUpsertFormProps
  extends Omit<FormProps<ClientFormData>, "onFinish"> {
  isPending: boolean;
  isEditMode?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  onFinish?: (values: ClientFormData) => void;
}

export default function ClientUpsertForm({
  isPending,
  isEditMode = false,
  onSubmit,
  onCancel,
  onFinish,
  ...formProps
}: ClientUpsertFormProps) {
  const actionText = isEditMode ? "Guardar Cambios" : "Crear Cliente";
  const descriptionText = isEditMode
    ? "Revisa y guarda los cambios del cliente."
    : "Completa la información para registrar un nuevo cliente.";

  return (
    <Form<ClientFormData>
      layout="vertical"
      className="space-y-6"
      onFinish={onFinish}
      {...formProps}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          title={
            <div className="flex items-center space-x-2">
              <UserOutlined />
              <span>Información Personal</span>
            </div>
          }
          className="shadow-lg"
        >
          <div className="space-y-4">
            <Form.Item<ClientFormData>
              label="Nombre"
              name="firstName"
              rules={[
                { required: true, message: "El nombre es obligatorio" },
                { max: 50, message: "Máximo 50 caracteres" },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="Apellido Paterno"
              name="firstLastName"
              rules={[
                {
                  required: true,
                  message: "El apellido paterno es obligatorio",
                },
                { max: 50, message: "Máximo 50 caracteres" },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="Apellido Materno"
              name="secondLastName"
              rules={[
                {
                  required: true,
                  message: "El apellido materno es obligatorio",
                },
                { max: 50, message: "Máximo 50 caracteres" },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="Fecha de Nacimiento"
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "La fecha de nacimiento es obligatoria",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="País de Nacimiento"
              name="countryOfBirth"
              rules={[
                { required: true, message: "El país es obligatorio" },
                { max: 50, message: "Máximo 50 caracteres" },
              ]}
            >
              <Input prefix={<GlobalOutlined />} />
            </Form.Item>
          </div>
        </Card>

        <Card
          title={
            <div className="flex items-center space-x-2">
              <MailOutlined />
              <span>Contacto - Información Legal</span>
            </div>
          }
          className="shadow-lg backdrop-blur-sm"
        >
          <div className="space-y-4">
            <Form.Item<ClientFormData>
              label="Correo Electrónico"
              name="email"
              rules={[
                { required: true, message: "El correo es obligatorio" },
                { type: "email", message: "Introduce un correo válido" },
                { max: 255, message: "Máximo 255 caracteres" },
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="Número de Teléfono"
              name="phoneNumber"
              rules={[
                { required: true, message: "El número es obligatorio" },
                { max: 20, message: "Máximo 20 caracteres" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="CI"
              name="ci"
              rules={[
                { required: true, message: "El CI es obligatorio" },
                { max: 50, message: "Máximo 50 caracteres" },
              ]}
            >
              <Input prefix={<IdcardOutlined />} />
            </Form.Item>

            <Form.Item<ClientFormData>
              label="NIT"
              name="nit"
              rules={[
                { required: true, message: "El NIT es obligatorio" },
                { max: 50, message: "Máximo 50 caracteres" },
              ]}
            >
              <Input prefix={<IdcardOutlined />} />
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
