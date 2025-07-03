const Plato = require('../models/Plato');

// Crear plato
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
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


// Listar platos (con filtro de isDeleted false)
exports.listarPlatos = async (req, res) => {
  try {
    const platos = await Plato.find({ isDeleted: false });
    res.json(platos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar plato
exports.modificarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await Plato.findByIdAndUpdate(id, req.body, { new: true });
    res.json(plato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar plato (soft delete)
exports.eliminarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    await Plato.findByIdAndUpdate(id, { isDeleted: true });
    res.json({ message: 'Plato eliminado correctamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
