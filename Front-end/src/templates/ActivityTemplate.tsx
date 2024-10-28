import React from 'react';

interface ActivityTemplateProps {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  onSave: () => void;
  onDelete: () => void;
  onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadQR: () => void;
}

const ActivityTemplate: React.FC<ActivityTemplateProps> = ({
  title,
  text,
  imageSrc,
  imageAlt,
  onSave,
  onDelete,
  onUploadImage,
  onDownloadQR,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 p-8">
      {/* Formulario de entrada */}
      <div className="flex flex-col space-y-4 w-full md:w-1/2">
        <button
          onClick={onDownloadQR}
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black transition-colors"
        >
          Descargar código QR
        </button>

        <label className="font-semibold">Título del reto</label>
        <input
          type="text"
          placeholder="Título del reto"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

        <label className="font-semibold">Texto del reto</label>
        <textarea
          placeholder="Texto del reto"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

        <label className="font-semibold">Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={onUploadImage}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

        <button
          onClick={onSave}
          className="bg-lightLime hover:bg-green-500 text-black font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105"
        >
          Guardar
        </button>
      </div>

      {/* Vista previa */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{text}</p>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover rounded-md shadow-md mb-4"
        />
        <button
          onClick={onDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ActivityTemplate;
