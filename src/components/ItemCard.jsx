import React from 'react';

export default function ItemCard({ item, onAdd }) {
  return (
    <div className="w-full max-w-sm h-[500px] bg-gradient-to-br from-gray-900 to-black text-gray-100 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between">

      {/* ✅ Mostrar imagen si existe */}
      {item.image && (
        <img
          src={item.image}
          alt={item.nombre}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6 flex-1 overflow-y-auto">
       
        <h3 className="text-2xl font-bold mb-2 text-gold">{item.nombre}</h3>
        <p className="text-sm text-gray-300 mb-4">{item.descripcion}</p>
        
        <div className="flex flex-col mb-2">
          <div className="text-xs font-semibold text-gray-400 mb-1">Ingredientes:</div>
          <div className="flex flex-wrap max-h-16 overflow-y-auto">
            {item.ingredientes.map((ing, i) => (
              <span key={i} className="text-xs bg-gray-800 text-gray-200 rounded-full px-2 py-1 m-1">{ing}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div className="text-xs font-semibold text-gray-400 mb-1">Alérgenos:</div>
          <div className="flex flex-wrap max-h-16 overflow-y-auto">
            {item.alergenos.map((alg, i) => (
              <span key={i} className="text-xs bg-red-800 text-red-400 rounded-full px-2 py-1 m-1">{alg}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-black flex items-center justify-between">
        <span className="text-xl font-semibold text-gold">
          {item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
        </span>
        <div className="flex space-x-2">
          <button
            className="px-2 py-1 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition text-s font-medium"
            onClick={() => onAdd(item)}
          >
            Añadir
          </button>
          <button
            className="px-4 py-2 bg-gold text-black rounded-full hover:bg-opacity-90 transition"
            onClick={() => document.getElementById('entrantes').scrollIntoView({ behavior: 'smooth' })}
          >
            Menú
          </button>
        </div>
      </div>
    </div>
  );
}
