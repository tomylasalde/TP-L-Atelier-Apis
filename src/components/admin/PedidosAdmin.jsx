
import React, { useEffect, useState } from 'react';

export default function PedidosAdmin({ goBack }) {
  const [pedidos, setPedidos] = useState([]);

  const fetchPedidos = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/pedidos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPedidos(data);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4000/api/pedidos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    fetchPedidos();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <button
        onClick={goBack}
        className="self-start mb-4 text-yellow-400 hover:text-yellow-300 transition"
      >
        ⬅️ Volver
      </button>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Gestión de Pedidos</h2>

      <div className="w-full max-w-4xl space-y-4">
        {pedidos.length === 0 ? (
          <p className="text-center text-gray-400">No hay pedidos registrados.</p>
        ) : (
          pedidos.map((pedido) => (
            <div
              key={pedido._id}
              className="bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Pedido ID: {pedido._id}</p>
                  <p className="text-sm text-gray-400">Estado: {pedido.estado}</p>
                  <p className="text-sm text-gray-400">
                    Total: ${pedido.total.toLocaleString('es-AR')}
                  </p>
                  <p className="text-sm text-gray-400">
                    Fecha: {new Date(pedido.createdAt).toLocaleString('es-AR')}
                  </p>
                </div>
                <select
                  value={pedido.estado}
                  onChange={(e) => actualizarEstado(pedido._id, e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="entregado">Entregado</option>
                </select>
              </div>
              <div>
                <p className="font-semibold mb-1">Items:</p>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                  {pedido.items.map((item, idx) => (
                    <li key={idx}>
                      {item.nombre} - ${item.precio.toLocaleString('es-AR')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
