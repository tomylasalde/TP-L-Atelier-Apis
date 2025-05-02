import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ExperienceSection from './components/ExperienceSection';
import ChefSection from './components/ChefSection';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import DishModal from './components/DishModal';
import ShoppingCart from './components/ShoppingCart';
import { CartProvider, useCart } from './context/cartContext';
import { menu } from './data';
import './index.css';

function AppContent() {
  const [selected, setSelected] = useState('entrantes');
  const category = menu.find(cat => cat.id === selected);
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();

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
          <h1>L'Atelier</h1>
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
  return (
    <CartProvider>
      <ShoppingCart />
      <AppContent />
    </CartProvider>
  );
}
