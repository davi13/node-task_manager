const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);
test('Should creat task for user', async () => {

})