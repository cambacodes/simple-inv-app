"use client";

import {
  DollarOutlined,
  EditOutlined,
  FileTextOutlined,
  InboxOutlined,
  NumberOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { notFound, useParams } from "next/navigation";
import LinkButton from "~/app/components/link-button";
import Spinner from "~/app/components/spinner";
import { inventoryEditPath } from "~/constants/paths";
import InventoryHeader from "~/feature/inventory/components/inventory-header";
import { api } from "~/trpc/react";

export default function InventoryItemViewPage() {
  const { inventoryItemId } = useParams<{ inventoryItemId: string }>();
  const {
    data: inventoryItem,
    isLoading,
    error,
  } = api.inventory.getById.useQuery(
    { id: Number(inventoryItemId) },
    { enabled: !!inventoryItemId }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !inventoryItem) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl">
        <InventoryHeader
          inventoryItemId={inventoryItem.id}
          name={inventoryItem.name}
          actionButtons={
            <LinkButton
              href={inventoryEditPath(
                inventoryItem.id,
                `/inventory/${inventoryItem.id}`
              )}
              type="primary"
              icon={<EditOutlined />}
              size="large"
            >
              Editar Item
            </LinkButton>
          }
        />

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
              <div className="flex items-center space-x-3 rounded-lg p-3">
                <InboxOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Nombre</Typography.Text>
                  <div className="text-gray-700">{inventoryItem.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 rounded-lg p-3">
                <FileTextOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Descripción</Typography.Text>
                  <div className="text-gray-700">
                    {inventoryItem.description ?? "Sin descripción"}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={
              <div className="flex items-center space-x-2">
                <UngroupOutlined />
                <span>Detalles</span>
              </div>
            }
            className="shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-lg p-3">
                <NumberOutlined className="text-lg" />
                <div>
                  <Typography.Text strong>Cantidad en Stock</Typography.Text>
                  <div className="text-gray-700">{inventoryItem.stock}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg p-3">
                <DollarOutlined />
                <div>
                  <Typography.Text strong>Precio en bs</Typography.Text>
                  <div className="text-gray-700">{inventoryItem.price}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
