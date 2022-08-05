const { Router } = require('express')
const taskController = require('../controllers/taskController');
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');




const router = Router();


router.post('/addTaskItem', checkUser, taskController.addTaskItem_post)
router.get('/tasks', checkUser, (req, res, next) => {
    res.render('tasks', { title: 'Tasks List', page_title: 'Tasks List', folder: 'Tasks' });
}, taskController.getTaskItems_get)



module.exports = router
