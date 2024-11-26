import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface StatisticsData {
  configuracion_general: {
    nombre_museo: string;
    sede: string;
    logo: string;
  };
  usuarios: {
    total: number;
    por_edad: { edad: number; total: number }[];
    por_rango_edad: Record<string, number>;
    activos_30_dias: number;
    no_activos: number;
  };
  visitas: {
    total: number;
    por_dia: { day: string; total: number }[];
    por_zona: { exhibicion__zona__nombre: string; total: number }[];
    por_exhibicion: { exhibicion__nombre: string; total: number }[];
  };
  opiniones: {
    promedio_calificacion_general: number;
    por_zona: { exhibicion__zona__nombre: string; promedio_calificacion: number }[];
    por_exhibicion: { exhibicion__nombre: string; promedio_calificacion: number }[];
  };
  zonas: {
    detalle: {
      id: number;
      nombre: string;
      total_exhibiciones: number;
      total_visitas: number;
      promedio_calificacion: number | null;
    }[];
  };
}

const Statistics: React.FC = () => {
  const [data, setData] = useState<StatisticsData | null>(null);

  useEffect(() => {
    axios
      .get("https://papalote-backend.onrender.com/api/estadisticas")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al cargar las estadísticas", error));
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-lightLime border-opacity-80"></div>
        <h1 className="mt-6 text-xl font-semibold text-gray-700">
          Cargando estadísticas...
        </h1>
        <p className="text-gray-500">Por favor, espera un momento.</p>
      </div>
    );
  }

  const { configuracion_general, usuarios, visitas, opiniones, zonas } = data;

  // Data for charts
  const visitsByZoneData = {
    labels: visitas.por_zona.map((z) => z.exhibicion__zona__nombre),
    datasets: [
      {
        label: "Visitas por Zona",
        data: visitas.por_zona.map((z) => z.total),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const visitsByExhibitionData = {
    labels: visitas.por_exhibicion.map((e) => e.exhibicion__nombre),
    datasets: [
      {
        label: "Visitas por Exhibición",
        data: visitas.por_exhibicion.map((e) => e.total),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  const userAgeRangesData = {
    labels: Object.keys(usuarios.por_rango_edad),
    datasets: [
      {
        label: "Usuarios por Rango de Edad",
        data: Object.values(usuarios.por_rango_edad),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const dailyVisitsData = {
    labels: visitas.por_dia.map((d) => d.day),
    datasets: [
      {
        label: "Visitas por Día",
        data: visitas.por_dia.map((d) => d.total),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const averageRatingByZone = {
    labels: opiniones.por_zona.map((z) => z.exhibicion__zona__nombre),
    datasets: [
      {
        label: "Calificación Promedio por Zona",
        data: opiniones.por_zona.map((z) => z.promedio_calificacion),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  const opinionsByExhibitionData = {
    labels: opiniones.por_exhibicion.map((e) => e.exhibicion__nombre),
    datasets: [
      {
        label: "Opiniones por Exhibición",
        data: opiniones.por_exhibicion.map((e) => e.promedio_calificacion || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const activeUsersData = {
    labels: ["Activos", "No Activos"],
    datasets: [
      {
        label: "Usuarios Activos vs No Activos",
        data: [usuarios.activos_30_dias, usuarios.no_activos],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const mostVisitedExhibitionsData = {
    labels: visitas.por_exhibicion.map((e) => e.exhibicion__nombre),
    datasets: [
      {
        label: "Visitas por Exhibición",
        data: visitas.por_exhibicion.map((e) => e.total),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{configuracion_general.nombre_museo}</h1>
          <p className="text-gray-600">{configuracion_general.sede}</p>
        </div>
        <img
          src={configuracion_general.logo}
          alt="Museo Logo"
          className="w-24 h-24 rounded-full"
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Usuarios Totales</h2>
          <p className="text-4xl font-bold text-indigo-600">{usuarios.total}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Visitas Totales</h2>
          <p className="text-4xl font-bold text-blue-600">{visitas.total}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Calificación Promedio</h2>
          <p className="text-4xl font-bold text-yellow-500">
            {opiniones.promedio_calificacion_general.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitas por Zona</h2>
          <Bar data={visitsByZoneData} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Usuarios por Rango de Edad</h2>
          <Pie data={userAgeRangesData} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitas por Día</h2>
          <Line data={dailyVisitsData} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitas por Exhibición</h2>
          <Bar data={visitsByExhibitionData} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Calificación Promedio por Zona</h2>
          <Bar data={averageRatingByZone} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Usuarios Activos vs No Activos</h2>
          <Pie data={activeUsersData} />;
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Exhibiciones Más y Menos Visitadas</h2>
          <Bar data={mostVisitedExhibitionsData} options={{ indexAxis: "y" }} />;
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Opiniones por Exhibición</h2>
          <Bar data={opinionsByExhibitionData} />;
        </div>
      </div>

      {/* Zone Details Table */}
      <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalles de Zonas</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Zona</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total de Exhibiciones</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total de Visitas</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Calificación Promedio</th>
            </tr>
          </thead>
          <tbody>
            {zonas.detalle.map((zona) => (
              <tr key={zona.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{zona.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{zona.total_exhibiciones}</td>
                <td className="border border-gray-300 px-4 py-2">{zona.total_visitas}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {zona.promedio_calificacion ? zona.promedio_calificacion.toFixed(2) : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
