import { Result } from "antd";
import { clientsPath } from "~/constants/paths";
import LinkButton from "../components/link-button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="404"
        title="Cliente No Encontrado"
        subTitle="El cliente que buscas no existe o no está disponible."
        extra={<LinkButton href={clientsPath()}>Volver a clientes</LinkButton>}
      />
    </div>
  );
}
