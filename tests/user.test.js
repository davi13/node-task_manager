const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Picollo',
        email: 'davie0@xample.com',
        password: 'D123456'
    }).expect(201);
});
