import React from 'react';

interface SectionButtonProps {
  primaryColor: string;
  secondaryColor: string;
  image: string;
  text: string;
  onClick?: () => void;
}

const SectionButton: React.FC<SectionButtonProps> = ({
  primaryColor,
  secondaryColor,
  image,
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-sm h-48 rounded-md shadow-md overflow-hidden transition-transform hover:scale-105"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="flex h-3/4 items-center justify-between px-4">
        <span className="text-white font-bold text-lg">{text}</span>
        <img
          src={image}
          alt={text}
          className="w-24 md:w-20 object-contain opacity-40 mx-1"
        />
      </div>

      <div
        className="h-1/4 flex items-center justify-center"
        style={{ backgroundColor: secondaryColor }}
      >
        <span className="text-white font-bold">Acceder →</span>
      </div>
    </button>
  );
};

export default SectionButton;
