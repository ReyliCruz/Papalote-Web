import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
  const [selectedPath, setSelectedPath] = useState<string | null>(null); // Nuevo estado

  const isActive = (path: string): boolean => location.pathname === path;

  useEffect(() => {
    setSelectedPath(location.pathname); // Actualizar cuando cambia la ruta
  }, [location]);

  const handleZoneClick = (zoneName: string, path?: string) => {
    if (path) {
      navigate(path);
      setSelectedPath(path); // Actualizar el estado del item seleccionado
    }
    setOpenSubMenus({ [zoneName]: !openSubMenus[zoneName] });
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    setSelectedPath(path); // Actualizar el estado del subitem seleccionado
  };

  return (
    <div className="relative">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-darkBlue p-2 rounded-md"
        onClick={() => setOpenSubMenus((prev) => ({ ...prev, menu: !prev.menu }))}
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
        className={`bg-darkBlue h-full fixed md:static top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out 
          w-64 md:w-72`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-gray-700">
                <button
                  onClick={() => handleZoneClick(item.name, item.path)}
                  className={`w-full text-lg py-4 px-6 text-left transition-transform hover:scale-105 
                    ${
                      selectedPath === item.path && !item.subItems
                        ? 'bg-lightLime text-black font-bold'
                        : 'text-white'
                    }`}
                >
                  {item.name}
                  {item.subItems && (
                    <span className="float-right">
                      {openSubMenus[item.name] ? '▼' : '▶'}
                    </span>
                  )}
                </button>

                {item.subItems && openSubMenus[item.name] && (
                  <div className="pl-6 bg-gray-800">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleSubItemClick(subItem.path!)}
                        className={`w-full text-md py-2 px-4 text-left transition-transform hover:scale-105 
                          ${
                            selectedPath === subItem.path
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
    </div>
  );
};

export default SidebarTest;
