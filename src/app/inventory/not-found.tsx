import { Result } from "antd";
import { inventoryPath } from "~/constants/paths";
import LinkButton from "../components/link-button";

export default function InventoryNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, el item de inventario que buscas no existe."
      extra={
        <LinkButton href={inventoryPath()} type="primary">
          Volver al inventario
        </LinkButton>
      }
    />
  );
}
