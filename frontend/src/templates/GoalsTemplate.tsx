import React, { useState } from "react";
import axios from "axios";

interface GoalsTemplateProps {
  id: number; // ID de la exhibición
  objectives: { id: number; descripcion_es: string }[];
}

const GoalsTemplate: React.FC<GoalsTemplateProps> = ({ id, objectives }) => {
  const [newGoal, setNewGoal] = useState<string>("");
  const [goalList, setGoalList] = useState<{ id: number; descripcion_es: string }[]>(objectives);
  const [loading, setLoading] = useState(false);

  const handleAddGoal = async () => {
    if (newGoal.trim() === "") {
      alert("Por favor, ingrese un objetivo.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://papalote-backend.onrender.com/api/objetivos/", {
        descripcion_es: newGoal,
        exhibicion: id,
      });

      const newGoalData = response.data;
      setGoalList([...goalList, { id: newGoalData.id, descripcion_es: newGoal }]);
      setNewGoal("");
      alert("Objetivo agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar objetivo:", error);
      alert("Hubo un error al agregar el objetivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGoal = async (goalId: number) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este objetivo?")) {
      return;
    }

    setLoading(true);

    try {
      await axios.delete(`https://papalote-backend.onrender.com/api/objetivos/${goalId}/`);
      setGoalList(goalList.filter((goal) => goal.id !== goalId));
      alert("Objetivo eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar objetivo:", error);
      alert("Hubo un error al eliminar el objetivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Agregar objetivo */}
        <div className="flex flex-col space-y-4">
          <label className="font-semibold text-lg">Agregar objetivo</label>
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Concientizar..."
            className="border border-gray-300 rounded-lg p-2 w-full"
            disabled={loading}
          />
          <button
            onClick={handleAddGoal}
            disabled={loading}
            className={`py-2 px-4 rounded-md transition-colors ${
              loading
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-black"
            }`}
          >
            {loading ? "Cargando..." : "Agregar"}
          </button>
        </div>

        {/* Listado de objetivos */}
        <div className="space-y-4">
          {goalList.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-md"
            >
              <p className="flex-grow">• {goal.descripcion_es}</p>
              <button
                onClick={() => handleRemoveGoal(goal.id)}
                disabled={loading}
                className={`py-1 px-4 rounded-md transition-colors ${
                  loading
                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-700"
                }`}
              >
                {loading ? "..." : "Eliminar"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsTemplate;
