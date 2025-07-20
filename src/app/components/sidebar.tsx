"use client";

import { CloseOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu, type MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SIDEBAR_ITEMS, type SidebarItem } from "~/constants/sidebar-items";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem =
    SIDEBAR_ITEMS.find((item) => pathname.startsWith(item.path))?.key ?? "";

  const handleMenuClick = (item: SidebarItem) => {
    router.push(item.path);
    setMobileOpen(false);
  };

  const menuItems: MenuProps["items"] = SIDEBAR_ITEMS.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <span className="font-medium">{item.label}</span>,
    onClick: () => handleMenuClick(item),
    className: `${
      activeItem === item.key
        ? "!bg-primary/10 !text-primary border-r-4 border-primary"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    } transition-all duration-200`,
  }));

  const sidebarContent = (
    <div className="h-full bg-white shadow-lg">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-primary text-xl font-bold">Simple Inv</h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeItem]}
        items={menuItems}
        className="border-0 bg-transparent"
      />
    </div>
  );

  return (
    <>
      <Button
        type="text"
        icon={mobileOpen ? <CloseOutlined /> : <MenuUnfoldOutlined />}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="!fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center !bg-white md:!hidden"
      />

      <div className="fixed z-20 hidden h-full w-[250px] md:block">
        {sidebarContent}
      </div>

      <Drawer
        placement="left"
        closable={false}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={250}
        className="md:hidden"
        styles={{ body: { padding: 0 } }}
      >
        {sidebarContent}
      </Drawer>

      <div className="hidden w-[250px] flex-shrink-0 md:block" />
    </>
  );
};

export default Sidebar;
