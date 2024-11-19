import React, { useState } from "react";
import axios from "axios";
import "./Rewards.css";
const App = () => {
  // Estados para los datos de los formularios
  const [desafioData, setDesafioData] = useState({
    img: null,
    imgPreview: null,
    nombre: "",
    valor_meta: "",
    descripcion_es: "",
    recompensa: "",
  });

  const [recompensaData, setRecompensaData] = useState({
    img: null,
    imgPreview: null,
    nombre: "",
    tipo_recompensa: "tarjeta de usuario", // Valor predeterminado
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Manejadores para los cambios en los formularios
  const handleDesafioChange = (e) => {
    const { name, value } = e.target;
    setDesafioData({ ...desafioData, [name]: value });
  };

  const handleRecompensaChange = (e) => {
    const { name, value } = e.target;
    setRecompensaData({ ...recompensaData, [name]: value });
  };

  // Manejador para las imágenes
  const handleImageChange = (e, formType) => {
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file); // Crear URL para previsualización

    if (formType === "desafio") {
      setDesafioData({ ...desafioData, img: file, imgPreview: previewURL });
    } else {
      setRecompensaData({ ...recompensaData, img: file, imgPreview: previewURL });
    }
  };

  // Funciones para enviar datos a la API
  const handleDesafioSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Enviando desafío...");
    try {
      const formData = new FormData();
      for (const key in desafioData) {
        if (key !== "imgPreview") formData.append(key, desafioData[key]);
      }
      const response = await axios.post(
        "http://192.168.100.4:8000/api/desafios/?format=api",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStatusMessage("Desafío enviado exitosamente.");
      console.log("Respuesta de la API:", response.data);
      setDesafioData({
        img: null,
        imgPreview: null,
        nombre: "",
        valor_meta: "",
        descripcion_es: "",
        recompensa: "",
      });
    } catch (error) {
      console.error("Error al enviar el desafío:", error);
      setStatusMessage("Ocurrió un error al enviar el desafío.");
    }
  };

  const handleRecompensaSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Enviando recompensa...");
    try {
      const formData = new FormData();
      for (const key in recompensaData) {
        if (key !== "imgPreview") formData.append(key, recompensaData[key]);
      }
      const response = await axios.post(
        "http://192.168.100.4:8000/api/recompensas/?format=api",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStatusMessage("Recompensa enviada exitosamente.");
      console.log("Respuesta de la API:", response.data);
      setRecompensaData({
        img: null,
        imgPreview: null,
        nombre: "",
        tipo_recompensa: "tarjeta de usuario",
      });
    } catch (error) {
      console.error("Error al enviar la recompensa:", error);
      setStatusMessage("Ocurrió un error al enviar la recompensa.");
    }
  };

  return (
    <div className="app-container">
      <h1>Panel de Administración</h1>

      <div className="forms-container">
        {/* Formulario de Desafíos */}
        <div className="form-section">
          <h3>Agregar Desafío</h3>
          <form onSubmit={handleDesafioSubmit}>
            <div className="form-group">
              <label>Nombre del desafío:</label>
              <input
                type="text"
                name="nombre"
                value={desafioData.nombre}
                onChange={handleDesafioChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Valor meta:</label>
              <input
                type="number"
                name="valor_meta"
                value={desafioData.valor_meta}
                onChange={handleDesafioChange}
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                name="descripcion_es"
                value={desafioData.descripcion_es}
                onChange={handleDesafioChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Recompensa asociada:</label>
              <input
                type="text"
                name="recompensa"
                value={desafioData.recompensa}
                onChange={handleDesafioChange}
              />
            </div>
            <div className="form-group">
              <label>Subir imagen:</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "desafio")}
              />
              {desafioData.imgPreview && (
                <img
                  src={desafioData.imgPreview}
                  alt="Previsualización"
                  className="image-preview"
                />
              )}
            </div>
            <button type="submit">Enviar Desafío</button>
          </form>
        </div>

        {/* Formulario de Recompensas */}
        <div className="form-section">
          <h3>Agregar Recompensa</h3>
          <form onSubmit={handleRecompensaSubmit}>
            <div className="form-group">
              <label>Nombre de la recompensa:</label>
              <input
                type="text"
                name="nombre"
                value={recompensaData.nombre}
                onChange={handleRecompensaChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tipo de recompensa:</label>
              <select
                name="tipo_recompensa"
                value={recompensaData.tipo_recompensa}
                onChange={handleRecompensaChange}
                required
              >
                <option value="tarjeta de usuario">Tarjeta de Usuario</option>
                <option value="insignia">Insignia</option>
              </select>
            </div>
            <div className="form-group">
              <label>Subir imagen:</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "recompensa")}
              />
              {recompensaData.imgPreview && (
                <img
                  src={recompensaData.imgPreview}
                  alt="Previsualización"
                  className={
                    recompensaData.tipo_recompensa === "insignia"
                      ? "image-preview circular"
                      : "image-preview rectangular"
                  }
                />
              )}
            </div>
            <button type="submit">Enviar Recompensa</button>
          </form>
        </div>
      </div>

      {/* Mensaje de estado */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default App;

