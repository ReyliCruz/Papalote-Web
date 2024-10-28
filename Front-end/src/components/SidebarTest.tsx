import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  name: string;
  path?: string;
  subItems?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const SidebarTest: React.FC<SidebarProps> = ({ menuItems }) => {
  const navigate = useNavigate();
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Estado para el menú hamburguesa

  const handleZoneClick = (zoneName: string, path?: string) => {
    setOpenMenu((prev) => (prev === zoneName ? null : zoneName));
    setSelectedParent(zoneName);
    setSelectedChild(null);
    if (path) navigate(path);
  };

  const handleSubItemClick = (parentName: string, path: string) => {
    setSelectedParent(parentName);
    setSelectedChild(path);
    navigate(path);
  };

  return (
    <div className="relative">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-darkBlue p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        className={`bg-darkBlue h-full fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static w-64 md:w-72`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-gray-700">
                <button
                  onClick={() => handleZoneClick(item.name, item.path)}
                  className={`w-full text-lg py-4 px-6 text-left transition-transform hover:scale-105 
                    ${
                      selectedParent === item.name && !selectedChild
                        ? 'bg-lightLime text-black font-bold'
                        : 'text-white'
                    }`}
                >
                  {item.name}
                  {item.subItems && (
                    <span className="float-right">
                      {openMenu === item.name ? '▼' : '▶'}
                    </span>
                  )}
                </button>

                {item.subItems && openMenu === item.name && (
                  <div className="pl-6 bg-gray-800">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleSubItemClick(item.name, subItem.path!)}
                        className={`w-full text-md py-2 px-4 text-left transition-transform hover:scale-105 
                          ${
                            selectedChild === subItem.path
                              ? 'bg-lightLime text-black font-bold'
                              : 'text-white'
                          }`}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/login')}
            className="bg-logoutRed text-white text-lg py-4 transition-transform hover:scale-105"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SidebarTest;
