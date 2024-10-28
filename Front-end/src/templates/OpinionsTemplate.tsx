import React from 'react';
import opinions from '../data/opinions';

const renderStars = (calificacion: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= calificacion ? '★' : '☆');
  }
  return stars.join('');
};

const OpinionsTemplate: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Opiniones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opinions.map((opinion, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:flex-row bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex-shrink-0 text-yellow-500 text-2xl md:mr-4 mb-2 md:mb-0">
              {renderStars(opinion.calificacion)}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex-grow text-center md:text-left">
              {opinion.opinion}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpinionsTemplate;
