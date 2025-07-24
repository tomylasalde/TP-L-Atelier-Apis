const express = require('express');
const router = express.Router();
const Auditoria = require('../models/Auditoria');
const verifyToken = require('../middlewares/verifyToken'); 

/**
 * @swagger
 * tags:
 *   name: Auditorías
 *   description: Registro de acciones realizadas por usuarios
 */

/**
 * @swagger
 * /auditorias:
 *   get:
 *     summary: Obtiene el listado de auditorías
 *     tags: [Auditorías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de auditorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   accion:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   usuarioId:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       email:
 *                         type: string
 *                       rol:
 *                         type: string
 *       500:
 *         description: Error al listar auditorías
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const auditorias = await Auditoria
      .find()
      .populate('usuarioId', 'nombre email rol') 
      .sort({ fecha: -1 }); 

    res.json(auditorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar auditorías.' });
  }
});

module.exports = router;
