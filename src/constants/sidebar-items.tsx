import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export interface SidebarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    key: "clientes",
    icon: <UserOutlined className="text-lg" />,
    label: "Clientes",
    path: "/clients",
  },
  {
    key: "sales",
    icon: <ShoppingCartOutlined className="text-lg" />,
    label: "Ventas",
    path: "/sales",
  },
  {
    key: "inventory",
    icon: <AppstoreOutlined className="text-lg" />,
    label: "Items",
    path: "/inventory",
  },
];
