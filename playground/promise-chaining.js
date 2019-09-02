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
});

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age: 2 })
    return count;
}
updateAgeAndCount('5d683983189170c97af5a5b8', 1).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})

