import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", role: "Admin" },
    { id: 2, name: "María López", email: "maria.lopez@example.com", role: "Editor" },
    { id: 3, name: "Carlos Ruiz", email: "carlos.ruiz@example.com", role: "Viewer" },
  ]);

  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    role: "Viewer",
  });

  const [editing, setEditing] = useState(false);

  const handleAddOrUpdateUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (editing) {
      setUsers((prev) =>
        prev.map((user) => (user.id === newUser.id ? newUser : user))
      );
      setEditing(false);
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }

    setNewUser({ id: 0, name: "", email: "", role: "Viewer" });
  };

  const handleEditUser = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setNewUser(userToEdit);
      setEditing(true);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Usuarios</h1>

      {/* Formulario para agregar o editar usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mb-8 space-y-4">
        <h2 className="text-lg font-semibold">
          {editing ? "Editar Usuario" : "Agregar Nuevo Usuario"}
        </h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button
          onClick={handleAddOrUpdateUser}
          className="w-full bg-[#CFDF09] text-black font-semibold py-2 px-4 rounded-lg hover:bg-green-500"
        >
          {editing ? "Guardar Cambios" : "Agregar Usuario"}
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="border-b p-3 text-left">Nombre</th>
              <th className="border-b p-3 text-left">Correo</th>
              <th className="border-b p-3 text-left">Rol</th>
              <th className="border-b p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
