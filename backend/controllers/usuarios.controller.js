const Usuario = require('../models/Usuario');

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
    const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
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
