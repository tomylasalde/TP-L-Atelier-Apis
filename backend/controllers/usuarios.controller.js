const Usuario = require('../models/Usuario');

// Crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    let { nombre, email, password, rol } = req.body;
    if (!rol) rol = 'usuario';

    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error); // 👈 PARA VER EL ERROR REAL
    res.status(400).json({ message: error.message });
  }
};


// Listar usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ isDeleted: false });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar usuario
exports.modificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar usuario (soft delete)
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id, { isDeleted: true });
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
