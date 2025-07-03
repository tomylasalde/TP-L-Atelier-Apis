const express = require('express');
const router = express.Router();
const platosController = require('../controllers/platos.controller');
const multer = require('multer');
const path = require('path');

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

router.post('/', upload.single('image'), platosController.crearPlato);

router.get('/', platosController.listarPlatos);

router.put('/:id', upload.single('image'), platosController.modificarPlato);

router.delete('/:id', platosController.eliminarPlato);

module.exports = router;
