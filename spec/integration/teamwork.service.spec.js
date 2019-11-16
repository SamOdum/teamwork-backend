const frisby = require('frisby');

const { Joi } = frisby;
const { PORT } = require('../../server');

// Do setup first
const jsonHeader = { 'content-type': 'application/json' };

frisby.globalSetup({
  request: {
    headers: {
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3MzY1MzI1OSwiZXhwIjoxNTczOTk4ODU5fQ.zfZbCeye4OHHHNF5plD-KkOgnnxwGqRCIWJ5Z2C1Lys',
      'Content-Type': 'application/json',
    },
  },
});

const BASE_URL = `http://localhost:${PORT}`;

describe('Teamwork REST API', () => {
  describe('POST auth/signin', () => {
    it('returns a status of 200 and a json response object', (done) => {
      frisby.post(`${BASE_URL}/api/v1/auth/sign-in`, {
        headers: jsonHeader,
        body: {
          email: 'jcardinal@gmail.com',
          password: 'jayjay',
        },
      })
        .expect('status', 200)
        .expect('json', 'status', 'success')
        .expect('json', 'status', 'data')
        .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
          token: Joi.string().required(),
          userId: Joi.string().required(),
        });
      done();
    });
  });

  describe('GET /feed', () => {
    it('should return status 200, and a json', (done) => {
      frisby
        .get(`${BASE_URL}/api/v1/feed`)
        .expect('status', 200)
        .expect('json', 'status', 'success')
        .expect('json', 'status', 'data')
        .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
          id: Joi.number().required(),
          createdOn: Joi.date().iso().required(),
          'article/url': Joi.string().uri().required(),
          title: Joi.string().required(),
          authorId: Joi.string().required(),
        });
      done();
    });
  });

  describe('GET /articles/<:articleId>', () => {
    it('should return status 200, and a json', (done) => {
      frisby
        .get(`${BASE_URL}/api/v1/articles/9`)
        .expect('status', 200)
        .expect('json', 'status', 'success')
        .expect('json', 'status', 'data')
        .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
          id: Joi.number().required(),
          createdOn: Joi.date().iso().required(),
          'article/url': Joi.string().uri().required(),
          title: Joi.string().required(),
          authorId: Joi.string().required(),
        });
      done();
    });
  });

  describe('GET /gifs/<:gifId>', () => {
    it('should return status 200, and a json', (done) => {
      frisby
        .get(`${BASE_URL}/api/v1/gifs/8`)
        .expect('status', 200)
        .expect('json', 'status', 'success')
        .expect('json', 'status', 'data')
        .expect('jsonTypes', '*', { // Assert *each* object in 'items' array
          id: Joi.string().required(),
          createdOn: Joi.date().required(),
          title: Joi.string().required(),
          url: Joi.string().required(),
        });
      done();
    });
  });

  // **   THE FOLLOWING TEST APPEARS TO CREATE A REAL USER
  // **   AND FAILS SUBSEQUENTLY BECAUSE THE USER NOW EXISTS
  // **   AND CANNOT BE RECREATED. I NEED TO FIGURE IT OUT
  // **
  describe('POST auth/create-user', () => {
    it('returns a status of 201 and a json response object', () => {
      frisby.post(`${BASE_URL}/api/v1/auth/create-user`, {
        headers: jsonHeader,
        body: {
          firstName: 'Ben',
          lastName: 'Bruce',
          email: 'b.bruce@yahoo.com',
          password: 'jbruce',
          gender: 'male',
          jobRole: 'driver',
          department: 'sales & marketing',
          address: '14 Maryland Street, Enugu',
          // role: 'Admin',
        },
      })
        .expect('status', 201)
        .expect('json', 'status', 'success')
        .expect('json', 'status', 'data')
        .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
          message: Joi.string().uri().required(),
          token: Joi.string().required(),
          userId: Joi.string().required(),
        });
    });
  });

  // describe('POST auth/create-user', () => {
  //   it('returns a status of 201 and a json response object', () => {
  //     frisby.post(`${BASE_URL}/api/v1/auth/create-user`, {
  //       headers: jsonHeader,
  //       body: {
  //         firstName: 'Joe',
  //         lastName: 'Cardinal',
  //         email: 'cinal@gmail.com',
  //         password: 'jayjay',
  //         gender: 'male',
  //         jobRole: 'Ceo',
  //         department: 'Administration',
  //         address: '142 Aba Road, Portharcourt',
  //         role: 'Admin',
  //       },
  //     })
  //       .expect('status', 201)
  //       .expect('json', 'status', 'success')
  //       .expect('json', 'status', 'data')
  //       .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
  //         message: Joi.string().uri().required(),
  //         token: Joi.string().required(),
  //         userId: Joi.string().required(),
  //       });
  //   });
  // });
});
