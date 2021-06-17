'use strict'

const carModel = (sequelize, DataTypes) => {
  return sequelize.define('Car', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    year: {
      type: DataTypes.INTEGER,
      required: false,
    }
  });
}

module.exports = carModel;