import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Typography } from "antd";
interface SaleSummaryProps {
  totalItems: number;
  totalAmount: number;
  isSubmitDisabled: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onCancel: () => void;
}
export const SaleSummary = ({
  totalItems,
  totalAmount,
  isSubmitDisabled,
  isLoading,
  onSubmit,
  onReset,
  onCancel,
}: SaleSummaryProps) => (
  <div className="sticky top-4">
    <Card className="mb-4 h-full">
      <div className="text-center">
        <Typography.Title level={4} className="!mb-2 h-8">
          Resumen de Venta
        </Typography.Title>
        <div className="mb-4">
          <Typography.Text type="secondary">
            Total de productos: {totalItems}
          </Typography.Text>
        </div>
        <div className="h-48 rounded-lg bg-green-50 p-4">
          <Typography.Text type="secondary" className="block">
            Total a pagar
          </Typography.Text>
          <Typography.Title level={1}>
            {totalAmount.toFixed(2)} bs
          </Typography.Title>
        </div>
      </div>
    </Card>

    <Card>
      <div className="space-y-3">
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          block
          disabled={isSubmitDisabled}
          loading={isLoading}
          onClick={onSubmit}
        >
          Finalizar Venta
        </Button>
        <Button
          icon={<UndoOutlined />}
          size="large"
          block
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Divider />
        <Button
          icon={<UndoOutlined />}
          block
          onClick={onReset}
          disabled={isLoading}
          size="middle"
        >
          Limpiar Todo
        </Button>
      </div>

      <div className="mt-4 min-h-20 rounded bg-yellow-50 p-3">
        <Typography.Text type="warning" className="text-sm">
          <strong>Nota:</strong> Esta acción no se puede deshacer una vez
          completada.
        </Typography.Text>
      </div>
    </Card>
  </div>
);
