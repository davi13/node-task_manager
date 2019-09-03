const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
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

router.get('/users', async (req, res) => {
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

router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdtes = ['name', 'email', 'password', 'age'];
    const isvalideOperation = updates.every((update) => allowedUpdtes.includes(update));
    if (!isvalideOperation) {
        return res.status(400).send({ error: 'Invalid Updates' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);

    }
});

module.exports = router;