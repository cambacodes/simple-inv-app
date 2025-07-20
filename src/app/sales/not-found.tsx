import { Result } from "antd";
import { salesPath } from "~/constants/paths";
import LinkButton from "~/app/components/link-button";

export default function SalesNotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la venta que buscas no existe."
      extra={
        <LinkButton href={salesPath()} type="primary">
          Volver a ventas
        </LinkButton>
      }
    />
  );
}
