const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    profession: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;