import { Typography } from "antd";

type SaleHeaderProps = {
  saleNumber: number;
  clientName: string;
  actionButtons: React.ReactNode;
};

export default function SaleHeader({
  saleNumber,
  clientName,
  actionButtons,
}: SaleHeaderProps) {
  return (
    <div className="mb-4 py-4">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <div>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Venta #{saleNumber}
            </Typography.Title>
            <Typography.Text type="secondary" className="text-lg">
              Cliente: {clientName}
            </Typography.Text>
          </div>
        </div>
        {actionButtons}
      </div>
    </div>
  );
}
