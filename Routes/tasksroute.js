const { Router } = require('express')
const taskController = require('../controllers/taskController');
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');
const leadController = require('../controllers/leadController')




const router = Router();


router.post('/addTaskItem',requireAuth,  checkUser, taskController.addTaskItem_post)
router.get('/tasks/:page', requireAuth, checkUser, taskController.getTaskItems_get)
router.delete('/deleteTaskItem', requireAuth, checkUser, taskController.deleteTaskItem_delete)
router.put('/editTaskItem', requireAuth, checkUser, taskController.editTaskItem_put)



module.exports = router
