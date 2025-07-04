import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { LuShoppingCart as CartIcon } from 'react-icons/lu';

export default function ShoppingCart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState({});
  const [showPedidos, setShowPedidos] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const toggleDetails = (idx) => {
    setDetailsOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCheckout = async () => {
    try {
      const pedidoData = {
        items: cartItems.map(item => ({
          nombre: item.nombre,
          cantidad: 1,
          precio: item.precio
        })),
        total: cartItems.reduce((sum, item) => sum + item.precio, 0),
        cliente: {
          nombre: '',
          email: ''
        }
      };

      const res = await fetch('http://localhost:4000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData)
      });

      if (!res.ok) throw new Error('Error al enviar pedido');

      alert('Pedido enviado correctamente');
      clearCart();
      setOpen(false);
    } catch (error) {
      alert('Error al confirmar el pedido');
    }
  };

  const handleVerPedidos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/pedidos');
      const data = await res.json();
      setPedidos(data);
      setShowPedidos(true);
    } catch (error) {
      alert('Error al cargar los pedidos');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.precio || 0), 0);

  return (
    <div className="fixed top-4 right-4 text-gray-900 z-50">
      <button
        className="relative p-2 bg-white bg-opacity-90 rounded-full shadow hover:bg-opacity-100 transition"
        onClick={() => { setOpen(!open); setShowPedidos(false); }}
      >
        <CartIcon className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-2 w-80 bg-white bg-opacity-95 rounded-2xl shadow-lg p-4 max-h-[85vh] overflow-y-auto">
          {!showPedidos ? (
            <>
              <h2 className="font-semibold text-lg mb-3">Carrito</h2>
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-600">No hay platos agregados.</p>
              ) : (
                <ul className="space-y-3">
                  {cartItems.map((item, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-800">{item.nombre}</span>
                        <span className="text-sm font-medium text-gray-800">{item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-xs text-blue-500 hover:underline"
                          onClick={() => toggleDetails(idx)}
                        >
                          {detailsOpen[idx] ? 'Ocultar' : 'Detalles'}
                        </button>
                        <button
                          className="text-xs text-red-500 hover:underline"
                          onClick={() => removeFromCart(idx)}
                        >
                          Quitar
                        </button>
                      </div>
                      {detailsOpen[idx] && (
                        <div className="mt-1 text-xs text-gray-700 bg-gray-100 rounded p-2">
                          <p><span className="font-semibold">Ingredientes:</span> {item.ingredientes?.join(', ')}</p>
                          <p><span className="font-semibold">Alérgenos:</span> {item.alergenos?.join(', ')}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {cartItems.length > 0 && (
                <>
                  <div className="mt-4 flex justify-between font-semibold text-sm">
                    <span>Total:</span>
                    <span>{total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                  </div>
                  <button
                    className="mt-3 w-full px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition font-semibold"
                    onClick={handleCheckout}
                  >
                    Confirmar pedido
                  </button>
                </>
              )}
              <button
                className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition font-semibold"
                onClick={handleVerPedidos}
              >
                Ver mis pedidos
              </button>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg mb-3">Mis Pedidos</h2>
              {pedidos.length === 0 ? (
                <p className="text-sm text-gray-600">No hay pedidos aún.</p>
              ) : (
                <ul className="space-y-3">
                  {pedidos.map((pedido) => (
                    <li key={pedido._id} className="border-b pb-2 text-sm">
                      <p><strong>Estado:</strong> {pedido.estado}</p>
                      <p><strong>Total:</strong> {pedido.total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
<p><strong>Fecha:</strong> {pedido.createdAt ? new Date(pedido.createdAt).toLocaleString() : 'Sin fecha'}</p>
                      <p><strong>Items:</strong></p>
                      <ul className="list-disc ml-5">
                        {pedido.items.map((item, idx) => (
                          <li key={idx}>{item.nombre} - {item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="mt-3 w-full px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-400 transition font-semibold"
                onClick={() => setShowPedidos(false)}
              >
                Volver al carrito
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
