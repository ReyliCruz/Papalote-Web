import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

interface Page {
  id: number;
  titulo_es: string;
  contenido_es: string;
  img: string | File | null;
}

interface ActivityTemplateProps {
  id: number;
  pages: Page[];
  name: string;
}

const ActivityTemplate: React.FC<ActivityTemplateProps> = ({ id, pages, name }) => {
  const [pageList, setPageList] = useState<Page[]>(pages);
  const [editingPageId, setEditingPageId] = useState<number | null>(null);
  const [originalPageData, setOriginalPageData] = useState<Page | null>(null);

  const handleDownloadQR = (exhibicionNombre: string) => {
    const qrCanvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (qrCanvas) {
      const qrDataUrl = qrCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = qrDataUrl;
      link.download = `QR-${exhibicionNombre}.png`;
      link.click();
    }
  };

  const handleAddPage = async () => {
    const newPage: Page = {
      id: 0,
      titulo_es: "Nuevo Título",
      contenido_es: "Nuevo Contenido",
      img: null,
    };

    const formData = new FormData();
    formData.append("titulo_es", newPage.titulo_es);
    formData.append("contenido_es", newPage.contenido_es);
    formData.append("exhibicion", String(id));

    try {
      const response = await axios.post(
        "https://papalote-backend.onrender.com/api/pagina-exhibicion/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPageList([
        ...pageList,
        { ...newPage, id: response.data.id, img: response.data.img },
      ]);
    } catch (error) {
      console.error("Error al agregar página:", error);
      alert("Hubo un error al agregar la página.");
    }
  };

  const handleDeletePage = async (pageId: number) => {
    try {
      await axios.delete(
        `https://papalote-backend.onrender.com/api/pagina-exhibicion/${pageId}/`
      );
      setPageList(pageList.filter((page) => page.id !== pageId));
    } catch (error) {
      console.error("Error al eliminar página:", error);
      alert("Hubo un error al eliminar la página.");
    }
  };

  const handleEditPage = (pageId: number) => {
    const pageToEdit = pageList.find((page) => page.id === pageId);
    if (pageToEdit) {
      setOriginalPageData({ ...pageToEdit });
      setEditingPageId(pageId);
    }
  };

  const handleSavePage = async (pageId: number) => {
    const pageToSave = pageList.find((page) => page.id === pageId);
    if (!pageToSave) return;

    const formData = new FormData();
    formData.append("titulo_es", pageToSave.titulo_es);
    formData.append("contenido_es", pageToSave.contenido_es);
    formData.append("exhibicion", String(id));
    if (pageToSave.img instanceof File) {
      formData.append("img", pageToSave.img);
    }

    try {
      const response = await axios.patch(
        `https://papalote-backend.onrender.com/api/pagina-exhibicion/${pageId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPageList((prev) =>
        prev.map((page) =>
          page.id === pageId ? { ...page, img: response.data.img } : page
        )
      );
      setEditingPageId(null);
      setOriginalPageData(null);
      alert("Página actualizada con éxito.");
    } catch (error) {
      console.error("Error al guardar página:", error);
      alert("Hubo un error al guardar la página.");
    }
  };

  const handleCancelEdit = (pageId: number) => {
    if (originalPageData) {
      setPageList((prev) =>
        prev.map((page) =>
          page.id === pageId ? originalPageData : page
        )
      );
    }
    setEditingPageId(null);
    setOriginalPageData(null);
  };

  const handleInputChange = (
    pageId: number,
    field: keyof Page,
    value: string
  ) => {
    setPageList((prev) =>
      prev.map((page) =>
        page.id === pageId ? { ...page, [field]: value } : page
      )
    );
  };

  const handleFileChange = (
    pageId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPageList((prev) =>
        prev.map((page) =>
          page.id === pageId ? { ...page, img: file } : page
        )
      );
    }
  };

  const renderImagePreview = (img: string | File | null) => {
    if (!img) {
      return "https://via.placeholder.com/300";
    }
    return img instanceof File ? URL.createObjectURL(img) : img;
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Botón para Descargar QR */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center">
          <QRCodeCanvas
            id="qr-code"
            value={`AppAlote://${name}`}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            marginSize={1}
          />
          <button
            onClick={() => handleDownloadQR(`${name}`)}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mt-4"
          >
            Descargar código QR
          </button>
        </div>
      </div>

      {pageList.map((page) => (
        <div
          key={page.id}
          className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <label className="font-semibold">Título</label>
              <input
                type="text"
                value={page.titulo_es}
                readOnly={editingPageId !== page.id}
                onChange={(e) =>
                  handleInputChange(page.id, "titulo_es", e.target.value)
                }
                className={`border border-gray-300 rounded-lg p-2 w-full mt-1 ${
                  editingPageId === page.id ? "" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="font-semibold">Contenido</label>
              <textarea
                value={page.contenido_es}
                readOnly={editingPageId !== page.id}
                onChange={(e) =>
                  handleInputChange(page.id, "contenido_es", e.target.value)
                }
                className={`border border-gray-300 rounded-lg p-2 w-full mt-1 ${
                  editingPageId === page.id ? "" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="font-semibold">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(page.id, e)}
                disabled={editingPageId !== page.id}
                className="border border-gray-300 rounded-lg p-2 w-full mt-1"
              />
            </div>

            {editingPageId === page.id ? (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSavePage(page.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => handleCancelEdit(page.id)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEditPage(page.id)}
                className="bg-lightLime hover:bg-green-500 text-black font-bold py-2 px-8 rounded-lg transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Editar
              </button>
            )}
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-xl font-bold">{page.titulo_es}</h2>
            <p className="text-gray-700">{page.contenido_es}</p>
            <img
              src={renderImagePreview(page.img)}
              alt="Preview"
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
            <button
              onClick={() => handleDeletePage(page.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleAddPage}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Agregar Página
        </button>
      </div>
    </div>
  );
};

export default ActivityTemplate;
