import React from 'react';
import SectionButton from '../components/SectionButton';
import { useNavigate } from 'react-router-dom';
import { sections } from '../data/sections';

const Content: React.FC = () => {
    const navigate = useNavigate();

    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8">
        {sections.map((section) => (
          <SectionButton
            key={section.id}
            primaryColor={section.primaryColor}
            secondaryColor={section.secondaryColor}
            image={section.image}
            text={section.text}
            onClick={() => navigate(section.path)}
          />
        ))}
      </div>
    );
};

export default Content;
