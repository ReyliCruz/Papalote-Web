import React from 'react';

interface ExhibitionTemplateProps {
  imageSrc: string;
  imageAlt: string;
  messageLabel: string;
  messageValue: string;
}

const ExhibitionTemplate: React.FC<ExhibitionTemplateProps> = ({
  imageSrc,
  imageAlt,
  messageLabel,
  messageValue,
}) => {
  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Imagen de la exposición */}
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-60 h-40 object-cover rounded-md shadow-md"
          />
        </div>

        {/* Mensaje de la exposición */}
        <div className="col-span-1 md:col-span-2">
          <label className="text-lg font-semibold mb-2 block">
            {messageLabel}
          </label>
          <textarea
            value={messageValue}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ExhibitionTemplate;
