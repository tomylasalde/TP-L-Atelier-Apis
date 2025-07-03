const Plato = require('../models/Plato');

exports.crearPlato = async (req, res) => {
  try {
    const { nombre, descripcion, ingredientes, alergenos, precio, categoria } = req.body;
    const image = req.file ? req.file.filename : null;

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
    const { id } = req.params;
    const { nombre, descripcion, ingredientes, alergenos, precio, categoria } = req.body;

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
    if (precio) updatedFields.precio = Number(precio);
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

    res.json(platoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.eliminarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    await Plato.findByIdAndUpdate(id, { isDeleted: true });
    res.json({ message: 'Plato eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar plato:', error);
    res.status(400).json({ message: error.message });
  }
};

