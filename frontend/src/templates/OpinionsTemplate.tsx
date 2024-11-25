import React from 'react';

interface OpinionsTemplateProps {
  opinions: {
    id: number;
    descripcion: string;
    calificacion: number;
    fecha_opinion: string;
    usuario__nombre: string;
    usuario__apellido: string;
  }[];
}

const renderStars = (calificacion: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= calificacion ? '★' : '☆');
  }
  return stars.join('');
};

const OpinionsTemplate: React.FC<OpinionsTemplateProps> = ({ opinions }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Opiniones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opinions.map((opinion) => (
          <div
            key={opinion.id}
            className="flex flex-col items-center md:flex-row bg-white p-4 rounded-lg shadow-md"
          >
            {/* Calificación en estrellas */}
            <div className="flex-shrink-0 text-yellow-500 text-2xl md:mr-4 mb-2 md:mb-0">
              {renderStars(opinion.calificacion)}
            </div>

            {/* Información de la opinión */}
            <div className="bg-gray-100 p-4 rounded-lg flex-grow text-center md:text-left">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{opinion.usuario__nombre} {opinion.usuario__apellido}</strong> 
                {' '} el {new Date(opinion.fecha_opinion).toLocaleDateString()}
              </p>
              <p className="text-gray-800">{opinion.descripcion || 'Sin descripción.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpinionsTemplate;
