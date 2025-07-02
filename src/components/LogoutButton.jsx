import React from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-500 rounded-full shadow hover:bg-red-600 transition"
      title="Cerrar Sesión"
    >
      <FiLogOut className="w-6 h-6 text-white" />
    </button>
  );
}
