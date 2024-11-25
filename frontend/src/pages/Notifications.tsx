import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GreenButton from '../components/GreenButton';

interface Notification {
  id?: number;
  title: string;
  description: string;
}

const Notifications: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar notificaciones iniciales
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://papalote-backend.onrender.com/api/notificaciones/');
        const fetchedNotifications = response.data.map((notification: any) => ({
          id: notification.id,
          title: notification.titulo_es,
          description: notification.descripcion_es,
        }));
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error al cargar las notificaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Crear una nueva notificación
  const handleAddNotification = async () => {
    if (title.trim() && description.trim()) {
      try {
        const newNotification = {
          titulo_es: title,
          descripcion_es: description,
        };
        const response = await axios.post(
          'https://papalote-backend.onrender.com/api/notificaciones/',
          newNotification
        );
        setNotifications([
          ...notifications,
          {
            id: response.data.id, // ID de la nueva notificación
            title: title,
            description: description,
          },
        ]);
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error adding notification:', error);
        setError('Error al agregar la notificación.');
      }
    }
  };

  // Eliminar notificación (opcional)
  const handleDeleteNotification = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`https://papalote-backend.onrender.com/api/notificaciones/${id}/`);
      setNotifications(notifications.filter((notification) => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError('Error al eliminar la notificación.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-8 text-center">Notificaciones</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la notificación"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe la descripción..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div className="flex justify-center">
          <GreenButton text="Agregar" onClick={handleAddNotification} />
        </div>
      </div>

      <div className="bg-gray-50 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-8 text-center">Notificaciones actuales</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-lightLime border-opacity-80"></div>
            <h1 className="mt-6 text-xl font-semibold text-gray-700">
              Cargando publicaciones...
            </h1>
            <p className="text-gray-500">Por favor, espera un momento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={notification.id || index}
                className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 relative"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt="Icono"
                  className="w-12 h-12 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{notification.title}</h3>
                  <p className="text-gray-600">{notification.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
