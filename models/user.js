const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        reuired: [true, "Please enter an email"],
        unique: [true, "Email has been used"],
        lowercase: true,
        validate: [isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter an password"],
        minlength: [6, "Minimum length password is 6 characters"]
    }
});

// hooks/middleware
userSchema.pre('save', async function(next){
    // encripsi password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function(email, password){
    // mencari email
    const User = await this.findOne({email});
    if(User){
        // mencocokan/membandingkan password
        const Auth = await bcrypt.compare(password, User.password);

        if(Auth){
            return User;
        }

        throw Error('incorrect password!')
    }
    throw Error('incorrect email!')
}

const User = mongoose.model('users', userSchema);
module.exports = User;