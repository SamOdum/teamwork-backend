// const request = require('request');
// const indexSpec = require('./index.spec');

// const { PORT } = require('../server');

// const BASE_URL = `http://localhost:${PORT}`;


// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3MzkxMjc4OCwiZXhwIjoxNTc0MjU4Mzg4fQ.8YyR_ys9DY-1_EPisSv9SecX_elvZI97vPSs_aV1zhs';
// const hjson = 'application/json';

// describe('POST /auth/signup', () => {
//   console.log(request);
//   // it('should return a 201 status when all required conditions are satisfied', (done) => {
//   //     request.post({
//   //         uri: `${baseUrl}/api/v1/auth/create-user`,
//   //         json: true,
//   //         body: noPassword
//   //     }, (error, response, body) => {
//   //         expect(response.statusCode).toEqual(201);
//   //         expect(body.error).toBe("Missing data field(s)");
//   //         done();
//   //     });
//   // });

//   it('should return a 400 status when password is not sent', (done) => {
//     request.post({
//       uri: `${BASE_URL}/api/v1/auth/create-user`,
//       headers: {
//         'x-auth-token': token,
//         'content-type': hjson,
//       },
//       body: {
//         firstName: 'Joe',
//         lastName: 'Cardinal',
//         email: 'j.cardinal@team.com',
//         password: 'jayjay',
//         gender: 'male',
//         jobRole: 'ceo',
//         department: 'administration',
//         address: '142 Aba Road, Portharcourt',
//         role: 'admin',
//       },
//     }, (error, response, body) => {
//       expect(response.statusCode).toEqual(400);
//       expect(body.error).toBe('Missing data field(s)');
//       done();
//     });
//   });
// });


// // describe('GET /, the base route of the server', () => {
// //   it('should return 200, and a json object', () => {
// //     frisby
// //       .get(BASE_URL)
// //       .expect('status', 200)
// //       .expect('json', 'status', 'success');
// //   });
// // });


// // describe('GET', () => {
// //   it('should return 200 response code', (done) => {
// //     request.get(BASE_URL, (error, response) => {
// //       expect(response.statusCode).toEqual(200);
// //       done();
// //     });
// //   });
// //   it('should return matching response body', (done) => {
// //     request.get(BASE_URL, (error, response) => {
// //       expect(response.body).toEqual('{"status":"success","data":{"info":"Server up and running smoothly"}}');
// //       done();
// //     });
// //   });
// // });

// // describe('POST /auth/create-user', () => {
// //   it('should return 200 response code and a json object', (done) => {
// //     spyOn();
// //     request.post(`${BASE_URL}/api/v1/auth/create-user`, (error, response) => {
// //       expect(response.statusCode).toEqual(200);
// //       done();
// //     });
// //   });
// //   it('should return matching response body', (done) => {
// //     request.get(BASE_URL, (error, response) => {
// //       expect(response.body).toEqual('{"status":"success","data":{"info":"Server up and running smoothly"}}');
// //       done();
// //     });
// //   });
// // });
