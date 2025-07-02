const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// POST /api/usuarios
router.post('/', usuariosController.crearUsuario);

// GET /api/usuarios
router.get('/', usuariosController.listarUsuarios);

// PUT /api/usuarios/:id
router.put('/:id', usuariosController.modificarUsuario);

// DELETE /api/usuarios/:id
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
