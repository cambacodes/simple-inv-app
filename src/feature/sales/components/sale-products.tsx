import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { type SaleItemWithDetails, type SaleIventoryItem } from "../types";
import { SaleItemCard } from "./sale-item";

export const SaleProducts = ({
  items,
  onAddItem,
  onProductChange,
  onQuantityChange,
  onRemoveItem,
}: {
  items: SaleItemWithDetails[];
  onAddItem: () => void;
  onProductChange: (index: number, inventoryItem: SaleIventoryItem) => void;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}) => (
  <Card
    title={
      <div className="flex items-center gap-2">
        <ShoppingCartOutlined />
        <span>Productos ({items.length})</span>
      </div>
    }
    extra={
      <Button type="dashed" icon={<PlusOutlined />} onClick={onAddItem}>
        Agregar Producto
      </Button>
    }
  >
    <div className="min-h-[120px]">
      {items.length === 0 ? (
        <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
          <div className="mb-4">
            <ShoppingCartOutlined style={{ fontSize: 48, color: "#d9d9d9" }} />
          </div>
          <div className="mb-4 text-gray-400">No hay productos agregados</div>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddItem}>
            Agregar Primer Producto
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <SaleItemCard
              key={`item-${index}-${item.inventoryItemId}`}
              item={item}
              index={index}
              onProductChange={onProductChange}
              onQuantityChange={onQuantityChange}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  </Card>
);
