import React, { useState, useEffect } from "react";
import axios from "axios";
import GreenButton from "../components/GreenButton";

interface ZoneProps {
  id: number;
  title: string;
  photo: string;
  message: string;
  description: string;
  primaryColor: string;
}

const ZoneTemplate: React.FC<ZoneProps> = ({
  id,
  title,
  photo,
  message,
  description,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [photoInput, setPhotoInput] = useState<string>(photo);
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [messageInput, setMessageInput] = useState<string>(message);
  const [descriptionInput, setDescriptionInput] = useState<string>(
    description
  );
  
  useEffect(() => {
    setPhotoInput(photo);
    setNewPhotoFile(null);
    setMessageInput(message);
    setDescriptionInput(description);
    setIsEditing(false);
  }, [id, photo, message, description]);

  const handleCancel = () => {
    setIsEditing(false);
    setPhotoInput(photo);
    setNewPhotoFile(null);
    setMessageInput(message);
    setDescriptionInput(description);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("mensaje_es", messageInput);
    formData.append("descripcion_es", descriptionInput);

    if (newPhotoFile) {
      formData.append("logo", newPhotoFile);
    }

    try {
      await axios.patch(
        `https://papalote-backend.onrender.com/api/zonas/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Zona actualizada con éxito");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar la zona:", error);
      alert("Hubo un error al actualizar la zona");
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPhotoFile(file);
      setPhotoInput(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg xl:px-60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold mb-2">Foto</label>
          <div className="flex items-center space-x-4">
            {isEditing && (
              <img
                src={photoInput}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
            )}
            {isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="border border-gray-300 rounded-lg p-2 text-center"
              />
            ) : (
              <img
                src={photoInput}
                alt={title}
                className="w-40 h-40 object-contain rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-lg font-semibold mb-2 block">
            Mensaje de la zona
          </label>
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            readOnly={!isEditing}
            className={`w-full border border-gray-300 rounded-lg p-4 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-lg font-semibold mb-2 block">Descripción</label>
          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            readOnly={!isEditing}
            className={`w-full border border-gray-300 rounded-lg p-4 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          </>
        ) : (
          <GreenButton text="Editar" onClick={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
};

export default ZoneTemplate;
