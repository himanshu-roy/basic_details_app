const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const User = require('./models/user');
const userRouter = require('./routers/userRouter');
const url = 'mongodb://localhost:27017/fanBook';

const app = express();

mongoose.connect(url);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})