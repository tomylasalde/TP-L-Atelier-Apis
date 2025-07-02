const express = require('express');
const router = express.Router();
const platosController = require('../controllers/platos.controller');

// POST /api/platos -> crear un plato
router.post('/', platosController.crearPlato);

// GET /api/platos -> listar platos
router.get('/', platosController.listarPlatos);

// PUT /api/platos/:id -> modificar plato
router.put('/:id', platosController.modificarPlato);

// DELETE /api/platos/:id -> eliminar plato
router.delete('/:id', platosController.eliminarPlato);

module.exports = router;
