const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);
test('Should creat task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'from my test'
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should show only the tasks sort by owner', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    task = await response.body
    expect(201);
    expect(task).not.toBeNull();
    expect(task).toEqual(response.body);

})