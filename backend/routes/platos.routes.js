const express = require('express');
const router = express.Router();
const platosController = require('../controllers/platos.controller');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middlewares/verifyToken');

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

/**
 * @swagger
 * /platos:
 *   post:
 *     summary: Crea un nuevo plato
 *     tags: [Platos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               ingredientes:
 *                 type: string
 *                 example: "pollo, arroz"
 *               alergenos:
 *                 type: string
 *                 example: "gluten, lactosa"
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Plato creado correctamente
 */
router.post('/', verifyToken, upload.single('image'), platosController.crearPlato);

/**
 * @swagger
 * /platos:
 *   get:
 *     summary: Lista todos los platos disponibles (no eliminados)
 *     tags: [Platos]
 *     responses:
 *       200:
 *         description: Lista de platos
 */
router.get('/', platosController.listarPlatos);

/**
 * @swagger
 * /platos/{id}:
 *   put:
 *     summary: Modifica un plato existente
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del plato
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               ingredientes:
 *                 type: string
 *               alergenos:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Plato modificado correctamente
 */
router.put('/:id', verifyToken, upload.single('image'), platosController.modificarPlato);

/**
 * @swagger
 * /platos/{id}:
 *   delete:
 *     summary: Elimina un plato (eliminación lógica)
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del plato a eliminar
 *     responses:
 *       200:
 *         description: Plato eliminado correctamente
 */
router.delete('/:id', verifyToken, platosController.eliminarPlato);

module.exports = router;
