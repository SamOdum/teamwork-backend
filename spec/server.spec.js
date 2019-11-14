const frisby = require('frisby');

const { PORT } = require('../server');

const BASE_URL = `http://localhost:${PORT}`;

describe('GET /, the base route of the server', () => {
  it('should return 200, and a json object', () => {
    frisby
      .get(BASE_URL)
      .expect('status', 200)
      .expect('json', 'status', 'success');
  });
});

// const request = require('request');
// const { PORT } = require('../server');

// describe('GET', () => {
//   const endpoint = `http://localhost:${PORT}`;

//   it('should return 200 response code', (done) => {
//     request.get(endpoint, (error, response) => {
//       expect(response.statusCode).toEqual(200);
//       done();
//     });
//   });
//   it('should return matching response body', (done) => {
//     request.get(endpoint, (error, response) => {
//       expect(response.body).toEqual('{"info":"Server up and running smoothly"}');
//       done();
//     });
//   });
// });
