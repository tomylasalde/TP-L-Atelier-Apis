import React, { useState, useEffect } from 'react';

export default function DishModal({ dish, onClose, onConfirm }) {
  const [localIngredients, setLocalIngredients] = useState([]);

  useEffect(() => {
    setLocalIngredients(dish.ingredientes || []);
  }, [dish]);

  const toggleIngredient = (ing) => {
    setLocalIngredients((prev) =>
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const handleConfirm = () => {
    onConfirm({ ...dish, ingredientes: localIngredients });
    onClose();
  };

  return (
    <div className="
      fixed inset-0 z-50
      flex items-center justify-center
      backdrop-brightness-50 backdrop-blur-sm
    ">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-lg text-white">
        {dish.image && (
          <div className="mb-4">
            <img
              src={dish.image}
              alt={dish.nombre}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">{dish.nombre}</h3>

        <div className="mb-4">
          <p className="font-semibold text-yellow-300 mb-2">Ingredientes:</p>
          {dish.ingredientes?.map(ing => (
            <label key={ing} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-yellow-500"
                checked={localIngredients.includes(ing)}
                onChange={() => toggleIngredient(ing)}
              />
              <span className="ml-2 text-sm text-gray-200">{ing}</span>
            </label>
          ))}
        </div>

        <div className="mb-6">
          <p className="font-semibold text-yellow-300 mb-2">Alérgenos:</p>
          <div className="flex flex-wrap gap-2">
            {dish.alergenos?.map(alg => (
              <span
                key={alg}
                className="bg-red-700 text-red-200 text-xs px-2 py-1 rounded-full"
              >
                {alg}
              </span>
            ))}
            {dish.alergenos?.length === 0 && (
              <span className="text-gray-400 text-sm">Sin alérgenos</span>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition font-medium"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition font-semibold"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
