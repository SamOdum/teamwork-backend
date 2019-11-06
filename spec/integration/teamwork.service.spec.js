const frisby = require('frisby');
const { PORT } = require('../../server');

const BASE_URL = `http://localhost:${PORT}`;

describe('Teamwork REST API', () => {
//   const ENV = require('../support/env.json');
//   const BASE_URL = ENV.integration.teamworkServiceBaseUrl;

  describe('GET /', () => {
    it('should return a string', (done) => {
      frisby
        .get(`${BASE_URL}`)
        .then((response) => {
          expect(response.status).toBe(200);
          // //           expect(response.json.items).toContain('message');
          // //           expect(response.json.items).toContain('token');
          // //           expect(response.json.items).toContain('userid');
        })
        .done(done);
    });
  });
});
