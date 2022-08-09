const { Router } = require('express')
const leadController = require('../controllers/leadController')
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');

const router = Router();

router.post('/addLead', checkUser, leadController.addLead_post)
router.get('/leads', checkUser, leadController.getLeads_get)
router.delete('/deleteLead', checkUser, leadController.deleteLead_delete)

module.exports = router
