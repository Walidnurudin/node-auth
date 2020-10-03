const { Router } = require('express');
// const authController = require('../controllers/authController.js')

const router = Router();

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/smoothies', (req, res) => {
    res.render('smoothies')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;