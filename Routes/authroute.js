const { Router } = require('express')
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', (req, res, next) => {
    res.render('signup', { title: 'Sign Up', layout: 'layout/layout-WithoutNav' });
}, authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Sign In', layout: 'layout/layout-WithoutNav' });
}, authController.login_get)
router.post('/login', authController.login_post)

module.exports = router