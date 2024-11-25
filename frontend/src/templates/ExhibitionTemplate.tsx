import React, { useState } from "react";
import axios from "axios";

interface ExhibitionTemplateProps {
  id: number;
  img: string;
  message: string;
}

const ExhibitionTemplate: React.FC<ExhibitionTemplateProps> = ({
  id,
  img,
  message,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedImg, setEditedImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string>(img);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedImg(null);
    setPreviewImg(img);
    setEditedMessage(message);
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (editedImg) {
      formData.append("img", editedImg);
    }
    formData.append("mensaje_es", editedMessage);

    try {
      await axios.patch(
        `https://papalote-backend.onrender.com/api/exhibiciones/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Cambios guardados con éxito.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditedImg(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <label className="text-lg font-semibold mb-2 block">Foto</label>
          <div className="w-full max-w-md h-auto">
            <img
              src={previewImg}
              alt="Imagen de la exposición"
              className="w-full h-auto object-cover rounded-md shadow-md mb-4"
            />
          </div>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          )}
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label className="text-lg font-semibold mb-2 block">
              Mensaje de la Exposición
            </label>
            <textarea
              value={editedMessage}
              readOnly={!isEditing}
              onChange={(e) => setEditedMessage(e.target.value)}
              className={`w-full border border-gray-300 rounded-lg p-4 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div className="flex space-x-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-lightLime hover:bg-green-500 text-black font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105"
              >
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionTemplate;
