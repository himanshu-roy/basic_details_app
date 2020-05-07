const express = require('express');

const User = require('../models/user');

const userRouter = express.Router();

userRouter.route('/')
.get((req, res, next) => {
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
})
.post((req, res, next) => {
    User.create(req.body)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
})
.put((req, res, next) => {
    res.statusCode = 404;
    res.end('PUT request not supported');
})
.delete((req, res, next) => {
    User.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
});

userRouter.route('/:userId')
.get((req, res, next) => {
    User.findById(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
})
.post((req, res, next) => {
    res.statusCode = 404;
    res.end('POST request not supported');
})
.put((req, res, next) => {
    res.statusCode = 404;
    res.end('PUT request not supported');
})
.delete((req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        const err = new Error('You are not authorized!');
        err.status = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        next(err);
        return;
    }
    const info = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = info[0];
    const pass = info[1];
    if(username === 'admin' && pass === 'password') {
        User.findByIdAndRemove(req.params.userId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
    } else {
        const err = new Error('You are not authorized!');
        err.status = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        next(err);
        return;
    }
    
});

module.exports = userRouter;