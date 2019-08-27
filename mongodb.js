//CRUD create read update delete
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const objectID = mongodb.objectID;
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Davi',
    //     age: 38
    // }, (error, result) => {
    //     if (error) {
    //         console.log('unable to insert user');
    //     }

    //     console.log(result.ops);
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert user');
    //     }
    //     console.log(result.ops);
    // })
    db.collection('task').insertMany([
        {
            description: 'wash the dish',
            completed: true

        }, {
            description: 'learn something new',
            completed: true
        }, {
            description: 'pay the bills',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('unable to insert user');
        }
        console.log(result.ops);
    })
})


