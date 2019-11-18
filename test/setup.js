
const nock = require('nock');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const { server, PORT } = require('../server');

const { assert, expect } = chai;

const BASE_URL = `http://localhost:${PORT}`;

const tokenAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3NDA2MjQ5MywiZXhwIjoxNTc0NDA4MDkzfQ.2cG4uwUypJuCygHAl75knMDw8flO1eMWzErWWrOmRh4';
const tokenUnAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU3NDA2MjgwMSwiZXhwIjoxNTc0NDA4NDAxfQ.wAoNg6qcdN7HzMt_qINwUYVLf8BhnBtRIj9wJAlGNxs';
const hjson = 'application/json';

let authStub;

const before = () => {
  authStub = sinon.stub(server, 'isAuthenticated').callsFake((req, res, next) => next());
};

const afterEach = () => {
  nock.cleanAll();
  authStub.restore();
};


module.exports = {
  before,
  afterEach,
  chai,
  chaiHttp,
  faker,
  nock,
  server,
  sinon,
  sinonChai,
  PORT,
  assert,
  expect,
  BASE_URL,
  tokenAuth,
  tokenUnAuth,
  hjson,
};
