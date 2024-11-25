import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);
const Statistics: React.FC = () => {
  const [data, setData] = useState<any>(null);

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

  // === Representaciones Gráficas ===

  // 1. Usuarios por Edad y Rango
  const usuariosPorEdad = {
    labels: data.usuarios.por_edad.map((u: any) => u.edad),
    datasets: [
      {
        label: "Usuarios por Edad",
        data: data.usuarios.por_edad.map((u: any) => u.total),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const usuariosPorRango = {
    labels: Object.keys(data.usuarios.por_rango_edad),
    datasets: [
      {
        label: "Usuarios por Rango de Edad",
        data: Object.values(data.usuarios.por_rango_edad),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 2. Visitas por Día
  const visitasPorDia = {
    labels: data.visitas.por_dia.map((v: any) => v.day),
    datasets: [
      {
        label: "Visitas por Día",
        data: data.visitas.por_dia.map((v: any) => v.total),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // 3. Visitas por Zona
  const visitasPorZona = {
    labels: data.visitas.por_zona.map((z: any) => z.exhibicion__zona__nombre),
    datasets: [
      {
        label: "Visitas por Zona",
        data: data.visitas.por_zona.map((z: any) => z.total),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 4. Opiniones por Zona
  const opinionesPorZona = {
    labels: data.opiniones.por_zona.map((o: any) => o.exhibicion__zona__nombre),
    datasets: [
      {
        label: "Opiniones por Zona",
        data: data.opiniones.por_zona.map((o: any) => o.total_opiniones),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 5. Opiniones por Exhibición
  const opinionesPorExhibicion = {
    labels: data.opiniones.por_exhibicion.map((e: any) => e.exhibicion__nombre),
    datasets: [
      {
        label: "Opiniones por Exhibición",
        data: data.opiniones.por_exhibicion.map((e: any) => e.total_opiniones),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 6. Publicaciones Aceptadas vs Rechazadas
  const publicacionesStatus = {
    labels: ["Aceptadas", "Rechazadas"],
    datasets: [
      {
        label: "Estado de Publicaciones",
        data: [data.publicaciones.aceptadas, data.publicaciones.total - data.publicaciones.aceptadas],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-900 text-white space-y-6">
      <h1 className="text-2xl font-bold text-center">Dashboard Completo</h1>

      {/* Sección de Usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Usuarios por Edad</h2>
          <Bar data={usuariosPorEdad} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Usuarios por Rango de Edad</h2>
          <Pie data={usuariosPorRango} />
        </div>
      </div>

      {/* Sección de Visitas */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Visitas por Día</h2>
        <Line data={visitasPorDia} />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Visitas por Zona</h2>
        <Bar data={visitasPorZona} />
      </div>

      {/* Sección de Opiniones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Opiniones por Zona</h2>
          <Bar data={opinionesPorZona} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Opiniones por Exhibición</h2>
          <Bar data={opinionesPorExhibicion} />
        </div>
      </div>

      {/* Sección de Publicaciones */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Estado de Publicaciones</h2>
        <Pie data={publicacionesStatus} />
      </div>
    </div>
  );
};

export default Statistics;
