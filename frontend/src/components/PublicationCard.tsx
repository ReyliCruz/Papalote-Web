import React from "react";

interface Publicacion {
  id_publicacion: number;
  id_usuario: number;
  nombre_usuario: string;
  foto_perfil: string | null;
  descripcion: string;
  foto_publicacion: string;
  nombre_exhibicion: string | null;
  status: string;
}

interface PublicationCardProps {
  publicacion: Publicacion;
  onAprobar: (id: number) => void;
  onEliminar: (id: number) => void;
  isPending: boolean;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  publicacion,
  onAprobar,
  onEliminar,
  isPending,
}) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto border border-gray-300">
      {/* Header */}
      <div className="bg-gray-800 flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <img
            src={publicacion.foto_perfil || "https://via.placeholder.com/50"}
            alt={publicacion.nombre_usuario}
            className="w-10 h-10 rounded-full mr-3 border border-gray-500"
          />
          <h3 className="text-white font-semibold truncate">
            {publicacion.nombre_usuario}
          </h3>
        </div>
        <div className="flex space-x-2">
          {isPending ? (
            <>
              <button
                onClick={() => onEliminar(publicacion.id_publicacion)}
                className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-md"
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                onClick={() => onAprobar(publicacion.id_publicacion)}
                className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 shadow-md"
              >
                <i className="fas fa-check"></i>
              </button>
            </>
          ) : (
            <button
              onClick={() => onEliminar(publicacion.id_publicacion)}
              className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 shadow-md"
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Descripción */}
        <p className="text-gray-800 mb-3 text-sm font-medium">
          {publicacion.descripcion || "Sin descripción disponible."}
        </p>

        {/* Imagen de la publicación */}
        <div className="relative w-full h-48 mb-3">
          <img
            src={publicacion.foto_publicacion}
            alt={publicacion.nombre_exhibicion || "Publicación"}
            className="w-full h-full object-cover rounded-lg"
          />
          {publicacion.nombre_exhibicion && (
            <span className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
              {publicacion.nombre_exhibicion}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
