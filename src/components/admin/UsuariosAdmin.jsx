import React, { useEffect, useState } from 'react';

export default function UsuariosAdmin({ goBack }) {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario'
  });
  const [editUsuario, setEditUsuario] = useState(null);

  const fetchUsuarios = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4000/api/usuarios/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsuarios();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch('http://localhost:4000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(nuevoUsuario)
    });
    setNuevoUsuario({
      nombre: '',
      email: '',
      password: '',
      rol: 'usuario'
    });
    fetchUsuarios();
  };

  const handleEdit = (usuario) => {
    setEditUsuario({
      ...usuario,
      password: ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:4000/api/usuarios/${editUsuario._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editUsuario)
    });

    setEditUsuario(null);
    fetchUsuarios();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <button
        onClick={goBack}
        className="self-start mb-4 text-yellow-400 hover:text-yellow-300 transition"
      >
        ⬅️ Volver
      </button>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Administración de Usuarios</h2>

      {!editUsuario && (
        <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-4 mb-8">
          <input
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Email"
            type="email"
            value={nuevoUsuario.email}
            onChange={e => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={nuevoUsuario.password}
            onChange={e => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={nuevoUsuario.rol}
            onChange={e => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold transition"
          >
            Crear Usuario
          </button>
        </form>
      )}

      {editUsuario && (
        <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-4 mb-8">
          <h3 className="text-xl font-semibold text-yellow-400">Editar Usuario</h3>
          <input
            placeholder="Nombre"
            value={editUsuario.nombre}
            onChange={e => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Email"
            type="email"
            value={editUsuario.email}
            onChange={e => setEditUsuario({ ...editUsuario, email: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Contraseña (opcional)"
            type="password"
            value={editUsuario.password}
            onChange={e => setEditUsuario({ ...editUsuario, password: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={editUsuario.rol}
            onChange={e => setEditUsuario({ ...editUsuario, rol: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold transition"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setEditUsuario(null)}
              className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-400 font-semibold transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Listado de Usuarios</h3>
        <ul className="space-y-2">
          {usuarios.map(usuario => (
            <li
              key={usuario._id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded"
            >
              <div>
                <p className="font-semibold">{usuario.nombre} <span className="text-sm text-gray-400">({usuario.rol})</span></p>
                <p className="text-sm text-gray-400">{usuario.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(usuario)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
