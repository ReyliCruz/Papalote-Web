import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
//import Sidebar from '../components/Sidebar';
import SidebarTest from '../components/SidebarTest';

interface AdminLayoutProps {
  menuItems: { name: string; path?: string; subItems?: { name: string; path?: string }[] }[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ menuItems }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <SidebarTest menuItems={menuItems} />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
