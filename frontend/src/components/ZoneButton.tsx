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
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold" style={{ color: color }}>
          {text}
        </h2>
        <img src={image} alt={text} className="w-20 h-20 object-contain" />
      </div>

      <div className="py-2 px-4 text-center text-white font-bold" style={{ backgroundColor: color }}>
        Acceder →
      </div>
    </button>
  );
};

export default ZoneButton;
