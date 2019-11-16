const request = require('request');
const { server } = require('../server');


module.exports = (testName, testSuite) => {
  describe(('Server'), () => {
    // let server;
    const baseUrl = 'http://127.0.0.1:3000';

    beforeAll(() => server);

    afterAll(() => {
      server.close();
    });

    // Your test code goes here
    describe(testName, () => testSuite(request, baseUrl));
  });
};
