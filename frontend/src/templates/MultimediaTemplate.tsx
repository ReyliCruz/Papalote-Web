import React, { useState, useEffect } from "react";
import axios from "axios";
import { useZones } from "../hooks/Zones";

interface ImageItem {
  id: number;
  img: string;
}

interface MultimediaTemplateProps {
  zoneId: number;
}

const MultimediaTemplate: React.FC<MultimediaTemplateProps> = ({ zoneId }) => {
  const { zones } = useZones();
  const [multimedia, setMultimedia] = useState<ImageItem[]>([]);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Cargar imágenes de la zona seleccionada
  useEffect(() => {
    const selectedZone = zones.find((zone) => zone.id === zoneId);
    if (selectedZone) {
      setMultimedia(selectedZone.images || []);
    } else {
      setMultimedia([]);
    }
  }, [zoneId, zones]);

  // Manejar la adición de una nueva imagen
  const handleAddMultimedia = async () => {
    if (!newImageFile) {
      alert("Por favor selecciona una imagen antes de agregar.");
      return;
    }

    const formData = new FormData();
    formData.append("img", newImageFile); // Archivo de la imagen
    formData.append("tipo_recurso", "1"); // Tipo recurso fijo como 1
    formData.append("zona", String(zoneId)); // ID de la zona

    try {
      const response = await axios.post(
        "https://papalote-backend.onrender.com/api/multimedia-zonas/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImage = {
        id: response.data.id, // ID devuelto por la API
        img: response.data.img, // URL de la imagen
      };

      setMultimedia([...multimedia, newImage]);
      setNewImageFile(null);
      setPreviewImage(null);
      alert("Imagen agregada con éxito.");
    } catch (error) {
      console.error("Error al agregar la imagen:", error);
      alert("Hubo un error al agregar la imagen.");
    }
  };

  // Manejar la eliminación de una imagen
  const handleRemoveMultimedia = async (id: number) => {
    try {
      await axios.delete(
        `https://papalote-backend.onrender.com/api/multimedia-zonas/${id}/`
      );
      setMultimedia(multimedia.filter((item) => item.id !== id));
      alert("Imagen eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      alert("Hubo un error al eliminar la imagen.");
    }
  };

  // Manejar el cambio de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Administrar Imágenes
      </h2>

      {/* Campo para cargar imagen */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-3 shadow-sm w-full sm:w-auto"
        />
        {previewImage && (
          <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
            <img
              src={previewImage}
              alt="Vista previa"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <button
          onClick={handleAddMultimedia}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Agregar
        </button>
      </div>

      {/* Galería de imágenes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {multimedia.map((item) => (
          <div key={item.id} className="relative group">
            <img
              src={item.img}
              alt={`Imagen ${item.id}`}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={() => handleRemoveMultimedia(item.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {multimedia.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No hay imágenes disponibles para esta zona.
        </p>
      )}
    </div>
  );
};

export default MultimediaTemplate;
