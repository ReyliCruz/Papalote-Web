import React from 'react';
import { exhibition } from '../data/exhibition';

const ExhibitionTemplate: React.FC = () => {
  const { img, message } = exhibition;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Imagen de la exposición"
            className="w-full max-w-md h-auto object-cover rounded-md shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label className="text-lg font-semibold mb-2 block">
              Foto
            </label>
            <input
              type="text"
              value="imagen.jpg"
              readOnly
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="text-lg font-semibold mb-2 block">
              Mensaje de la Exposición
            </label>
            <textarea
              value={message}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-4"
            />
          </div>

          <button
            className="bg-lightLime hover:bg-green-500 text-black font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105 w-full sm:w-auto"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionTemplate;
