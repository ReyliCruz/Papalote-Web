import React from 'react';

interface ZoneButtonProps {
  text: string;
  color: string;
  image: string;
  onClick?: () => void;
}

const ZoneButton: React.FC<ZoneButtonProps> = ({ text, color, image, onClick }) => {
  return (
    <button
      className="w-full max-w-sm h-48 rounded-md shadow-md overflow-hidden transition-transform hover:scale-105 bg-gray-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-center p-4 h-3/4">
        <h2 className="text-lg font-bold" style={{ color: color }}>
          {text}
        </h2>
        <img src={image} alt={text} className="w-20 h-20 object-contain" />
      </div>

      <div className="py-2 px-4 text-center text-white font-bold h-1/4" style={{ backgroundColor: color }}>
        Acceder →
      </div>
    </button>
  );
};

export default ZoneButton;
