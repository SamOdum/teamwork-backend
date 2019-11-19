const {
  chai,
  chaiHttp,
  server,
  expect,
} = require('../setup');

chai.use(chaiHttp);

describe('Base Route ', () => {
  it('should display a welcome message', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        if (error) throw Error({ statue: 'error', error: { message: 'request to "/" could not go through' } });
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Welcome to Teamwork API.');
        done();
      });
  });

  it('should return 404 for non-existent route', (done) => {
    chai.request(server).get('/none-existent-route').end((error, response) => {
      expect(response).to.have.status(404);
      done();
    });
  });
});
