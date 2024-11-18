import React, { useState } from "react";
import publicacionesData from "../data/publicaciones.json"; // Asegúrate de ajustar la ruta

interface Publicacion {
  id_publicacion: number;
  id_usuario: number;
  nombre_usuario: string;
  foto_perfil: string;
  descripcion: string;
  foto_publicacion: string;
  nombre_exhibicion: string;
  status: string;
}

const PanelControl: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>(publicacionesData);
  const [filtro, setFiltro] = useState<"pendiente" | "aprobada">("pendiente"); // Estado para el filtro

  const handleAprobar = (id: number) => {
    setPublicaciones((prev) =>
      prev.map((pub) =>
        pub.id_publicacion === id ? { ...pub, status: "aprobada" } : pub
      )
    );
  };

  const handleEliminar = (id: number) => {
    setPublicaciones((prev) =>
      prev.filter((pub) => pub.id_publicacion !== id)
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Publicaciones</h1>

      {/* Filtro de botones */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-bold rounded ${
            filtro === "pendiente"
              ? "bg-[#CFDF09] text-black"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }`}
          onClick={() => setFiltro("pendiente")}
        >
          Pendientes
        </button>
        <button
          className={`px-4 py-2 font-bold rounded ${
            filtro === "aprobada"
              ? "bg-[#CFDF09] text-black"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }`}
          onClick={() => setFiltro("aprobada")}
        >
          Aprobadas
        </button>
      </div>

      {/* Contenedor de cartas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
        {publicaciones
          .filter((pub) => pub.status === filtro)
          .map((pub) => (
            <div
              key={pub.id_publicacion}
              className="bg-[#F1FBFD] rounded shadow-lg max-w-sm mx-auto h-[500px]"
            >
              {/* Fondo azul en la parte superior */}
              <div className="bg-blue-500 h-16 flex items-center px-4 rounded-t">
                <img
                  src={pub.foto_perfil}
                  alt={pub.nombre_usuario}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <h3 className="text-white font-bold text-lg truncate">
                  {pub.nombre_usuario}
                </h3>
              </div>

              {/* Contenido de la carta */}
              <div className="p-4">
                <p className="text-base text-gray-700 mb-2 h-[80px] overflow-hidden">
                  {pub.descripcion}
                </p>
                <div className="flex justify-center mb-4">
                  <img
                    src={pub.foto_publicacion}
                    alt={pub.nombre_exhibicion}
                    className="w-full h-[200px] object-cover rounded mb-2"
                  />
                </div>
                <p className="text-base text-gray-600 mb-2">
                  Exhibición: {pub.nombre_exhibicion}
                </p>
                <div className="flex justify-end space-x-2 mt-2">
                  {/* Mostrar botón "Aprobar" solo si la publicación está pendiente */}
                  {filtro === "pendiente" && (
                    <button
                      onClick={() => handleAprobar(pub.id_publicacion)}
                      style={{ backgroundColor: "#CFDF09" }}
                      className="text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Aprobar
                    </button>
                  )}
                  <button
                    onClick={() => handleEliminar(pub.id_publicacion)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PanelControl;
