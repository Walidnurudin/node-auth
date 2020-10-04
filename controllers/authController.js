const User = require('../models/user.js')
const jwt = require('jsonwebtoken');

// handle errors
const handleError = (err) => {
    console.log(err);
    let errors = { email: '', password: '' };

    // incorrect email
    if(err.message === "incorrect email!"){
        errors.email = 'that email is not registered';
    }

    // incorrect password
    if(err.message === 'incorrect password!'){
        errors.password = 'that password is incorrect';
    }

    return errors;
}

// create token
const createToken = (id) => {
    return jwt.sign({ id }, 'the ninjas');
}

const Home = (req, res) => {
    res.render('home')
}

const Register = (req, res) => {
    res.render('register')
}

const Login = (req, res) => {
    res.render('login')
}

const Logout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/");
}

const Smoothies = (req, res) => {
    res.render('smoothies')
}

const loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        // set cookie
        res.cookie('jwt', token, { httpOnly: true })
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors});
    }
}

const registerPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);

        // set cookie
        res.cookie('jwt', token, { httpOnly: true })
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    Home,
    Register,
    Login,
    Logout,
    Smoothies,
    loginPost,
    registerPost
}