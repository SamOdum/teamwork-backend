const { expect } = require('chai');
const { Auth } = require('../middleware/Auth');

describe('Auth', () => {
  it('should return an object', (done) => {
    expect(Auth).to.be.a('object');
    done();
  });

  it('should no throw an error', (done) => {
    expect(Auth).to.not.be.a('function');
    done();
  });

  it('verifyToken should fail', (done) => {
    const req = {};
    const res = null;
    const result = Auth.verifyToken(req, res);
    expect(result).to.not.have.property('headers');
    done();
  });
});
