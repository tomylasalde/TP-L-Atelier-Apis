const Plato = require('../models/Plato');
const Auditoria = require('../models/Auditoria');

exports.crearPlato = async (req, res) => {
  try {
    console.log('REQ.USER:', req.user);

    const { nombre, descripcion, ingredientes, alergenos, precio, categoria } = req.body;
    const image = req.file ? req.file.filename : null;
    const userId = req.user?.id;

    if (Number(precio) < 0) {
      return res.status(400).json({ message: 'El precio no puede ser negativo.' });
    }

    const nuevoPlato = new Plato({
      nombre,
      descripcion,
      ingredientes: ingredientes.split(',').map(i => i.trim()),
      alergenos: alergenos.split(',').map(a => a.trim()),
      precio: Number(precio),
      categoria,
      image: image ? `http://localhost:4000/uploads/${image}` : null
    });

    await nuevoPlato.save();

    const evento = new Auditoria({
      entidad: 'Plato',
      entidadId: nuevoPlato._id,
      accion: 'create',
      usuarioId: userId || null,
      detalle: `Se creó el plato "${nuevoPlato.nombre}".`
    });
    await evento.save();

    res.status(201).json(nuevoPlato);
  } catch (error) {
    console.error('Error al crear plato:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.listarPlatos = async (req, res) => {
  try {
    const platos = await Plato.find({ isDeleted: false });
    res.json(platos);
  } catch (error) {
    console.error('Error al listar platos:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.modificarPlato = async (req, res) => {
  try {
    console.log('REQ.USER:', req.user);

    const { id } = req.params;
    const { nombre, descripcion, ingredientes, alergenos, precio, categoria } = req.body;
    const userId = req.user?.id;

    const updatedFields = {};
    if (nombre) updatedFields.nombre = nombre;
    if (descripcion) updatedFields.descripcion = descripcion;
    if (ingredientes !== undefined) {
      updatedFields.ingredientes = ingredientes.trim() !== ""
        ? ingredientes.split(',').map(i => i.trim())
        : undefined;
    }
    if (alergenos !== undefined) {
      updatedFields.alergenos = alergenos.trim() !== ""
        ? alergenos.split(',').map(a => a.trim())
        : undefined;
    }
    if (precio !== undefined) {
      const parsedPrice = Number(precio);
      if (parsedPrice < 0) {
        return res.status(400).json({ message: 'El precio no puede ser negativo.' });
      }
      updatedFields.precio = parsedPrice;
    }
    if (categoria) updatedFields.categoria = categoria;
    if (req.file) {
      updatedFields.image = `http://localhost:4000/uploads/${req.file.filename}`;
    }
    Object.keys(updatedFields).forEach(
      key => updatedFields[key] === undefined && delete updatedFields[key]
    );

    const platoActualizado = await Plato.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!platoActualizado) {
      return res.status(404).json({ message: 'Plato no encontrado.' });
    }

    const evento = new Auditoria({
      entidad: 'Plato',
      entidadId: id,
      accion: 'update',
      usuarioId: userId || null,
      detalle: `Se modificó el plato "${platoActualizado.nombre}".`
    });
    await evento.save();

    res.json(platoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarPlato = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?.id;

    const plato = await Plato.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!plato) {
      return res.status(404).json({ message: 'Plato no encontrado.' });
    }

    const evento = new Auditoria({
      entidad: 'Plato',
      entidadId: id,
      accion: 'delete',
      usuarioId: userId || null,
      detalle: `Se eliminó de forma lógica el plato "${plato.nombre}".`
    });
    await evento.save();

    res.json({ message: 'Plato eliminado correctamente y auditoría registrada.' });
  } catch (error) {
    console.error('Error al eliminar plato:', error);
    res.status(400).json({ message: error.message });
  }
};
