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


  // === === tests POST === === //
  test('testing a 200 for POST `/car`', async () => {
    const response = await request.post('/car').send({
      name: 'test',
      year: 1991,
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });


  // === === tests GET '/car' === === //
  test('testing a 200 for GET `/car`', async () => {
    const response = await request.get('/car');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(['test', 1991]);
  });


  // === === tests GET '/car/:carId === === //
  test('testing a 200 for GET `/car/:carId`', async () => {
    const response = await request.get(`/car/1`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test')
  });


  // === === tests PUT === === //
  test('testing a 200 for PUT `/car/:carId`', async () => {
    const response = await request.put(`/car/1`).send({
      name: 'testing again',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('testing again');
  });


  // === === DESTROYS a record === === //
  test('testing a 200 for DELETE `/car/:carId`', async () => {
    const response = await request.delete(`/car/1`);

    expect(response.status).toEqual(204);
  });
});