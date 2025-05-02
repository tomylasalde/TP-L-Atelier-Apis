import React from 'react';
import { menu } from '../data';
export default function NavBar({ selected, onSelect }) {
  return (
<nav className="bg-black" id="menu-navbar">
<div className="flex overflow-x-auto p-4 space-x-2 justify-center">
        {menu.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selected === cat.id
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </nav>
  );
}