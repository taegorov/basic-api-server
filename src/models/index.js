'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const { Sequelize, DataTypes } = require('sequelize');

const carModel = require('./car.js');
const foodModel = require('./food.js');
const todoSchema = require('./todo.schema.js');
const userSchema = require('./user.schema.js');


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
const food = foodModel(sequelize, DataTypes);
const todo = todoSchema(sequelize, DataTypes);
const user = userSchema(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  car: car,
  food: food,
  todo: todo,
  user: user,
}
