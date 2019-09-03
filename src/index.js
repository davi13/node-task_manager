const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send();
    }

    // user.save().then(() => {
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send();
    // })
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e)

    }
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(500).send(error)
    // });
});
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/task', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(error);
    }
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

app.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({}).then((task) => {
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send();
    // })
});


app.get('/task/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(error);
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send(error)
    // });
});



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});