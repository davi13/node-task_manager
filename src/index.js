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
    }, fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a PDF'));
        }
        cb(undefined, true);
        // cb(new Error('file must be a PDF'));
        // cb(undefined, true);
        // cb(undefined, false);
    }
});



app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})




app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

