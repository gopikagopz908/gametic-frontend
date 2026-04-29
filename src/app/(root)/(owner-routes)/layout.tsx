import React, { ReactNode } from 'react';
import Navbar from '@/components/admin/navbar';
import SideBar from '@/components/owner/sideBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <div style={{ display: 'flex', height: '100vh' }}>
     <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />
      
      {/* Main content area */}
      {/* <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}> */}
       <div className="flex-1 flex flex-col ml-[300px]"> 
        {/* Navbar */}
        <Navbar />
        
        {/* Content area */}
        {/* <main style={{ flex: 1, padding: '20px' }}> */}
         <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

