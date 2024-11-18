import React, { useState } from 'react';

interface Dialogo {
  id: number;
  mensaje: string;
}

const DialogManager: React.FC = () => {
  const [dialogos, setDialogos] = useState<Dialogo[]>([]); // Lista de diálogos
  const [nuevoMensaje, setNuevoMensaje] = useState<string>(''); // Mensaje nuevo

  // Agregar un nuevo diálogo
  const agregarDialogo = () => {
    if (!nuevoMensaje.trim()) return; // Evita mensajes vacíos
    const nuevoDialogo = { id: Date.now(), mensaje: nuevoMensaje }; // Crear nuevo diálogo
    setDialogos((prev) => [...prev, nuevoDialogo]); // Agregar a la lista
    setNuevoMensaje(''); // Limpiar el input
  };

  // Eliminar un diálogo
  const eliminarDialogo = (id: number) => {
    setDialogos((prev) => prev.filter((dialogo) => dialogo.id !== id)); // Filtrar y eliminar
  };

  return (
    <div className="flex p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg space-x-6">
      {/* Sección izquierda: Formulario */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Personaje</h1>
        <textarea
          className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe el diálogo aquí..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <button
          style={{ backgroundColor: '#CFDF09' }}
          className="mt-3 text-white font-bold py-2 px-4 rounded w-full"
          onClick={agregarDialogo}
        >
          Agregar
        </button>


      </div>

      {/* Sección derecha: Lista de diálogos */}
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">Diálogos actuales</h2>
        <ul className="space-y-4">
          {dialogos.map((dialogo) => (
            <li
              key={dialogo.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow"
            >
              <span className="flex-1">{dialogo.mensaje}</span>
              <button
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                onClick={() => eliminarDialogo(dialogo.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DialogManager;
