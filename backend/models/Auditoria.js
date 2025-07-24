const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
  entidad: { type: String, required: true }, 
  entidadId: { type: mongoose.Schema.Types.ObjectId, required: true },
  accion: { type: String, required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now },
  detalle: { type: String } 
});

module.exports = mongoose.model('Auditoria', auditoriaSchema);
