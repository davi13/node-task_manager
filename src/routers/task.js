const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.post('/task', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(error);
    }
});

router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});


router.get('/task/:id', async (req, res) => {
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
});

router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdtes = ['description', 'completed'];
    const isvalideOperation = updates.every((update) => allowedUpdtes.includes(update));
    if (!isvalideOperation) {
        return res.status(400).send({ error: 'Invalid Updates' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        if (!task) {
            res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e);
    }
});
module.exports = router;