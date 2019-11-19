const {
  dbQuery,
  expect,
} = require('../setup');

describe('DbQuery', () => {
  it('should be an object', (done) => {
    expect(dbQuery).to.be.a('object');
    done();
  });
});
