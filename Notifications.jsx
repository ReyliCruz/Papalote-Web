import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";

const apiUrl = "https://papalote-backend.onrender.com/api/notificaciones/?format=json";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(apiUrl);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  const handleAddNotification = async () => {
    if (!titulo || !descripcion) {
      alert("Por favor completa ambos campos");
      return;
    }

    const nuevaNotificacion = {
      titulo_es: titulo,
      descripcion_es: descripcion,
    };

    try {
      await axios.post("https://papalote-backend.onrender.com/api/notificaciones/", nuevaNotificacion);
      fetchNotifications();
      setTitulo("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al agregar la notificación:", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`https://papalote-backend.onrender.com/api/notificaciones/${id}/`);
      fetchNotifications();
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <div className="formulario">
        <h1>Crear Notificación</h1>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
        <button onClick={handleAddNotification}>Agregar Notificación</button>
      </div>

      <div className="notificaciones-actuales">
        <h2>Notificaciones Actuales</h2>
        {notifications.map((notification) => (
          <div key={notification.id} className="notificacion-item">
            <img src="C:\Users\diego\reactjs\src\megafono.png" alt="megafono" className="icono-megafono" />
            <div>
              <h3>{notification.titulo_es}</h3>
              <p>{notification.descripcion_es}</p>
            </div>
            <button
              className="boton-eliminar"
              onClick={() => handleDeleteNotification(notification.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
