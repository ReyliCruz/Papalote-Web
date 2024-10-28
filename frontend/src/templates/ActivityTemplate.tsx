import React from 'react';
import { activity } from '../data/activity';

const ActivityTemplate: React.FC = () => {
  const { title, text, img } = activity;

  const handleSave = () => console.log('Guardado');
  const handleDelete = () => console.log('Eliminado');
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Imagen cargada', event.target.files);
  };
  const handleDownloadQR = () => console.log('Descargar QR');

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
        
        <div className="w-full lg:w-1/2 space-y-4">
          <button
            onClick={handleDownloadQR}
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black transition-colors w-full sm:w-auto"
          >
            Descargar código QR
          </button>

          <div>
            <label className="font-semibold">Título del reto</label>
            <input
              type="text"
              value={title}
              readOnly
              className="border border-gray-300 rounded-lg p-2 w-full mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Texto del reto</label>
            <textarea
              value={text}
              readOnly
              className="border border-gray-300 rounded-lg p-2 w-full mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="border border-gray-300 rounded-lg p-2 w-full mt-1"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-lightLime hover:bg-green-500 text-black font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105 w-full sm:w-auto"
          >
            Guardar
          </button>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-700">{text}</p>
          <img
            src={img}
            alt="Imagen de la actividad"
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityTemplate;
