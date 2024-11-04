const express = require('express');
const app = express();
const connectDB = require('./backend/db');
const authRoutes = require('./backend/routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();

connectDB();

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Conectar a MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Definir rutas (Ejemplo de rutas de usuarios, menús y órdenes)
const userRoutes = require('./backend/routes/userRoutes');
app.use('/users', userRoutes);

const menuRoutes = require('./backend/routes/menuRoutes');
app.use('/menus', menuRoutes);

const orderRoutes = require('./backend/routes/orderRoutes');
app.use('/orders', orderRoutes);

const adminRoutes = require('./backend/routes/adminRoutes');
app.use('/admin', adminRoutes);

// Datos de ejemplo
let users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', active: true },
  { id: 2, username: 'user', password: 'user123', role: 'user', active: true },
];

let menus = [
  { id: 1, name: 'Fried chicken', price: 4.60, discount: 13 },
  { id: 2, name: 'Squid', price: 5.70, discount: 22 },
];

let orders = [
  { id: 1, user: 'user1', items: ['Fried chicken'], status: 'Pending' },
  { id: 2, user: 'user2', items: ['Squid'], status: 'Pending' },
];

// Endpoint de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { username, password, role } = req.body;
  const newUser = { id: users.length + 1, username, password, role, active: true };
  users.push(newUser);
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id == id);
  if (user) {
    user.active = !user.active;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Menús
app.get('/menus', (req, res) => {
  res.json(menus);
});

app.post('/menus', (req, res) => {
  const { name, price, discount } = req.body;
  const newMenu = { id: menus.length + 1, name, price, discount };
  menus.push(newMenu);
  res.json(newMenu);
});

app.put('/menus/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, discount } = req.body;
  const menu = menus.find(m => m.id == id);
  if (menu) {
    menu.name = name;
    menu.price = price;
    menu.discount = discount;
    res.json(menu);
  } else {
    res.status(404).json({ message: 'Menu not found' });
  }
});

app.delete('/menus/:id', (req, res) => {
  const { id } = req.params;
  const index = menus.findIndex(m => m.id == id);
  if (index !== -1) {
    menus.splice(index, 1);
    res.json({ message: 'Menu deleted' });
  } else {
    res.status(404).json({ message: 'Menu not found' });
  }
});

// Pedidos
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id == id);
  if (order) {
    order.status = 'Completed';
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





