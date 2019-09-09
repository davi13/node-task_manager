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

