import React from "react";
import Sidebar from "./sidebar";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <main className="flex-1 overflow-auto p-4 md:p-0">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
