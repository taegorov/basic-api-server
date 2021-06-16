'use strict';

const express = require('express');

const data = require('..models/index.js');
const router = express.Router();


// === === routers === === //
router.post('/car', create);
router.get('/car', getAll);
router.get('/car/:carId', getOne);
router.put('/car/:carId', update);
router.delete('/car/:carId', remove);


// === === router functions === === //
async function create(request, response) {
  const carObject = request.body;
  const carData = await data.car.create(carObject);

  response.status(200).send(carData);
}

async function getAll(request, response) {
  const allCars = await data.car.findAll();

  response.status(200).send(allCars)
}

async function getOne(request, response) {
  const carId = request.params.carId;
  const singleCar = await data.car.findOne({
    where: {
      id: carId,
    }
  });

  response.status(200).send(singleCar);
}

async function update(request, response) {
  const carId = request.params.carId;
  const carObject = request.body;
  const carData = await data.car.findOne({ where: { id: carId } });
  await carData.update(carObject);

  response.status(200).send(carData);
}

async function remove(request, response) {
  const carId = request.params.carId;
  await data.car.destroy({ where: { id: carId } });

  response.status(204).send('success!');
}

module.exports = router;
