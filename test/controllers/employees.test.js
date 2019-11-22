// const db = require('../config/dbQuery');
const {
  chai,
  chaiHttp,
  // faker,
  // fs,
  server,
  // PORT,
  tokenAuth,
  tokenUnAuth,
  hjson,
  expect,
  // path,
  // sinonChai,
  // BASE_URL,
} = require('../setup');


chai.use(chaiHttp);
// chai.use(sinonChai);

describe('Employee test suit', () => {
  describe('Creating a new user', () => {
    it('it should reject a none logged-in user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Content-Type', hjson)
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res).to.be.an('object');
          expect(res).to.have.property('status');
          expect(res).to.have.property('error');
          done();
        });
    });

    it('it should reject a non-admin', (done) => {
      chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('x-auth-token', tokenUnAuth)
        .set('Content-Type', hjson)
        .then((res) => {
          expect(res.status).to.equal(401);
          expect(res).to.be.an('object');
          expect(res).to.have.property('status');
          expect(res).to.have.property('error');
          done();
        });
    });

    // it('it should reject incomplete registration details', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/create-user')
    //     .set('x-auth-token', tokenAuth)
    //     .set('Content-Type', hjson)
    //     .type('form')
    //     .field({
    //       firstname: faker.name.firstName(),
    //       lastname: faker.name.lastName(),
    //       email: faker.internet.email(),
    //       password: faker.internet.password(),
    //       jobrole: faker.name.jobTitle,
    //       department: faker.name.jobType,
    //       address: faker.address.streetAddress(),
    //       role: 'basic',
    //     })
    //     .then((res) => {
    //       expect(res.status).to.equal(400);
    //       expect(res).to.be.an('object');
    //       expect(res).to.have.property('status');
    //       expect(res).to.have.property('error');
    //       done();
    //     });
    // });

    // it('it should accept complete registration details', (done) => {
    //   const produceOne = (x, y) => {
    //     const pick = Math.floor(Math.random() * 5);
    //     return pick >= 3 ? x : y;
    //   const fileDir = './test/controllers/lucas-lenzi-unsplash.jpg'
    //   };
    //   chai.request(server)
    //     .post('/api/v1/auth/create-user')
    //     .set('x-auth-token', tokenAuth)
    //     .set('Content-Type', hjson)
    //     .type('form')
    //     .attach('image', fs.readFileSync(path.resolve(fileDir)), 'lucas-lenzi-unsplash.jpg')
    //     .field({
    //       firstName: faker.name.firstName(),
    //       lastName: faker.name.lastName(),
    //       email: faker.internet.email(),
    //       password: faker.internet.password(),
    //       gender: produceOne('male', 'female'),
    //       jobRole: faker.name.jobTitle(),
    //       department: faker.name.jobType(),
    //       address: faker.address.streetAddress(),
    //       role: 'basic',
    //       // url: faker.internet.avatar(),
    //       // publicid: faker.internet.avatar(),
    //     })
    //     .then((res) => {
    //       expect(res.status).to.equal(201);
    //       expect(res).to.be.an('object');
    //       expect(res).to.have.property('status');
    //       expect(res.body).to.have.property('data');
    //       done();
    //     });
    // });
  });

  describe('Deleting a user', () => {
    it('it should reject a none logged-in user', (done) => {
      chai.request(server)
        .delete('/api/v1/auth/delete-user')
        .set('Content-Type', hjson)
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res).to.be.an('object');
          expect(res).to.have.property('status');
          expect(res).to.have.property('error');
          done();
        });
    });

    it('it should reject a non-admin', (done) => {
      chai.request(server)
        .delete('/api/v1/auth/delete-user')
        .set('x-auth-token', tokenUnAuth)
        .set('Content-Type', hjson)
        .then((res) => {
          expect(res.status).to.equal(401);
          expect(res).to.be.an('object');
          expect(res).to.have.property('status');
          expect(res).to.have.property('error');
          done();
        });
    });

    it('it should reject deletion if user not found', (done) => {
      chai.request(server)
        .delete('/api/v1/auth/delete-user')
        .set('x-auth-token', tokenAuth)
        .set('Content-Type', hjson)
        .send({
          userId: 1199984, // <=**SET RIDICULOUSLY HIGH NUMBE
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res).to.be.an('object');
          expect(res).to.have.property('status');
          expect(res).to.have.property('error');
          done();
        });
    });

    // it('it should delete existing employee record', (done) => {
    //   chai.request(server)
    //     .delete('/api/v1/auth/delete-user')
    //     .set('x-auth-token', tokenAuth)
    //     .set('Content-Type', hjson)
    //     .send({
    //       userId: 1, // <=** MAKE SURE IT'S VALID NUMBER
    //     })
    //     .then((res) => {
    //       expect(res.status).to.equal(202);
    //       expect(res).to.be.an('object');
    //       expect(res).to.have.property('status');
    //       done();
    //     });
    // });
  });
});
