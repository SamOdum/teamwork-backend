// const request = require('request');
// const server = require('../server');

// const endpoint = 'http://localhost:5000/api/v1/auth/create-user';

// describe('POST', () => {
//   it('should return 201 response code', done => {
//     request.post(endpoint, (error, response) => {
//       expect(response.statusCode).toEqual(201);
//       done();
//     });
//   });

//   it('should fail on GET', done => {
//     request.get(endpoint, { json: true, body: {} }, (error, response) => {
//       expect(response.statusCode).toEqual(404);
//       done();
//     });
//   });
// });
