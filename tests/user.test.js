const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Broly',
    email: 'davie1@xample.com',
    password: 'D123456',
    token: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});


test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Picollo',
        email: 'davie0@xample.com',
        password: 'D123456'
    }).expect(201);
});

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'mywrong@email.com',
        password: 'notTheRight'
    }).expect(400);
})
