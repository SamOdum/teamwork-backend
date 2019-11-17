const { expect } = require('chai');
const dbQuery = require('../config/dbQuery');

describe('DbQuery', () => {
  it('should be an object', (done) => {
    expect(dbQuery).to.be.a('object');
    done();
  });
});
