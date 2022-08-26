const express = require('express');
const { app } = require('firebase-admin');
const route = express.Router();
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');
const taskController = require('../controllers/taskController');

//apply our checkUser function to every route
route.get('*', checkUser)


route.get('/', requireAuth, checkUser, taskController.showTasksInDashboard)
route.get('/index', requireAuth, checkUser, taskController.showTasksInDashboard)

// Landing Page
route.get('/landing', (req, res, next) => {
    res.render('landing', { title: 'Landing', layout: false });
})


route.get('*', function(req, res){
    res.render('auth-404-basic', { title: '404 Error', layout: 'layout/layout-withoutNav' });
  });

module.exports = route;