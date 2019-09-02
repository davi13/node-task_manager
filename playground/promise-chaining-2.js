require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndRemove('5d6b5d4efdf531d70d7ff5ea', { completed: true }).then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})
