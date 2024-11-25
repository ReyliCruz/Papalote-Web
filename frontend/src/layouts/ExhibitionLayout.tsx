import React, { useState, useEffect } from 'react';
import ActivityTemplate from '../templates/ActivityTemplate';
import GoalsTemplate from '../templates/GoalsTemplate';
import OpinionsTemplate from '../templates/OpinionsTemplate';
import ExhibitionTemplate from '../templates/ExhibitionTemplate';
import axios from 'axios';

interface ExhibitionLayoutProps {
  title: string;
  primaryColor: string;
  id: number;
}

const sections = ['Datos Básicos', 'Actividad', 'Objetivos', 'Opiniones'];

const ExhibitionLayout: React.FC<ExhibitionLayoutProps> = ({
  primaryColor,
  id,
}) => {
  const [activeSection, setActiveSection] = useState<string>('Datos Básicos');
  const [exhibitionData, setExhibitionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://papalote-backend.onrender.com/api/exhibicion-completa/${id}`);
        setExhibitionData(response.data);
      } catch (err) {
        setError('Error al cargar los datos de la exhibición.');
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitionData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-lightLime border-opacity-80"></div>
        <h1 className="mt-6 text-xl font-semibold text-gray-700">
          Cargando exhibición...
        </h1>
        <p className="text-gray-500">Por favor, espera un momento.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <h1 className="text-xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Título de la exhibición */}
      <h1
        className="text-3xl font-bold text-center py-4"
        style={{ color: primaryColor }}
      >
        {exhibitionData.nombre.charAt(0).toUpperCase() + exhibitionData.nombre.slice(1).toLowerCase()}
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
        {activeSection === 'Datos Básicos' && <ExhibitionTemplate id={id} img={exhibitionData?.img || ''} message={exhibitionData?.mensaje_es || ''} />}
        {activeSection === 'Actividad' && <ActivityTemplate id={id} pages={exhibitionData.paginas} name={exhibitionData.nombre}/>}
        {activeSection === 'Objetivos' && <GoalsTemplate id={id} objectives={exhibitionData.objetivos}/>}
        {activeSection === 'Opiniones' && <OpinionsTemplate opinions={exhibitionData.opiniones}/>}
      </div>
    </div>
  );
};

export default ExhibitionLayout;
