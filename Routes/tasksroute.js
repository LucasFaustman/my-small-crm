const { Router } = require('express')
const taskController = require('../controllers/taskController');

const router = Router();

router.post('/addTaskItem', taskController.addTask_post)
