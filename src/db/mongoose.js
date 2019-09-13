const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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
// 
// const task = new Task({
//     description: 'walk out the dog',
//     completed: false,
// })
// task.save().then((task) => {
//     console.log(task);
// }).catch((error) => {
//     console.log('this is the error  ', error)
// })