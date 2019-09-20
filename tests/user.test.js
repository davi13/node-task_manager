const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');


beforeEach(setupDatabase);

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Picollo',
        email: 'davie0@xample.com',
        password: 'D123456'
    }).expect(201);

    //Assert that database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Picollo',
            email: 'davie0@xample.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('D123456')
});

test('Should not signup with invalid name/email/password', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: null,
            email: null,
            password: null
        })
    expect(400);
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'mywrong@email.com',
        password: 'notTheRight'
    }).expect(400);
});



test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should no get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not get account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Should uplaod avatar images', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Davi'
        })
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Davi')
});

test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'my name'
        })
        .expect(401);
});

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            loaction: 'Nowhere'
        })
        .expect(400);
})