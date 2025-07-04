import React, { useState } from 'react';
import PlatosAdmin from './PlatosAdmin';
import UsuariosAdmin from './UsuariosAdmin';
import { useNavigate } from 'react-router-dom';

function AdminMenu() {
  const [view, setView] = useState('menu');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {view === 'menu' && (
        <div className="space-y-6 max-w-sm w-full text-center">
          <h2 className="text-3xl font-bold text-yellow-400">Panel de Administración</h2>
          <button
            onClick={() => setView('platos')}
            className="w-full py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 font-semibold transition"
          >
            Administrar Platos
          </button>
          <button
            onClick={() => setView('usuarios')}
            className="w-full py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 font-semibold transition"
          >
            Administrar Usuarios
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white rounded-full hover:bg-red-400 font-semibold transition"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {view === 'platos' && <PlatosAdmin goBack={() => setView('menu')} />}
      {view === 'usuarios' && <UsuariosAdmin goBack={() => setView('menu')} />}
    </div>
  );
}

export default AdminMenu;
