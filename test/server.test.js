const { expect } = require('chai');
const { server, PORT } = require('../server');

describe('server', () => {
  it('should be an object', (done) => {
    expect(server).to.be.a('object');
    done();
  });
});

describe('PORT', () => {
  it('should be an object', (done) => {
    expect(PORT).to.be.a('number');
    done();
  });
});
