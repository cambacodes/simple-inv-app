import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import { TRPCReactProvider } from "~/trpc/react";

type ProvidersProps = { children: React.ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <AntdRegistry>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </AntdRegistry>
  );
}
