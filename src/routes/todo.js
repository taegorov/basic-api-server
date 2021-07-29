'use strict';

const express = require('express');

const data = require('../models/index.js');
const router = express.Router();


// === === routers === === //
router.post('/todo', create);
router.get('/todo', getAll);
router.get('/todo/:id', getOne);
router.put('/todo/:id', update);
router.delete('/todo/:id', remove);


// === === router functions === === //
async function create(request, response) {
  const todoObject = request.body;
  const todoData = await data.todo.create(todoObject);

  response.status(200).send(todoData);
}

async function getAll(request, response) {
  const allTodo = await data.todo.findAll();

  response.status(200).send(allTodo)
}

async function getOne(request, response) {
  const todoId = request.params.todoId;
  const singleTodo = await data.todo.findOne({
    where: {
      id: todoId,
    }
  });

  response.status(200).send(singleTodo);
}

async function update(request, response) {
  const todoId = request.params.todoId;
  const todoObject = request.body;
  const todoData = await data.todo.findOne({ where: { id: todoId } });
  await todoData.update(todoObject);

  response.status(200).send(todoData);
}

async function remove(request, response) {
  const todoId = request.params.todoId;
  await data.todo.destroy({ where: { id: todoId } });

  response.status(204).send('success!');
}

module.exports = router;
