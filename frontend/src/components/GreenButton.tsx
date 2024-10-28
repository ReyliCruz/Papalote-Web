import React from 'react';

interface GreenButtonProps {
  text: string;
  onClick?: () => void;
}

const GreenButton: React.FC<GreenButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-lightLime 
        text-black 
        font-bold 
        py-4 
        px-8 
        rounded-xl 
        shadow-[0px_5px_10px_0px] 
        shadow-darkLime 
        transition-transform 
        hover:scale-105
      "
    >
      {text}
    </button>
  );
};

export default GreenButton;
