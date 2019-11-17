const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../server');

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3MzkxMjc4OCwiZXhwIjoxNTc0MjU4Mzg4fQ.8YyR_ys9DY-1_EPisSv9SecX_elvZI97vPSs_aV1zhs';
const hjson = 'application/json';

describe('Employees', () => {
  it('should be possible for admin to create accounts', (done) => {
    chai.request(server)
      .put('/api/v1/auth/sign-in')
      .set('x-auth-token', token)
      .set('Content-Type', hjson)
      .send({
        firstName: 'Penelope',
        lastName: 'Okoro',
        email: 'p.okoro@team.com',
        password: 'Liepzig',
        gender: 'female',
        jobRole: 'operations manager',
        department: 'Operations',
        address: '22 Righthere Street, Calabar',
        role: 'basic',
      })
      .then((res) => {
        expect(res).to.have.status(201);
      })
      .catch((err) => {
        throw err;
      });
    done();
  });
});
