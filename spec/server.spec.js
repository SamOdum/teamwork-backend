const request = require('request');
const { PORT } = require('../server');

describe('GET', () => {
  const endpoint = `http://localhost:${PORT}`;

  it('should return 200 response code', (done) => {
    request.get(endpoint, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
  it('should return matching response body', (done) => {
    request.get(endpoint, (error, response) => {
      expect(response.body).toEqual('{"info":"Server up and running smoothly"}');
      done();
    });
  });
});
