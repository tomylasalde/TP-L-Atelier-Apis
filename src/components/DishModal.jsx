import React, { useState, useEffect } from 'react';

export default function DishModal({ dish, onClose, onConfirm }) {
  const [localIngredients, setLocalIngredients] = useState([]);
  const [localAllergens, setLocalAllergens] = useState([]);

  // se ejecuta cuando cambia la propiedad dish
  // Inicializamos los estados locales con los ingredientes y alérgenos del plato
  useEffect(() => {
    setLocalIngredients(dish.ingredients || []);
    setLocalAllergens(dish.allergens || []);
  }, [dish]);

  // agregamos o quitamos un ingrediente de la selección
  const toggleIngredient = (ing) => {
    setLocalIngredients((prev) =>
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  // modificacion de alergenos
  const toggleAllergen = (alg) => {
    setLocalAllergens((prev) =>
      prev.includes(alg) ? prev.filter(a => a !== alg) : [...prev, alg]
    );
  };

  // Llama a onConfirm pasando el objeto dish actualizado con los arrays locales de ingredientes y alérgenos
  const handleConfirm = () => {
    onConfirm({ ...dish, ingredients: localIngredients, allergens: localAllergens });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
        {dish.image && (
          <div className="mb-4">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{dish.name}</h3>
        <div className="mb-4">
          <p className="font-semibold text-gray-700 mb-2">Ingredientes:</p>
          {dish.ingredients.map(ing => (
            <label key={ing} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-yellow-500"
                checked={localIngredients.includes(ing)}
                onChange={() => toggleIngredient(ing)}
              />
              <span className="ml-2 text-sm text-gray-600">{ing}</span>
            </label>
          ))}
        </div>
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">Alérgenos:</p>
          {dish.allergens.map(alg => (
            <label key={alg} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-red-500"
                checked={localAllergens.includes(alg)}
                onChange={() => toggleAllergen(alg)}
              />
              <span className="ml-2 text-sm text-gray-600">{alg}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition font-medium"
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
