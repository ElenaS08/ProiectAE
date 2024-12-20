const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const User = require('./database/models/User');
const Order = require('./database/models/Order');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const orderproductRoutes = require('./routes/orderproduct.routes');
const {verifyToken} = require('./utils');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello' })
})

app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // Adaugă URL-urile necesare
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite metodele necesare
    credentials: true, // Dacă ai nevoie de cookie-uri
}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderproductRoutes);
app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`)
})