import React, { useState } from 'react';
import { login } from '../services/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      onLogin(data.usuario);
    } catch (error) {
      alert('Error de login: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-semibold text-center">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
