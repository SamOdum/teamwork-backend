const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const dbQuery = require('../config/dbQuery');
const multer = require('../middleware/Multer');
const { server, PORT } = require('../server');
const { Auth, Helper } = require('../middleware/Auth');


const { assert, expect } = chai;

const BASE_URL = `http://localhost:${PORT}`;

const tokenAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3NDA2MjQ5MywiZXhwIjoxNTc0NDA4MDkzfQ.2cG4uwUypJuCygHAl75knMDw8flO1eMWzErWWrOmRh4';
const tokenUnAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU3NDA2MjgwMSwiZXhwIjoxNTc0NDA4NDAxfQ.wAoNg6qcdN7HzMt_qINwUYVLf8BhnBtRIj9wJAlGNxs';
const hjson = 'application/json';


module.exports = {
  assert,
  Auth,
  BASE_URL,
  chai,
  chaiHttp,
  expect,
  dbQuery,
  faker,
  Helper,
  multer,
  server,
  sinon,
  sinonChai,
  PORT,
  tokenAuth,
  tokenUnAuth,
  hjson,
};