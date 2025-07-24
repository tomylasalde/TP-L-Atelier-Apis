import React, { useEffect, useState } from 'react';

export default function AuditoriasAdmin({ goBack }) {
  const [auditorias, setAuditorias] = useState([]);

  useEffect(() => {
    
    const fetchAuditorias = async () => {
      const token = localStorage.getItem('token');
      console.log('TOKEN:', token);

      const res = await fetch('http://localhost:4000/api/auditorias', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAuditorias(data);
    };
    fetchAuditorias();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <button
        onClick={goBack}
        className="self-start mb-4 text-yellow-400 hover:text-yellow-300 transition"
      >
        ⬅️ Volver
      </button>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Auditoría de Eventos</h2>

      <div className="w-full max-w-3xl">
        <ul className="space-y-2">
          {auditorias.map((auditoria) => (
            <li
              key={auditoria._id}
              className="bg-gray-800 p-4 rounded flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p className="font-semibold">{auditoria.accion.toUpperCase()} en {auditoria.entidad}</p>
                <p className="text-sm text-gray-400">{auditoria.detalle}</p>
                <p className="text-xs text-gray-500">
                  {new Date(auditoria.fecha).toLocaleString('es-AR')} por {auditoria.usuarioId?.nombre ?? 'Sistema'}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">{auditoria.entidadId}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
