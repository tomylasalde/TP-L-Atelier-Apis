const express = require('express');
const router = express.Router();
const platosController = require('../controllers/platos.controller');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST /api/platos -> crear un plato (con imagen)
router.post('/', upload.single('image'), platosController.crearPlato);

// GET /api/platos -> listar platos
router.get('/', platosController.listarPlatos);

// PUT /api/platos/:id -> modificar plato
router.put('/:id', platosController.modificarPlato);

// DELETE /api/platos/:id -> eliminar plato
router.delete('/:id', platosController.eliminarPlato);

module.exports = router;
