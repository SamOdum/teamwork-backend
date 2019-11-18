const { expect } = require('chai');
const multer = require('../middleware/Multer');

describe('multer', () => {
  it('should return an object', (done) => {
    expect(multer).to.be.a('object');
    done();
  });

  it('should not throw an error', (done) => {
    expect(multer).to.not.be.a('function');
    done();
  });
});
