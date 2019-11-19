const {
  // BASE_URL,
  chai,
  chaiHttp,
  // nock,
  server,
  // sinon,
  tokenAuth,
  hjson,
  assert,
  expect,
} = require('../setup');
const Feed = require('../../controllers/feed');

chai.use(chaiHttp);

describe('Feed', () => {
  describe('Feeds,layout', () => {
    it('returns an object', (done) => {
      assert.isFunction(Feed.layout);
      done();
    });
  });

  describe('GET /feed', () => {
    it('should return a feed if valid token is in header', (done) => {
      chai.request(server)
        .get('/api/v1/feed')
        .set('x-auth-token', tokenAuth)
        .set('Content-Type', hjson)
        .then((res) => {
          expect(res).to.have.status(200);
          assert.property(res, 'status');
          assert.property(res, 'body');
          assert.exists(res.body.status);
          assert.exists(res.body.data);
          assert.isArray(res.body.data);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  // describe('GET /feed', () => {
  //   it('should return satus 404 if no rows found', (done) => {
  //     const scope = nock(BASE_URL, {
  //       // reqheaders: {
  //       //   'x-auth-token': token,
  //       //   'Content-Type': hjson,
  //       // },
  //     })
  //       .get('/api/v1/feed')
  //       .reply(300);

  //     chai.request(server)
  //       .get('/api/v1/feed')
  //       .set('x-auth-token', token)
  //       .set('Content-Type', hjson)
  //       .then((res) => {
  //         expect(res).to.have.status(404);
  //       });
  //     done();
  //   });
  // });

  describe('GET /feed', () => {
    it('should return satus 400 if invalid token is in header', (done) => {
      chai.request(server)
        .get('/api/v1/feed')
        .set('x-auth-token', 'inalidToken')
        .set('Content-Type', hjson)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  // it('should return data', async () => {
  //   nock(BASE_URL, {
  //     'x-auth-token': token,
  //     'Content-Type': hjson,
  //   })
  //     .get('/path//api/v1/feed')
  //     .reply(300, { data: 'some data' });

  //   const result = await chai.request(server).get('/api/v1/feed');
  //   expect(result.status).to.equal(200);
  //   expect(result.body).to.deep.equal({ data: 'some data' });
  // });
});
