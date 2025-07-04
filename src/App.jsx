
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import ExperienceSection from './components/ExperienceSection';
import ChefSection from './components/ChefSection';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import DishModal from './components/DishModal';
import ShoppingCart from './components/ShoppingCart';
import { CartProvider, useCart } from './context/cartContext';
import Login from './components/Login';
import AdminMenu from './components/admin/AdminMenu';
import './index.css';

function AppContent() {
  const [selected, setSelected] = React.useState('entrantes');
  const [menu, setMenu] = React.useState([]);
  const [selectedDish, setSelectedDish] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { addToCart } = useCart();

  React.useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/platos');
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error('Error al cargar platos:', error);
      }
    };
    fetchPlatos();
  }, []);

  const category = {
    id: selected,
    title: selected.charAt(0).toUpperCase() + selected.slice(1),
    items: menu.filter(plato => plato.categoria.toLowerCase() === selected.toLowerCase())
  };

  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
    setModalOpen(true);
  };

  const handleConfirmDish = (updatedDish) => {
    addToCart(updatedDish);
    alert('Plato agregado correctamente');
    setModalOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="hero">
        <div className="hero-content">
          <h1>Ladines Gourmet</h1>
          <p>Descubra nuestra cocina gourmet de autor, una experiencia culinaria que fusiona tradición y vanguardia.</p>
        </div>
      </header>
      <div className="submenu">MENU</div>
      <NavBar selected={selected} onSelect={setSelected} />
      <main className="flex-grow bg-black">
        <CategorySection category={category} onAdd={handleSelectDish} />
        {modalOpen && (
          <DishModal
            dish={selectedDish}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmDish}
          />
        )}
      </main>
      <ExperienceSection />
      <ChefSection />
      <Footer />
    </div>
  );
}

function RedirectToLoginForAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  }, [navigate]);

  return null;
}

export default function App() {
  const handleLogin = (userData) => {
    console.log('logueado!!:', userData);

    if (userData.rol === 'admin') {
      window.location.href = '/admin-panel';
    } else {
      window.location.href = '/home';
    }
  };

  return (
    <CartProvider>
      <Router>
        <ShoppingCart />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<AppContent />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin" element={<RedirectToLoginForAdmin />} />
          <Route path="/admin-panel" element={<AdminMenu />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
