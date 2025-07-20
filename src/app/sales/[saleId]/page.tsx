"use client";

import { PrinterOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { notFound, useParams } from "next/navigation";
import { useMemo } from "react";
import Spinner from "~/app/components/spinner";
import SaleHeader from "~/feature/sales/components/sale-header";
import { api } from "~/trpc/react";

export default function SaleViewPage() {
  const { saleId } = useParams<{ saleId: string }>();
  const {
    data: sale,
    isLoading,
    error,
  } = api.sales.getById.useQuery({ id: saleId }, { enabled: !!saleId });

  const total = useMemo(() => {
    if (!sale) return "0.00";
    const total = sale.saleItems.reduce((sum, item) => {
      return sum + item.quantity * item.inventoryItem.price;
    }, 0);
    return total.toFixed(2);
  }, [sale]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !sale) {
    notFound();
  }

  const clientName = `${sale.client.firstName} ${sale.client.firstLastName} ${sale.client.secondLastName}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        <SaleHeader
          saleNumber={sale.saleNumber}
          clientName={clientName}
          actionButtons={
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              size="large"
              onClick={handlePrint}
            >
              Imprimir
            </Button>
          }
        />

        <Card className="shadow-lg print:shadow-none">
          <div className="space-y-6">
            <div className="border-b-2 border-gray-300 pb-4 text-center">
              <Typography.Title level={2} className="!mb-2">
                Nota de venta
              </Typography.Title>
              <div className="flex justify-between text-sm">
                <span>Número nota: {sale.saleNumber}</span>
                <span>
                  Fecha nota: {new Date(sale.saleDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
              <UserOutlined className="text-lg" />
              <div>
                <Typography.Text strong>Cliente</Typography.Text>
                <div className="text-gray-700">{clientName}</div>
              </div>
            </div>

            <div>
              <div className="mb-4 grid grid-cols-4 gap-4 border-b-2 border-gray-300 pb-2 text-sm font-semibold">
                <div>Producto</div>
                <div className="text-center">Cantidad</div>
                <div className="text-center">Precio</div>
                <div className="text-center">SubTotal</div>
              </div>

              {sale.saleItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2"
                >
                  <div className="font-medium">{item.inventoryItem.name}</div>
                  <div className="text-center">{item.quantity}</div>
                  <div className="text-center">
                    {item.inventoryItem.price} bs
                  </div>
                  <div className="text-center font-semibold">
                    {(item.quantity * item.inventoryItem.price).toFixed(2)} bs
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t-2 border-gray-300 pt-4">
              <div className="text-right">
                <Typography.Title level={3} className="!mb-0">
                  Total nota: {total} bs
                </Typography.Title>
              </div>
            </div>

            <div className="pt-4 text-center text-sm text-gray-500">
              <p>Gracias por su compra</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
