const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const loginRoutes = require('./routes/login');
const pizzaRoutes = require('./routes/pizzas');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const pizzaCategoryRoutes = require('./routes/pizza_category');
const orderRoutes = require('./routes/orders');
const orderItemRoutes = require('./routes/order_items');
const powerRoutes = require('./routes/powers');
const statsRouter = require("./routes/stats");

app.use('/powers', powerRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/orders', orderRoutes);
app.use('/pizza-category', pizzaCategoryRoutes);
app.use('/categories', categoryRoutes);
app.use('/pizzas', pizzaRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use("/stats", statsRouter);
app.use("/images", express.static("public/images"));


app.get('/', (req, res) => {
    res.send('Pizza API is running...');
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
