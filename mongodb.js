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
    db.collection('task').updateMany({
        completed: true
    },
        {
            $set: {
                completed: false
            }
        }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5d657f3c5d19e8b945b26617')
    // }, {
    //         $inc: {
    //             age: 1
    //         }
    //     }).then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error);
    //     })

    /** 
     ----------------
     Find one in the task collection
     ---------------
    */
    // db.collection('task').findOne({ _id: new ObjectID('5d6589e37de9ffba1a2c7412') }, (error, task) => {
    //     if (error) {
    //         return console.log('unable to fetch task');
    //     }
    //     console.log('the last task -> ', task);
    // });
    /** 
     ----------------
     Find many in the task collection
     ---------------
    */
    // db.collection('task').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('unable to fetch task');
    //     }
    //     console.log('the all tasks not completed -> ', tasks);
    // })


    /** 
     ----------------
     Find many User collection
     ---------------
    */
    // db.collection('users').find({ age: 38 }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('unable to fetch user');
    //     }
    //     console.log(users);
    /** 
    ----------------
    Find one
    ---------------
   */

    // })
    // db.collection('users').findOne({ _id: new ObjectID('5d657f3c5d19e8b945b26617') }, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch user');
    //     }
    //     console.log(user);
    // })
    /** 
    ----------------
    Insert ONE
    ---------------
   */
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Tony',
    //     age: 38
    // }, (error, result) => {
    //     if (error) {
    //         console.log('unable to insert user');
    //     }

    //     console.log(result.ops);
    // })
    /** 
    ----------------
    Insert many
    ---------------
   */
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
    //  
})

