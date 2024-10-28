import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-lightBlue flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 shadow-lg w-full space-y-2 md:space-y-0">
      <div className="flex items-center space-x-4">
        <button onClick={()=> navigate('/home')}>
          <img
            src="/images/Logo Papalote Monterrey.png"
            alt="Logo Papalote Monterrey"
            className="w-12 md:w-16 aspect-auto"
          />
        </button>
        <h1 className="text-white text-lg md:text-xl font-bold">Centro de control</h1>
      </div>

      <div className="text-white text-base md:text-lg">
        <span className="font-semibold">Código de acceso:</span> R2-h0L
      </div>
    </header>
  );
};

export default Header;
