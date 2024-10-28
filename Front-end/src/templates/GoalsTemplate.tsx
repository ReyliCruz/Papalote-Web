import React, { useState } from 'react';

interface GoalsTemplateProps {
  initialGoals: string[];
  onAddGoal: (goal: string) => void;
  onRemoveGoal: (index: number) => void;
}

const GoalsTemplate: React.FC<GoalsTemplateProps> = ({
  initialGoals,
  onAddGoal,
  onRemoveGoal,
}) => {
  const [newGoal, setNewGoal] = useState<string>('');
  const [goals, setGoals] = useState<string[]>(initialGoals);

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      onAddGoal(newGoal);
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    onRemoveGoal(index);
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row items-start space-x-8 p-8">
      {/* Formulario para agregar objetivo */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Agregar objetivo</label>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Concientizar..."
          className="border border-gray-300 rounded-lg p-2 w-64"
        />
        <button
          onClick={handleAddGoal}
          className="bg-gray-800 text-white py-1 px-4 rounded-md hover:bg-black transition-colors"
        >
          Agregar
        </button>
      </div>

      {/* Lista de objetivos */}
      <div className="flex flex-col space-y-4 w-full md:w-1/2">
        {goals.map((goal, index) => (
          <div key={index} className="flex items-center space-x-4">
            <p className="flex-grow">• {goal}</p>
            <button
              onClick={() => handleRemoveGoal(index)}
              className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsTemplate;
