import React, { useEffect, useState } from 'react';

export default function PlatosAdmin({ goBack }) {
  const [platos, setPlatos] = useState([]);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: '',
    descripcion: '',
    ingredientes: '',
    alergenos: '',
    precio: '',
    categoria: ''
  });
  const [imagen, setImagen] = useState(null);
  const [editPlato, setEditPlato] = useState(null);
  const [editImagen, setEditImagen] = useState(null);

  const categorias = [
    'entrantes',
    'ensaladas',
    'carnes-rojas',
    'carnes-blancas',
    'pescados',
    'pastas',
    'postres',
    'bebidas-alcoholicas',
    'bebidas-sin-alcohol'
  ];

  const fetchPlatos = async () => {
    const res = await fetch('http://localhost:4000/api/platos');
    const data = await res.json();
    setPlatos(data);
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4000/api/platos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPlatos();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('nombre', nuevoPlato.nombre);
    formData.append('descripcion', nuevoPlato.descripcion);
    formData.append('ingredientes', nuevoPlato.ingredientes);
    formData.append('alergenos', nuevoPlato.alergenos);
    formData.append('precio', nuevoPlato.precio);
    formData.append('categoria', nuevoPlato.categoria);
    if (imagen) {
      formData.append('image', imagen);
    }

    await fetch('http://localhost:4000/api/platos', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    setNuevoPlato({
      nombre: '',
      descripcion: '',
      ingredientes: '',
      alergenos: '',
      precio: '',
      categoria: ''
    });
    setImagen(null);
    fetchPlatos();
  };

  const handleEdit = (plato) => {
    setEditPlato({
      ...plato,
      ingredientes: plato.ingredientes.join(', '),
      alergenos: plato.alergenos.join(', ')
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('nombre', editPlato.nombre);
    formData.append('descripcion', editPlato.descripcion);
    formData.append('ingredientes', editPlato.ingredientes);
    formData.append('alergenos', editPlato.alergenos);
    formData.append('precio', editPlato.precio);
    formData.append('categoria', editPlato.categoria);
    if (editImagen) {
      formData.append('image', editImagen);
    }

    for (let pair of formData.entries()) {
  console.log(pair[0]+ ': ' + pair[1]);
}


    await fetch(`http://localhost:4000/api/platos/${editPlato._id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    console.log('Enviando FormData:', formData);


    setEditPlato(null);
    setEditImagen(null);
    fetchPlatos();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <button
        onClick={goBack}
        className="self-start mb-4 text-yellow-400 hover:text-yellow-300 transition"
      >
        ⬅️ Volver
      </button>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Administración de Platos</h2>

      {!editPlato && (
        <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-4 mb-8">
          <input
            placeholder="Nombre"
            value={nuevoPlato.nombre}
            onChange={e => setNuevoPlato({ ...nuevoPlato, nombre: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Descripción"
            value={nuevoPlato.descripcion}
            onChange={e => setNuevoPlato({ ...nuevoPlato, descripcion: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Ingredientes (separados por ,)"
            value={nuevoPlato.ingredientes}
            onChange={e => setNuevoPlato({ ...nuevoPlato, ingredientes: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Alérgenos (separados por ,)"
            value={nuevoPlato.alergenos}
            onChange={e => setNuevoPlato({ ...nuevoPlato, alergenos: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Precio"
            type="number"
            value={nuevoPlato.precio}
            onChange={e => setNuevoPlato({ ...nuevoPlato, precio: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={nuevoPlato.categoria}
            onChange={e => setNuevoPlato({ ...nuevoPlato, categoria: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImagen(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold transition"
          >
            Crear Plato
          </button>
        </form>
      )}

      {editPlato && (
        <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-4 mb-8">
          <h3 className="text-xl font-semibold text-yellow-400">Editar Plato</h3>
          <input
            placeholder="Nombre"
            value={editPlato.nombre}
            onChange={e => setEditPlato({ ...editPlato, nombre: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Descripción"
            value={editPlato.descripcion}
            onChange={e => setEditPlato({ ...editPlato, descripcion: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Ingredientes (separados por ,)"
            value={editPlato.ingredientes}
            onChange={e => setEditPlato({ ...editPlato, ingredientes: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Alérgenos (separados por ,)"
            value={editPlato.alergenos}
            onChange={e => setEditPlato({ ...editPlato, alergenos: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            placeholder="Precio"
            type="number"
            value={editPlato.precio}
            onChange={e => setEditPlato({ ...editPlato, precio: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={editPlato.categoria}
            onChange={e => setEditPlato({ ...editPlato, categoria: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={e => setEditImagen(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold transition"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => { setEditPlato(null); setEditImagen(null); }}
              className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-400 font-semibold transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">Listado de Platos</h3>
        <ul className="space-y-2">
          {platos.map(plato => (
            <li
              key={plato._id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded"
            >
              <div>
                <p className="font-semibold">{plato.nombre} <span className="text-sm text-gray-400">({plato.categoria})</span></p>
                <p className="text-sm text-gray-400">${plato.precio}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(plato)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition text-sm"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(plato._id)}
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
