import React, { useState } from 'react';
import ActivityTemplate from '../templates/ActivityTemplate';
import GoalsTemplate from '../templates/GoalsTemplate';
import OpinionsTemplate from '../templates/OpinionsTemplate';
import ExhibitionTemplate from '../templates/ExhibitionTemplate';

interface ExhibitionLayoutProps {
  title: string;
  primaryColor: string;
}

const sections = ['Datos Básicos', 'Actividad', 'Objetivos', 'Opiniones'];

const ExhibitionLayout: React.FC<ExhibitionLayoutProps> = ({
  title,
  primaryColor,
}) => {
  const [activeSection, setActiveSection] = useState<string>('Datos Básicos');

  return (
    <div className="w-full">
      {/* Título de la exhibición */}
      <h1
        className="text-3xl font-bold text-center py-4"
        style={{ color: primaryColor }}
      >
        {title}
      </h1>

      {/* Navegación entre secciones */}
      <div className="flex justify-center space-x-8 border-b-2 border-gray-300 mb-8">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`text-lg pb-2 transition-colors ${
              activeSection === section
                ? 'font-semibold text-black'
                : 'text-gray-500'
            }`}
            style={{
              borderBottom:
                activeSection === section
                  ? `2px solid ${primaryColor}`
                  : '2px solid transparent',
            }}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Contenido dinámico basado en la sección seleccionada */}
      <div className="p-8">
        {activeSection === 'Datos Básicos' && <ExhibitionTemplate />}
        {activeSection === 'Actividad' && <ActivityTemplate />}
        {activeSection === 'Objetivos' && <GoalsTemplate />}
        {activeSection === 'Opiniones' && <OpinionsTemplate />}
      </div>
    </div>
  );
};

export default ExhibitionLayout;
