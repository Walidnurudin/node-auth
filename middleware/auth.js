const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jsonwebtoken exists & is verify
    if (token) {
        jwt.verify(token, 'the ninjas', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // check current user
    if (token) {
        jwt.verify(token, 'the ninjas', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

const conRender = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jsonwebtoken exists & is verify
    if (token) {
        jwt.verify(token, 'the ninjas', (err, decodedToken) => {
            if (err) {
                next();
            } else {
                res.redirect('/smoothies');
            }
        })
    } else {
        next();
    }
}

module.exports = { requireAuth, checkUser, conRender };