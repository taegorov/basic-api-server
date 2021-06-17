'use strict';

const express = require('express');

const data = require('../models/index.js');
const router = express.Router();


// === === routers === === //
router.post('/food', create);
router.get('/food', getAll);
router.get('/food/:foodId', getOne);
router.put('/food/:foodId', update);
router.delete('/food/:foodId', remove);


// === === router functions === === //
async function create(request, response) {
  const foodObject = request.body;
  const foodData = await data.food.create(foodObject);

  response.status(200).send(foodData);
}

async function getAll(request, response) {
  const allFood = await data.food.findAll();

  response.status(200).send(allFood)
}

async function getOne(request, response) {
  const foodId = request.params.foodId;
  const singleFood = await data.food.findOne({
    where: {
      id: foodId,
    }
  });

  response.status(200).send(singleFood);
}

async function update(request, response) {
  const foodId = request.params.foodId;
  const foodObject = request.body;
  const foodData = await data.food.findOne({ where: { id: foodId } });
  await foodData.update(foodObject);

  response.status(200).send(foodData);
}

async function remove(request, response) {
  const foodId = request.params.foodId;
  await data.food.destroy({ where: { id: foodId } });

  response.status(204).send('success!');
}

module.exports = router;
