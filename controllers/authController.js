const User = require('../models/user.js')

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

const loginPost = (req, res) => {
    const {email, password} = req.body;

    res.send('user login');
    console.log(email, password)
}

const registerPost = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password});
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send('error, user not created')
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