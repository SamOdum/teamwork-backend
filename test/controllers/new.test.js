process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('request');
// const faker = require('faker');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
// const server = require('../../server');
// const { create } = require('../../controllers/employees');
const employee = require('../fixtures/employee.json');


chai.use(chaiHttp);
chai.use(sinonChai);
const should = chai.should();


const base = 'http://localhost:5000';

describe('Employees', () => {
  describe('when not stubbed', () => {
    // test cases
  });

  describe('when stubbed', () => {
    beforeEach(() => {
      this.get = sinon.stub(request, 'get');
      this.post = sinon.stub(request, 'post');
    });

    afterEach(() => {
      request.get.restore();
      request.post.restore();
    });

    describe('POST /api/v1/create-user', () => {
      it('should return the new user that was added', (done) => {
        const options = {
          body: {
            message: 'User account successfully created',
            token: 12345,
            userId: 1,
          },
          json: true,
          url: `${base}/api/v1/create-user`,
        };
        const obj = employee.add.success;
        this.post.yields(null, obj.res, JSON.stringify(obj.body));
        request.post(options, (err, res, body) => {
          res.statusCode.should.equal(201);
          res.headers['content-type'].should.contain('application/json');
          //   body = JSON.parse(body);
          //   body.status.should.eql('success');
          //   body.data[0].should.include.keys(
          //     'message', 'token', 'userId',
          //   );
          //   body.data[0].token.should.eql(12345);
          done();
        });
      });
    });
  });
});
