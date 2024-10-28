import React from 'react';
import GreenButton from '../components/GreenButton';

interface ZoneProps {
  title: string;
  photo: string;
  message: string;
  description: string;
  primaryColor: string;
}

const ZoneTemplate: React.FC<ZoneProps> = ({
  title,
  photo,
  message,
  description,
}) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg xl:px-60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold mb-2">Foto</label>
          <input
            type="text"
            value={photo}
            readOnly
            className="border border-gray-300 rounded-lg p-2 w-full text-center"
          />
        </div>

        <div className="flex justify-center">
          <img
            src={photo}
            alt={title}
            className="w-40 h-40 object-contain rounded-lg"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-lg font-semibold mb-2 block">
            Mensaje de la zona
          </label>
          <textarea
            value={message}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-4"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-lg font-semibold mb-2 block">Descripción</label>
          <textarea
            value={description}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-4"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <GreenButton text='Editar'/>
      </div>
    </div>
  );
};

export default ZoneTemplate;
