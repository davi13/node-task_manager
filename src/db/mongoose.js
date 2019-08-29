const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
});
const me = new User({
    name: 'Davi',
    age: -1
});
me.save().then(() => {
    console.log(me)

}).catch((error) => {
    console.log('Error ', error);
})
// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });
// const task = new Task({
//     description: 'throw the trash',
//     completed: false
// })
// task.save().then((task) => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Error ', error)
// })