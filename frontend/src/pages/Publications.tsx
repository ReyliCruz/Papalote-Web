import React, { useState, useEffect } from "react";
import axios from "axios";
import PublicationCard from "../components/PublicationCard";

interface Publication {
  id: number;
  id_usuario: number;
  nombre: string;
  foto_perfil: string | null;
  descripcion: string;
  img: string;
  id_exhibicion: number | null;
  nombre_exhibicion: string | null;
  aceptado: boolean;
}

const Publications: React.FC = () => {
  const [filtro, setFiltro] = useState<"pendiente" | "aprobada">("pendiente");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          "https://papalote-backend.onrender.com/api/publicaciones-admin/"
        );
        setPublications(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const approvePublication = async (id: number) => {
    try {
      await axios.patch(
        `https://papalote-backend.onrender.com/api/publicaciones/${id}/`,
        { aceptado: true }
      );
      setPublications((prev) =>
        prev.map((pub) =>
          pub.id === id ? { ...pub, aceptado: true } : pub
        )
      );
    } catch (error) {
      console.error("Error approving publication:", error);
    }
  };

  const deletePublication = async (id: number) => {
    try {
      await axios.delete(
        `https://papalote-backend.onrender.com/api/publicaciones/${id}/`
      );
      setPublications((prev) => prev.filter((pub) => pub.id !== id));
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  const filteredPublications = publications.filter(
    (pub) => pub.aceptado === (filtro === "aprobada")
  );

  return (
    <div className="w-full p-6">
      {/* Header con los filtros */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
        <div className="flex justify-center space-x-8">
          <button
            className={`text-lg font-semibold relative pb-2 ${
              filtro === "pendiente"
                ? "text-black after:content-[''] after:absolute after:w-full after:h-1 after:bg-[#CFDF09] after:bottom-0 after:left-0"
                : "text-gray-600"
            }`}
            onClick={() => setFiltro("pendiente")}
          >
            Pendientes
          </button>
          <button
            className={`text-lg font-semibold relative pb-2 ${
              filtro === "aprobada"
                ? "text-black after:content-[''] after:absolute after:w-full after:h-1 after:bg-[#CFDF09] after:bottom-0 after:left-0"
                : "text-gray-600"
            }`}
            onClick={() => setFiltro("aprobada")}
          >
            Aprobadas
          </button>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-lightLime border-opacity-80"></div>
          <h1 className="mt-6 text-xl font-semibold text-gray-700">
            Cargando publicaciones...
          </h1>
          <p className="text-gray-500">Por favor, espera un momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub) => (
            <PublicationCard
              key={pub.id}
              publicacion={{
                id_publicacion: pub.id,
                id_usuario: pub.id_usuario,
                nombre_usuario: pub.nombre,
                foto_perfil: pub.foto_perfil,
                descripcion: pub.descripcion,
                foto_publicacion: pub.img,
                nombre_exhibicion: pub.nombre_exhibicion,
                status: filtro,
              }}
              onAprobar={approvePublication}
              onEliminar={deletePublication}
              isPending={filtro === "pendiente"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Publications;
