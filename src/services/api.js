const API_URL = 'http://localhost:4000/api';

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Credenciales incorrectas');
  return res.json();
};

export const getPlatos = async () => {
  const res = await fetch(`${API_URL}/platos`);
  return res.json();
};

export const getUsuarios = async (token) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
