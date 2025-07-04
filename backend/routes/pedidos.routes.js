const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

router.post('/', pedidosController.crearPedido);

router.get('/', pedidosController.listarPedidos);

router.put('/:id', pedidosController.cambiarEstadoPedido);

module.exports = router;
