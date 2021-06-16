'use strict';

const server = require('../src/server.js');
const data = require('../src/models/index.js');
const supertest = require('supertest');
const { describe } = require('yargs');
const { expect } = require('@jest/globals');

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
  test('404 on a bad route', async () => {
    const response = await mockRequest.get('/badroute');
    expect(response.status).toEqual(404);
  });

  // === === 404 on a bad method === === //
  test('404 on a bad method', async () => {
    const response = await mockRequest.post('/car');
    expect(response.status).toEqual(404);
  });


  // === === tests POST === === //
  test('testing a 200 for POST `/car`', async () => {
    const response = await (await request.post('/car')).send({
      name: 'test',
      year: 1991,
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  // === === tests GET '/car' === === //


  // === === tests GET '/car/:carId === === //


  // === === tests PUT === === //


  // === === DESTROYS a record === === //

});