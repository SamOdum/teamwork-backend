// const frisby = require('frisby');

// const { Joi } = frisby;
// const { PORT } = require('../../server');

// // Do setup first
// const jsonHeader = { 'content-type': 'application/json' };

// frisby.globalSetup({
//   request: {
//     headers: {
//       'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3MzkxMjc4OCwiZXhwIjoxNTc0MjU4Mzg4fQ.8YyR_ys9DY-1_EPisSv9SecX_elvZI97vPSs_aV1zhs',
//       'Content-Type': 'application/json',
//     },
//   },
// });

// const BASE_URL = `http://localhost:${PORT}`;

// describe('Teamwork REST API', () => {
//   // **   THE FOLLOWING TEST APPEARS TO CREATE A REAL USER
//   // **   AND FAILS SUBSEQUENTLY BECAUSE THE USER NOW EXISTS
//   // **   AND CANNOT BE RECREATED. I NEED TO FIGURE IT OUT
//   // **
//   describe('POST auth/create-user', () => {
//     it('returns a status of 201 and a json response object', () => {
//       frisby.post(`${BASE_URL}/api/v1/auth/create-user`, {
//         headers: jsonHeader,
//         body: {
//           firstName: 'Ben',
//           lastName: 'Bruce',
//           email: 'b.bruce@yahoo.com',
//           password: 'jbruce',
//           gender: 'male',
//           jobRole: 'driver',
//           department: 'sales & marketing',
//           address: '14 Maryland Street, Enugu',
//           // role: 'Admin',
//         },
//       })
//         .expect('status', 401)
//         .expect('json', 'status', 'success')
//         .expect('json', 'status', 'data')
//         .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
//           message: Joi.string().uri().required(),
//           token: Joi.string().required(),
//           userId: Joi.string().required(),
//         });
//     });
//   });

//   //   describe('POST auth/sign-in', () => {
//   //     it('returns a status of 200 and a json response object', () => {
//   //       frisby.post(`${BASE_URL}/api/v1/auth/sign-in`, {
//   //         headers: jsonHeader,
//   //         body: {
//   //           email: 'b.bruce@yahoo.com',
//   //           password: 'jbruce',
//   //         },
//   //       })
//   //         .expect('status', 200)
//   //         // .expect('json', 'status', 'success')
//   //         .expect('json', 'status', 'data')
//   //         .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
//   //           token: Joi.string().required(),
//   //           userId: Joi.string().required(),
//   //         });
//   //     });
//   //   });

//   //   describe('POST auth/sign-in', () => {
//   //     it('returns a status of 200 and a json response object', (done) => {
//   //       frisby.post(`${BASE_URL}/api/v1/auth/sign-in`, {
//   //         headers: jsonHeader,
//   //         body: {
//   //           email: 'jcardinal@gmail.com',
//   //           password: 'jayjay',
//   //         },
//   //       })
//   //         .expect('status', 200)
//   //         .expect('json', 'status', 'success')
//   //         .expect('json', 'status', 'data')
//   //         .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
//   //           token: Joi.string().required(),
//   //           userId: Joi.string().required(),
//   //         });
//   //       done();
//   //     });
//   //   });

//   //   describe('GET /feed', () => {
//   //     it('should return status 200, and a json', (done) => {
//   //       frisby
//   //         .get(`${BASE_URL}/api/v1/feed`)
//   //         .expect('status', 200)
//   //         .expect('json', 'status', 'success')
//   //         .expect('json', 'status', 'data')
//   //         .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
//   //           id: Joi.number().required(),
//   //           createdOn: Joi.date().iso().required(),
//   //           'article/url': Joi.string().uri().required(),
//   //           title: Joi.string().required(),
//   //           authorId: Joi.string().required(),
//   //         });
//   //       done();
//   //     });
//   //   });

//   //   describe('GET /articles/<:articleId>', () => {
//   //     it('should return status 200, and a json', (done) => {
//   //       frisby
//   //         .get(`${BASE_URL}/api/v1/articles/9`)
//   //         .expect('status', 200)
//   //         .expect('json', 'status', 'success')
//   //         .expect('json', 'status', 'data')
//   //         .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
//   //           id: Joi.number().required(),
//   //           createdOn: Joi.date().iso().required(),
//   //           'article/url': Joi.string().uri().required(),
//   //           title: Joi.string().required(),
//   //           authorId: Joi.string().required(),
//   //         });
//   //       done();
//   //     });
//   //   });

//   //   describe('GET /gifs/<:gifId>', () => {
//   //     it('should return status 200, and a json', (done) => {
//   //       frisby
//   //         .get(`${BASE_URL}/api/v1/gifs/8`)
//   //         .expect('status', 200)
//   //         .expect('json', 'status', 'success')
//   //         .expect('json', 'status', 'data')
//   //         .expect('jsonTypes', '*', { // Assert *each* object in 'items' array
//   //           id: Joi.string().required(),
//   //           createdOn: Joi.date().required(),
//   //           title: Joi.string().required(),
//   //           url: Joi.string().required(),
//   //         });
//   //       done();
//   //     });
//   //   });

//   // describe('POST /gifs', () => {
//   //   it('returns a status of 201 and a json response object', () => {
//   //     frisby.post(`${BASE_URL}/api/v1/articles`, {
//   //       headers: jsonHeader,
//   //       body: {
//   //         title: 'Test Article',
//   //         image: 'New article',
//   //       },
//   //     })
//   //       .expect('status', 201)
//   //       .expect('json', 'status', 'success')
//   //       .expect('json', 'status', 'data')
//   //       .expect('jsonTypes', 'data.*', { // Assert *each* object in 'items' array
//   //         message: Joi.string().uri().required(),
//   //         token: Joi.string().required(),
//   //         userId: Joi.string().required(),
//   //       });
//   //   });
//   // });
// });
