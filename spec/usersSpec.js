const request = require('request');
const server = require('../server');

const endpoint = 'http://localhost:3000/auth/create-user';

describe('people', () => {
  it('should return 200 response code', done => {
    request.get(endpoint, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('should fail on POST', done => {
    request.post(endpoint, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  });
});
