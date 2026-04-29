import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white w-full">
        <main className="overflow-auto p-4 w-full flex justify-center">{children}</main>
      </div>
  );
};

export default Layout;
