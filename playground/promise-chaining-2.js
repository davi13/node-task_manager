require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5d6b5d4efdf531d70d7ff5ea', { completed: true }).then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count
}
deleteTaskAndCount('5d6ced6ccd0b9fdfda04ce5b').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})