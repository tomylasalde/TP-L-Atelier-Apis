import React from 'react';
export default function Footer() {
  const scrollToMenu = () => {
    const el = document.getElementById('menu-navbar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <footer className="bg-gray-900 text-gray-400 text-center p-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <div>
          <h3 className="text-lg text-gold font-semibold mb-2">Horario</h3>
          <p>Lun-Dom: 12:00 - 23:00</p>
        </div>
        <div>
          <h3 className="text-lg text-gold font-semibold mb-2">Dirección</h3>
          <p>Ladines 3625, CABA, Argentina</p>
        </div>
        <div>
          <h3 className="text-lg text-gold font-semibold mb-2">Teléfono</h3>
          <p>+54 9 11 1234-5678</p>
        </div>
      </div>
      <button onClick={scrollToMenu} className="px-6 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition mb-4">
      Menu
      </button>
      <p>&copy; {new Date().getFullYear()} L'Atelier. Todos los derechos reservados.</p>
    </footer>
  );
}