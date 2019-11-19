const {
  server,
  PORT,
  expect,
} = require('../setup');

describe('server', () => {
  it('should be an object', (done) => {
    expect(server).to.be.an('object');
    done();
  });
});

describe('PORT', () => {
  it('should be an object', (done) => {
    expect(PORT).to.be.a('number');
    done();
  });
});
