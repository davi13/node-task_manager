const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');



const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     next();
// })

// app.use((req, res, next) => {

//     res.status(503).send('Site is curently daow. check back soon !');

// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
})




app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
//     console.log(token);
//     const data = jwt.verify(token, 'thisismynewcourse');
//     console.log(data);
// }
// myFunction();
// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async () => {
    // const task = await Task.findById('5d73eca69019e4070e0e6ccb');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);
//     const user = await User.findById('5d73eb03cab3f606e2be0fc4');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }



// main();

