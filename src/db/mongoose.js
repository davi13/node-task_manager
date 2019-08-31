const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// const me = new User({
//     name: ' eli ',
//     email: 'eli@eli.com'
// });
// me.save().then(() => {
//     console.log(me)

// }).catch((error) => {
//     console.log('Error ', error);
// })
// Tasks 
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// });
// const task = new Task({
//     description: 'walk out the dog',
//     completed: false,
// })
// task.save().then((task) => {
//     console.log(task);
// }).catch((error) => {
//     console.log('this is the error  ', error)
// })