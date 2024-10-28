import React, { useState } from 'react';

interface ZoneLayoutProps {
  title: string;
  primaryColor: string;
  children?: React.ReactNode;
}

const sections = ['Datos básicos', 'Multimedia'];

const ZoneLayout: React.FC<ZoneLayoutProps> = ({ title, primaryColor, children }) => {
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
                ? `text-black border-b-2 border-black font-semibold`
                : 'text-gray-500'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeSection === 'Datos básicos' ? (
          <div>{children}</div>
        ) : (
          <div className="text-center">
            <p>No hay contenido multimedia disponible.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneLayout;
