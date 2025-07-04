require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const platosRoutes = require('./routes/platos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const authRoutes = require('./routes/auth.routes');
const pedidosRoutes = require('./routes/pedidos.routes');


const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/platos', platosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidosRoutes);


app.get('/', (req, res) => {
  res.send('Servidor Express corriendo y MongoDB conectado correctamente.');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB!!!!');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
