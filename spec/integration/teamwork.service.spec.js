const frisby = require('frisby');
const { PORT } = require('../../server');

const BASE_URL = `http://localhost:${PORT}`;

describe('Teamwork REST API', () => {
//   const ENV = require('../support/env.json');
//   const BASE_URL = ENV.integration.teamworkServiceBaseUrl;

  describe('POST /api/v1/auth/create-user', () => {
    it('should return the summary for the created user', (done) => {
      frisby
        .post(`${BASE_URL} /api/v1/auth/create-user`)
        .then((response) => {
          expect(response.status).toBe(201);
          // //           expect(response.json.items).toContain('message');
          // //           expect(response.json.items).toContain('token');
          // //           expect(response.json.items).toContain('userid');
        })
        .done(done);
    });
  });
});
