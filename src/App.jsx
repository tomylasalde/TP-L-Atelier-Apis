import React, { useState, useEffect } from 'react';
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
import LogoutButton from './components/LogoutButton';
import './index.css';

function AppContent() {
  const [selected, setSelected] = useState('entrantes');
  const [menu, setMenu] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
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

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <Login onLogin={(userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }} />;
  }

  return user.rol === 'admin' ? (
    <AdminMenu />
  ) : (
    <CartProvider>
      <div className="fixed top-4 right-4 flex items-center space-x-12 z-50">
  <ShoppingCart />
  <LogoutButton onLogout={() => setUser(null)} />
</div>

      <AppContent />
    </CartProvider>
  );
}
