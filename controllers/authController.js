const User = require('../models/user.js')
const jwt = require('jsonwebtoken');

// token
const createToken = (id) => {
    return jwt.sign({id}, 'the ninjas');
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

const Smoothies = (req, res) => {
    res.render('smoothies')
}

const loginPost = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({user})
    }catch(err){
        res.status(400).json(err)
    }
}

const registerPost = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);

        // set cookie
        res.cookie('jwt', token, {httpOnly: true})
        res.status(201).json({user});
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    Home,
    Register,
    Login,
    Smoothies,
    loginPost,
    registerPost
}