const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  items: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  cliente: {
    nombre: { type: String },
    email: { type: String }
  },
  estado: { type: String, default: 'pendiente' }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
