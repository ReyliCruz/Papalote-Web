import React from 'react';
import { useNavigate } from 'react-router-dom';
import ZoneButton from '../components/ZoneButton';
import { zones } from '../data/zones';

const Zones: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Zonas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <ZoneButton
            key={zone.id}
            text={zone.text}
            color={zone.color}
            image={zone.image}
            onClick={() => navigate(`/${zone.text.toLowerCase()}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Zones;
