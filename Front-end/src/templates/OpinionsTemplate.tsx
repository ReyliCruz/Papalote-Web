import React from 'react';

interface Opinion {
  rating: number;
  comment: string;
}

interface OpinionsTemplateProps {
  opinions: Opinion[];
}

const OpinionsTemplate: React.FC<OpinionsTemplateProps> = ({ opinions }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Opiniones</h1>

      <div className="space-y-2">
        {opinions.map((opinion, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="text-xl">{renderStars(opinion.rating)}</div>
            <div className="bg-gray-100 p-2 rounded shadow">
              {opinion.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpinionsTemplate;
