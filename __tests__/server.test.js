'use strict';

const server = require('../src/server.js');
const data = require('../src/models/index.js');
const supertest = require('supertest');


const request = supertest(server.app);

// the below code chunk was borrowed from Jacob Knaack from Code Fellows in order to create temporary tables and pass tests
beforeAll(async () => {
  await data.db.sync();
});
afterAll(async () => {
  await data.db.drop();
});


// === === tests below === === //

describe('testing the server', () => {

  // === === 404 on a bad route === === //
  test('testing 404 on a bad route', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });


  // === === 404 on a bad method === === //
  test('testing 404 on a bad method', async () => {
    const response = await request.put('/car');
    expect(response.status).toEqual(404);
  });


  // === === tests GET '/car' === === //
  test('testing a 200 for GET `/car`', async () => {
    const response = await request.get('/car');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  // === === tests GET '/food' === === //
  test('testing a 200 for GET `/food`', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });



  // === === tests POST for car === === //
  test('testing a 200 for POST `/car`', async () => {
    const response = await request.post('/car').send({
      name: 'test',
      year: 1991,
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  // === === tests POST for food=== === //
  test('testing a 200 for POST `/food`', async () => {
    const response = await request.post('/food').send({
      name: 'foodtest',
      poundsWorth: 3000000,
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('foodtest');
  });



  // === === tests GET '/car/:carId === === //
  test('testing a 200 for GET `/car/:carId`', async () => {
    const response = await request.get(`/car/1`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test')
  });

  // === === tests GET '/food/:foodId === === //
  test('testing a 200 for GET `/food/:foodId`', async () => {
    const response = await request.get(`/food/1`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('foodtest')
  });



  // === === tests PUT for car === === //
  test('testing a 200 for PUT `/car/:carId`', async () => {
    const response = await request.put(`/car/1`).send({
      name: 'testing again',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('testing again');
  });

  // === === tests PUT for food === === //
  test('testing a 200 for PUT `/food/:foodId`', async () => {
    const response = await request.put(`/food/1`).send({
      name: 'testing again',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('testing again');
  });



  // === === DESTROYS a record for car === === //
  test('testing a 200 for DELETE `/car/:carId`', async () => {
    const response = await request.delete(`/car/1`);

    expect(response.status).toEqual(204);
  });

  // === === DESTROYS a record for food === === //
  test('testing a 200 for DELETE `/food/:foodId`', async () => {
    const response = await request.delete(`/food/1`);

    expect(response.status).toEqual(204);
  });
});