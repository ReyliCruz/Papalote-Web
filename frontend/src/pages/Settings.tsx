import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Ajustes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Account Settings */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Configuración de cuenta</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Nombre de usuario</label>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Correo electrónico</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Cambiar contraseña</label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <button className="mt-4 w-full bg-[#CFDF09] text-black py-2 rounded-lg font-semibold hover:bg-[#c4d409] transition">
              Guardar cambios
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold">Recibir notificaciones por correo</label>
              <input type="checkbox" className="w-6 h-6 accent-[#CFDF09]" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold">Notificaciones push</label>
              <input type="checkbox" className="w-6 h-6 accent-[#CFDF09]" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-semibold">Alertas de actividad</label>
              <input type="checkbox" className="w-6 h-6 accent-[#CFDF09]" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Preferencias</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Tema</label>
              <select className="w-full border border-gray-300 rounded-lg p-2">
                <option>Claro</option>
                <option>Oscuro</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Idioma</label>
              <select className="w-full border border-gray-300 rounded-lg p-2">
                <option>Español</option>
                <option>Inglés</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
