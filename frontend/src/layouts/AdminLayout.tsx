import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface AdminLayoutProps {
  menuItems: { name: string; path?: string; subItems?: { name: string; path?: string }[] }[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ menuItems }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar menuItems={menuItems} />

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
