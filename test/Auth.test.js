const { expect } = require('chai');
const { Auth, Helper } = require('../middleware/Auth');

describe('Auth', () => {
  it('should return an object', (done) => {
    expect(Auth).to.be.a('object');
    done();
  });

  it('should no throw an error', (done) => {
    expect(Auth).to.not.be.a('function');
    done();
  });
  describe('Auth.verfyToken', () => {
    it('should fail to grab token', (done) => {
      const req = {};
      const res = null;
      const result = Auth.verifyToken(req, res);
      expect(result).to.not.have.property('headers');
      done();
    });
  });
});

describe('Helper', () => {
  describe('Helper.comparePassword', () => {
    it('should actually hash passwords', () => {
      const legitPassword = Helper.hashPassword('legitimate');
      expect(legitPassword).to.include('$', '.');
    });
  });

  describe('Helper.comparePassword', () => {
    it('should not validate different passwords', () => {
      const legitPassword = Helper.hashPassword('legitimate');
      const differentPassword = 'different';
      const processed = Helper.comparePassword(legitPassword, differentPassword);
      expect(processed).to.be.not.equal(legitPassword);
    });
  });

  describe('Helper.isValidEmail', () => {
    it('validates a genuine email', () => {
      const validEmail = Helper.isValidEmail('jdoe@abc.com');
      expect(validEmail).to.equal(true);
    });
  });
  describe('Helper.isValidEmail', () => {
    it('flags an invalid email', () => {
      const validEmail = Helper.isValidEmail('jdoe.com');
      expect(validEmail).to.not.equal(true);
    });
  });
});
