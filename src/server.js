'use strict';

const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/car.js');
const foodRoutes = require('./routes/food.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(carRoutes);
app.use(foodRoutes);

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log('app is up and running'));
  }
}