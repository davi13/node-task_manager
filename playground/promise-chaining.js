require('../src/db/mongoose');
const User = require('../src/models/user');
//5d66e1a3d669fac5b203925d
User.findByIdAndUpdate('5d683983189170c97af5a5b8', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e)
})

