const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.post('/', usuariosController.crearUsuario);

router.get('/', usuariosController.listarUsuarios);

router.put('/:id', usuariosController.modificarUsuario);

router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
