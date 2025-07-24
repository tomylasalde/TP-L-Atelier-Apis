const Usuario = require('../models/Usuario');
const Auditoria = require('../models/Auditoria');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (req, res) => {
  try {
    let { nombre, email, password, rol } = req.body;
    if (!rol) rol = 'usuario';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = new Usuario({ nombre, email, password: hashedPassword, rol });
    await usuario.save();

    const userId = req.user?.id;
    const evento = new Auditoria({
      entidad: 'Usuario',
      entidadId: usuario._id,
      accion: 'create',
      usuarioId: userId || null,
      detalle: `Se creó el usuario "${usuario.nombre}".`
    });
    await evento.save();

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
    const userId = req.user?.id;

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

    const evento = new Auditoria({
      entidad: 'Usuario',
      entidadId: id,
      accion: 'update',
      usuarioId: userId || null,
      detalle: `Se modificó el usuario "${usuarioActualizado.nombre}".`
    });
    await evento.save();

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al modificar usuario:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const usuario = await Usuario.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const evento = new Auditoria({
      entidad: 'Usuario',
      entidadId: id,
      accion: 'delete',
      usuarioId: userId || null,
      detalle: `Se eliminó de forma lógica el usuario "${usuario.nombre}".`
    });
    await evento.save();

    res.json({ message: 'Usuario eliminado correctamente y auditoría registrada.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
