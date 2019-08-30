const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});
const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
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
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,


    }
});
const task = new Task({
    description: 'tidy the house',
    completed: false,
    password: 'password'
})
task.save().then((task) => {
    console.log(task);
}).catch((error) => {
    console.log('Error ', error)
})