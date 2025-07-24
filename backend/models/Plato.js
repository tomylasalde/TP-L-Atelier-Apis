const mongoose = require('mongoose');

const platoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  alergenos: { type: [String], default: [] },
precio: { type: Number, required: true, min: [0, 'El precio no puede ser negativo'] },
  categoria: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  image: { type: String } 

}, { timestamps: true });

module.exports = mongoose.model('Plato', platoSchema);
