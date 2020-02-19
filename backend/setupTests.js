//----------------------------------
// Base file for unit test utilities
//----------------------------------

// Setting up the end-to-end request testing helper methods
const supertestRequest = require('supertest');
const mongoose = require('mongoose');
const app = require('./src/app.js');

// During the test the env variable must be set to test
if (process.env.NODE_ENV !== 'test') {
  console.error('Entered test files without being in the test environment, aborting!');
  process.exit(process.env.NODE_ENV);
}


// Occurs before all the tests, only once
beforeAll(async () => {
  await new Promise((resolve) => {
    mongoose.connection.once('open', () => {
      resolve();
    });
  });
});


afterAll(async () => {
  await (mongoose.connection.close());
});


const request = () => supertestRequest(app);
const agent = () => supertestRequest.agent(app);

global.request = request;
global.agent = agent;
