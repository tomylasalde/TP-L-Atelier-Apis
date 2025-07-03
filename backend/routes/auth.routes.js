const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, isDeleted: false });
    if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado.' });

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta.' });

    const payload = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, usuario: payload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
