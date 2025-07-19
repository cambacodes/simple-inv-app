import { Avatar, Typography } from "antd";

type ClientHeaderProps = {
  fullName: string;
  clientId: number;
  actionButtons: React.ReactNode;
};

export default function ClientHeader({
  fullName,
  clientId,
  actionButtons,
}: ClientHeaderProps) {
  return (
    <div className="mb-4 py-4">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Avatar size={64} className="!bg-blue-500">
            {fullName.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              {fullName}
            </Typography.Title>
            <Typography.Text type="secondary" className="text-lg">
              ID: {clientId}
            </Typography.Text>
          </div>
        </div>
        {actionButtons}
      </div>
    </div>
  );
}
