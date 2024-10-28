import React, { useState } from 'react';
import { goals } from '../data/goals';

const GoalsTemplate: React.FC = () => {
  const [newGoal, setNewGoal] = useState<string>('');
  const [goalList, setGoalList] = useState<string[]>(goals.objetivos);

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoalList([...goalList, newGoal]);
      setNewGoal('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    setGoalList(goalList.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <label className="font-semibold text-lg">Agregar objetivo</label>
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Concientizar..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            onClick={handleAddGoal}
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black transition-colors"
          >
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {goalList.map((goal, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-md"
            >
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
    </div>
  );
};

export default GoalsTemplate;
