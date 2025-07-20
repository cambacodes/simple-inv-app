import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { type Client } from "@prisma/client";
import { Button, Card, Col, Form, Row } from "antd";
import { type useRouter } from "next/navigation";
import { clientCreatePath } from "~/constants/paths";
import { ClientSearch } from "~/feature/client/components/client-search";

export const SaleClientSelection = ({
  selectedClient,
  onClientChange,
  disabled,
  router,
}: {
  selectedClient: Client | null;
  onClientChange: (client: Client | null) => void;
  disabled: boolean;
  router: ReturnType<typeof useRouter>;
}) => (
  <Card
    title={
      <div className="flex items-center gap-2">
        <UserOutlined />
        <span>Selección de Cliente</span>
      </div>
    }
    extra={
      <Button
        type="dashed"
        icon={<PlusCircleOutlined />}
        onClick={() => router.push(clientCreatePath("/sales/create"))}
        disabled={disabled}
      >
        Nuevo Cliente
      </Button>
    }
    className="mb-6"
  >
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item label="Buscar Cliente" required>
          <ClientSearch
            value={selectedClient?.id}
            onChange={onClientChange}
            placeholder="Buscar cliente por nombre..."
          />
        </Form.Item>
      </Col>
    </Row>
  </Card>
);
