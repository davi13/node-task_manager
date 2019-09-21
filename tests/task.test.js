const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should creat task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'from my test'
        })
        .expect(201);

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false);
});

test('Should Not create task with invalid descrition / completed', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: null
        })
        .expect(400);
});

test('Should Not update task with invalid description / completed', async () => {
    const response = await request(app)
        .patch(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: null,
            completed: null
        })
        .expect(400);
})

test('Should not update other users task', async () => {
    const response = await request(app)
        .patch(`/task/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'my new task',
            completed: true
        })
        .expect(404);
});

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2);
    //const task = await response.body
    // expect(task).not.toBeNull();
    // expect(task.length).toEqual(2);

});

test('Should fetch tasks by Id', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not fetch tasks by Id if unauthenticated', async () => {
    const response = await request(app)
        .get('/tasks')
        .send()
        .expect(401)
});


test('Should not delete other users task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull()
});


test('Should delete task', async () => {
    const response = await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const tasks = await Task.findById(taskOne._id);
    expect(tasks).toBeNull();
})

test('Should not delete taks if unauthenticated', async () => {
    const response = await request(app)
        .patch(`/user${taskOne._id}`)
        .send()
        .expect(404)
})



// test('', async()=>{
//     const response = await request(app)
//     .delete('')
//     .send()
//     .expect()

// })

// test('', async()=>{
//     const response = await request(app)
//     .patch('')
//     .send()
//     .expect()

// })