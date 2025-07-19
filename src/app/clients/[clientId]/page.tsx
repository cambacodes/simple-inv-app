"use client";

import {
  CalendarOutlined,
  EditOutlined,
  GlobalOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { notFound, useParams } from "next/navigation";
import LinkButton from "~/app/components/link-button";
import Spinner from "~/app/components/spinner";
import { clientEditPath } from "~/constants/paths";
import ClientHeader from "~/feature/client/components/client-header";
import { api } from "~/trpc/react";

export default function ClientViewPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const {
    data: client,
    isLoading,
    error,
  } = api.cliente.getById.useQuery(
    { id: Number(clientId) },
    { enabled: !!clientId }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !client) {
    notFound();
  }

  const fullName = `${client.firstName} ${client.firstLastName} ${client.secondLastName}`;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl">
        <ClientHeader
          clientId={client.id}
          fullName={fullName}
          actionButtons={
            <LinkButton
              href={clientEditPath(client.id, `/clients/${client.id}`)}
              type="primary"
              icon={<EditOutlined />}
              size="large"
            >
              Editar Cliente
            </LinkButton>
          }
        />

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
              <div className="flex items-center space-x-3 rounded-lg p-3">
                <UserOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Nombre</Typography.Text>
                  <div className="text-gray-700">{client.firstName}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <UserOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Apellido Paterno</Typography.Text>
                  <div className="text-gray-700">{client.firstLastName}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <UserOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Apellido Materno</Typography.Text>
                  <div className="text-gray-700">{client.secondLastName}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <CalendarOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Fecha de Nacimiento</Typography.Text>
                  <div className="text-gray-700">
                    {new Date(client.birthday).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <GlobalOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>País de Nacimiento</Typography.Text>
                  <div className="text-gray-700">{client.countryOfBirth}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={
              <div className="flex items-center space-x-2">
                <MailOutlined />
                <span>Contacto - Información Legal</span>
              </div>
            }
            className="shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-lg p-3">
                <MailOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Email</Typography.Text>
                  <div className="text-gray-700">{client.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <PhoneOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Teléfono</Typography.Text>
                  <div className="text-gray-700">{client.phoneNumber}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <IdcardOutlined className="text-lg0" />
                <div>
                  <Typography.Text strong>
                    Cédula de Identidad (CI)
                  </Typography.Text>
                  <div className="text-gray-700">{client.ci}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <IdcardOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>
                    Número de Identificación Tributaria (NIT)
                  </Typography.Text>
                  <div className="text-gray-700">{client.nit}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
