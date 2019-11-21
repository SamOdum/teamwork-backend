const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const dbQuery = require('../config/dbQuery');
const multer = require('../middleware/Multer');
const { server, PORT } = require('../server');
const { Auth, Helper } = require('../middleware/Auth');


const { assert, expect } = chai;

const BASE_URL = `http://localhost:${PORT}`;

const tokenAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3NDMyMTY2NiwiZXhwIjoxNTc0NjY3MjY2fQ.bDIxiQrT5npZ7sdfRYFTX44yM2VjrZEJvjWsvuz-OnE';
const tokenUnAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3NDMyNzI3NiwiZXhwIjoxNTc0NjcyODc2fQ.qZ1ogzAKI9ijogNKFX98TDYtkoBJ73Wd5__EGQRwbm8';
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
  fs,
  Helper,
  multer,
  server,
  sinon,
  sinonChai,
  path,
  PORT,
  tokenAuth,
  tokenUnAuth,
  hjson,
};
