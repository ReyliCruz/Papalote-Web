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

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>('');
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleItemClick = (name: string, path?: string) => {
    setActive(name);
    if (path) navigate(path);
    setIsOpen(false);
  };

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="relative">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-darkBlue p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
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
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
          w-64 md:w-72`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-gray-700">
                <button
                  onClick={() =>
                    item.subItems ? toggleSubMenu(item.name) : handleItemClick(item.name, item.path)
                  }
                  className={`w-full text-white text-lg py-4 px-6 text- transition-transform hover:scale-105 ${
                    active === item.name ? 'bg-lightLime text-black font-bold' : ''
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
                        onClick={() => handleItemClick(subItem.name, subItem.path)}
                        className={`w-full text-white text-md py-2 px-4 text-left transition-transform hover:scale-105 ${
                          active === subItem.name ? 'bg-green-400 text-black' : ''
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
            onClick={() => console.log('Cerrar sesión')}
            className="bg-logoutRed text-white text-lg py-4 transition-transform hover:scale-105"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
