const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (req, res) => {
  try {
    let { nombre, email, password, rol } = req.body;
    if (!rol) rol = 'usuario';

    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ isDeleted: false });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.modificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (updateFields.password && updateFields.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateFields.password, salt);
      updateFields.password = hashedPassword;
    } else {
      delete updateFields.password;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, updateFields, { new: true });

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al modificar usuario:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id, { isDeleted: true });
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
