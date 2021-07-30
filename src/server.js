'use strict';

const express = require('express');
const cors = require('cors');

const authRoutes = require('./auth/routes')
const carRoutes = require('./routes/car.js');
const foodRoutes = require('./routes/food.js');
const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(carRoutes);
app.use(foodRoutes);
app.use(todoRoutes);
app.use(userRoutes);

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`🚦 app is up and running on ${PORT} 🚦`));
  }
}
