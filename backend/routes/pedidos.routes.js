const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestión de pedidos realizados por los clientes
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - platos
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: ID del usuario que realiza el pedido
 *               platos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     platoId:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 */
router.post('/', pedidosController.crearPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', pedidosController.listarPedidos);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Cambia el estado de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 example: "entregado"
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado correctamente
 */
router.put('/:id', pedidosController.cambiarEstadoPedido);

module.exports = router;
