const { Router } = require('express')
const taskController = require('../controllers/taskController');
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');




const router = Router();


router.post('/addTaskItem', checkUser, taskController.addTaskItem_post)
router.get('/tasks', checkUser, taskController.getTaskItems_get)



module.exports = router
