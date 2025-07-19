import { ShopOutlined } from "@ant-design/icons";
import { Typography } from "antd";

type InventoryHeaderProps = {
  name: string;
  inventoryItemId: number;
  actionButtons: React.ReactNode;
};

export default function InventoryHeader({
  name,
  inventoryItemId,
  actionButtons,
}: InventoryHeaderProps) {
  return (
    <div className="mb-4 py-4">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <ShopOutlined className="text-6xl" />
          <div>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              {name}
            </Typography.Title>
            <Typography.Text type="secondary" className="text-lg">
              ID: {inventoryItemId}
            </Typography.Text>
          </div>
        </div>
        {actionButtons}
      </div>
    </div>
  );
}
