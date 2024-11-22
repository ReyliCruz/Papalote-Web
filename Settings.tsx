import React, { useState, useEffect } from "react";

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

const apiUrl = "https://papalote-backend.onrender.com/api/publicaciones/";

const PanelControl: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [filtro, setFiltro] = useState<"pendiente" | "aprobada">("pendiente");

  // Cargar datos desde la API al iniciar el componente
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch(apiUrl + "?format=json");
        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      }
    };

    fetchPublicaciones();
  }, []);

  // Función para aprobar una publicación
  const handleAprobar = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "aprobada" }),
      });

      if (response.ok) {
        setPublicaciones((prev) =>
          prev.map((pub) =>
            pub.id_publicacion === id ? { ...pub, status: "aprobada" } : pub
          )
        );
      } else {
        console.error("Error al aprobar publicación:", response.statusText);
      }
    } catch (error) {
      console.error("Error al aprobar publicación:", error);
    }
  };

  // Función para eliminar una publicación
  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPublicaciones((prev) =>
          prev.filter((pub) => pub.id_publicacion !== id)
        );
      } else {
        console.error("Error al eliminar publicación:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
    }
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
