const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        reuired: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
})

const User = mongoose.model('users', userSchema);
module.exports = User;