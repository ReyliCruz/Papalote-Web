import React from 'react';
import { useNavigate } from 'react-router-dom';
import GreenButton from '../components/GreenButton';
import character from '../assets/images/character.gif';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-lightLime via-white to-lightBlue">
      {/* Contenedor Principal */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-3xl text-center flex flex-col justify-between h-[80%]">
        {/* Imagen */}
        <img
          src={character}
          alt="Character"
          className="h-32 sm:h-40 lg:h-48 mx-auto object-contain"
        />

        {/* Títulos */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-darkBlue">
            ¡Bienvenido al Panel de Administración!
          </h1>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700">
            Papalote Museo del Niño Monterrey
          </h2>
        </div>

        {/* Descripción */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Gestiona las zonas, actividades, estadísticas y mucho más de manera
          eficiente desde este espacio diseñado especialmente para ti.
        </p>

        {/* Botón de Comenzar */}
        <div className="mt-4">
          <GreenButton text="Comenzar" onClick={() => navigate('/contenido')} />
        </div>
      </div>
    </div>
  );
};

export default Home;
