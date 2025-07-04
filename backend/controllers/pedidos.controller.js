const Pedido = require('../models/Pedido');

exports.crearPedido = async (req, res) => {
  try {
    const { items, total, cliente } = req.body;
    const nuevoPedido = new Pedido({ items, total, cliente });
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cambiarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
