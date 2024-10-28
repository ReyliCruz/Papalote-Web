import React, { useState } from 'react';

interface ExhibitionLayoutProps {
  title: string;
  primaryColor: string;
}

const sections = ['Datos básicos', 'Actividad', 'Objetivos', 'Opiniones'];

const ExhibitionLayout: React.FC<ExhibitionLayoutProps> = ({ title, primaryColor }) => {
  const [activeSection, setActiveSection] = useState<string>('Datos básicos');

  return (
    <div className="w-full">
      <h1
        className="text-3xl font-bold text-center py-4"
        style={{ color: primaryColor }}
      >
        {title}
      </h1>

      <div className="flex justify-center space-x-8 border-b-2 border-gray-300 mb-8">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`text-lg pb-2 transition-colors ${
              activeSection === section
                ? `text-black border-b-2 font-semibold`
                : 'text-gray-500'
            }`}
            style={{
              borderColor: activeSection === section ? primaryColor : 'transparent',
            }}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionLayout;
