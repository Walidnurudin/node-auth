const { Router } = require('express');
const authController = require('../controllers/authController.js');
const {requireAuth} = require('../middleware/auth');

const router = Router();

router.get('/', authController.Home)
router.get('/smoothies', requireAuth, authController.Smoothies)
router.get('/register', authController.Register)
router.get('/login', authController.Login)
router.get('/logout', authController.Logout)

// API
router.post('/login', authController.loginPost);
router.post('/register', authController.registerPost);

module.exports = router;