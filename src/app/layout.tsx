import "@ant-design/v5-patch-for-react-19";
import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import AppLayout from "./components/app-layout";
import Providers from "./components/providers";

export const metadata: Metadata = {
  title: "Simple Inv App",
  description: "Aplicacion sencilla de inventario",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
