import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, InputNumber, Row, Typography } from "antd";
import { InventorySearch } from "~/feature/inventory/components/inventory-search";
import type { SaleItemWithDetails, SaleIventoryItem } from "../types";

export const SaleItemCard = ({
  item,
  index,
  onProductChange,
  onQuantityChange,
  onRemove,
}: {
  item: SaleItemWithDetails;
  index: number;
  onProductChange: (index: number, inventoryItem: SaleIventoryItem) => void;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
}) => (
  <Card key={index} size="small" className="shadow-sm">
    <Row gutter={16} align="middle">
      <Col xs={24} md={12}>
        <div className="mb-2">
          <Typography.Text strong>Producto</Typography.Text>
        </div>
        <InventorySearch
          value={item.inventoryItemId || null}
          onChange={(inventoryItem) => onProductChange(index, inventoryItem)}
          placeholder="Buscar producto..."
        />
      </Col>

      <Col xs={8} md={4}>
        <div className="mb-2">
          <Typography.Text strong>Cantidad</Typography.Text>
        </div>
        <InputNumber
          value={item.quantity}
          onChange={(value) => onQuantityChange(index, value ?? 1)}
          min={1}
          max={item.inventoryItem?.stock}
          className="w-full"
          placeholder="Cant."
          status={
            item.inventoryItem && item.quantity > item.inventoryItem.stock
              ? "error"
              : undefined
          }
        />
        {item.inventoryItem && item.quantity > item.inventoryItem.stock && (
          <Typography.Text type="danger" className="text-xs">
            Stock disponible: {item.inventoryItem.stock}
          </Typography.Text>
        )}
      </Col>

      <Col xs={8} md={4}>
        <div className="mb-2">
          <Typography.Text strong>Precio Unit.</Typography.Text>
        </div>
        <div className="flex h-8 items-center">
          <Typography.Text>
            {item.inventoryItem
              ? `${item.inventoryItem.price.toFixed(2)} bs`
              : "-"}
          </Typography.Text>
        </div>
      </Col>

      <Col xs={8} md={3}>
        <div className="mb-2">
          <Typography.Text strong>Subtotal</Typography.Text>
        </div>
        <div className="flex h-8 items-center">
          <Typography.Text strong className="text-lg">
            {item.subtotal.toFixed(2)} bs
          </Typography.Text>
        </div>
      </Col>

      <Col xs={24} md={1}>
        <div className="flex justify-center pt-6 md:pt-0">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onRemove(index)}
          />
        </div>
      </Col>
    </Row>
  </Card>
);
