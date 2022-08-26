const { Router } = require('express')
const authController = require('../controllers/authController');

const router = Router();


router.post('/signup', authController.signup_post)
router.get('/signup', (req, res, next) => {
    res.render('signup', { title: 'Sign Up', layout: '/layout/layout-withoutNav' });
}, authController.login_get)

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Sign In', layout: '/layout/layout-withoutNav' });
}, authController.login_get)

router.post('/login', authController.login_post)

router.get('/logout',  authController.logout_get)

module.exports = router
