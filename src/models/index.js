'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const { Sequelize, DataTypes } = require('sequelize');
const carModel = require('./car.js');


// // tests might not pass with this commented out. Either have this uncommented out, or new Sequelize(DATABASE_URL) below
// let sequelize = new Sequelize(DATABASE_URL);


// Heroku needs this to run Sequelize
let sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

const car = carModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  car: car,
}