import Navbar from "@/components/admin/navbar";
import SideNav from "@/components/admin/sideNav";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed z-50">
        <SideNav />
      </div>

      <div className="flex flex-col flex-1">
        <div className="fixed w-full z-40">
          <Navbar />
        </div>
        <main className="overflow-auto flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
