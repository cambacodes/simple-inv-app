"use client";

import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import type { Client } from "@prisma/client";
import { Button, Col, Form, message, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { salesPath } from "~/constants/paths";
import { SaleClientSelection } from "~/feature/sales/components/sale-client-selection";
import { SaleProducts } from "~/feature/sales/components/sale-products";
import { SaleSummary } from "~/feature/sales/components/sale-summary";
import { useSale } from "~/feature/sales/hook/use-sale";
import type { SaleFormData } from "~/feature/sales/types";
import { api } from "~/trpc/react";

export default function CreateSalePage() {
  const router = useRouter();
  const [form] = Form.useForm<SaleFormData>();
  const utils = api.useUtils();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const {
    itemsWithDetails,
    totalAmount,
    validItemsCount,
    addItem,
    removeItem,
    updateItemProduct,
    updateItemQuantity,
    reset: resetItems,
  } = useSale();

  const createMutation = api.sales.create.useMutation({
    onSuccess: () => {
      message.success("Venta creada exitosamente");
      void utils.sales.list.invalidate();
      void utils.inventory.list.invalidate();
      router.push(salesPath());
    },
    onError: (error) => {
      message.error(error.message || "Error al procesar la venta");
    },
  });

  const validationErrors = useMemo(() => {
    const errors: string[] = [];

    if (!selectedClient) errors.push("Debe seleccionar un cliente");
    if (itemsWithDetails.length === 0)
      errors.push("Debe agregar al menos un producto");
    if (validItemsCount !== itemsWithDetails.length)
      errors.push(
        "Todos los productos deben tener una selección válida y cantidad"
      );

    const stockIssues = itemsWithDetails.filter(
      (it) => it.inventoryItem && it.quantity > it.inventoryItem.stock
    );
    if (stockIssues.length > 0)
      errors.push("Algunos productos exceden el stock disponible");

    return errors;
  }, [selectedClient, itemsWithDetails, validItemsCount]);

  const isSubmitDisabled =
    validationErrors.length > 0 || createMutation.isPending;

  const handleSubmit = useCallback(async () => {
    if (validationErrors.length > 0) {
      message.error(validationErrors[0]);
      return;
    }

    const validItems = itemsWithDetails
      .filter((it) => it.isValid)
      .map((it) => ({
        inventoryItemId: it.inventoryItemId,
        quantity: it.quantity,
      }));

    await createMutation.mutateAsync({
      clientId: selectedClient!.id,
      items: validItems,
    });
  }, [validationErrors, itemsWithDetails, createMutation, selectedClient]);

  const resetForm = useCallback(() => {
    form.resetFields();
    resetItems();
    setSelectedClient(null);
  }, [form, resetItems]);

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <Typography.Title level={2} className="!mb-0">
            Nueva Venta
          </Typography.Title>
          <Space size="middle">
            <Button
              icon={<UndoOutlined />}
              onClick={resetForm}
              disabled={createMutation.isPending}
            >
              Limpiar
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              size="large"
              disabled={isSubmitDisabled}
              loading={createMutation.isPending}
              onClick={handleSubmit}
            >
              Finalizar Venta
            </Button>
          </Space>
        </div>

        <Form form={form} layout="vertical" disabled={createMutation.isPending}>
          <Row gutter={24}>
            <Col xs={24} xl={16}>
              <SaleClientSelection
                selectedClient={selectedClient}
                onClientChange={setSelectedClient}
                disabled={createMutation.isPending}
                router={router}
              />

              <SaleProducts
                items={itemsWithDetails}
                onAddItem={addItem}
                onProductChange={updateItemProduct}
                onQuantityChange={updateItemQuantity}
                onRemoveItem={removeItem}
              />
            </Col>

            <Col xs={24} xl={8}>
              <SaleSummary
                totalItems={itemsWithDetails.length}
                totalAmount={totalAmount}
                isSubmitDisabled={isSubmitDisabled}
                isLoading={createMutation.isPending}
                onSubmit={handleSubmit}
                onReset={resetForm}
                onCancel={() => router.back()}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
