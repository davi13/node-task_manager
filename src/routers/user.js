const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
//Creation of user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});
//Logging in the user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
})
//Logging out the user
router.post('/users/logout', auth, async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send()
    } catch (e) {
        res.status(500).send(e);
    }
});
////Logging out alll the users
router.post('/users/logoutAll', auth, async (req, res, next) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e);
    }
})
//Profile user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

//Updateing User info in the user 
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdtes = ['name', 'email', 'password', 'age'];
    const isvalideOperation = updates.every((update) => allowedUpdtes.includes(update));
    if (!isvalideOperation) {
        return res.status(400).send({ error: 'Invalid Updates' });
    }

    try {
        req.user.update();
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e)
    }
});
//Ereasing user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);

    }
});
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only the the file its end with jpg, jpeg and png are accepted'))
        }
        cb(undefined, true)
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })

});

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.status(200).send();

    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-type', 'image/jpg');
        res.send(user.avatar);

    } catch (e) {
        res.status(400).send();
    }
})

module.exports = router;