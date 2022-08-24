const { Router } = require('express')
const leadController = require('../controllers/leadController')
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');

const router = Router();

router.post('/addLead', checkUser, requireAuth, leadController.addLead_post)
router.get('/contacts/:page/:sort', checkUser, requireAuth, leadController.getLeads_get)
router.get('/contact/:itemId', checkUser, requireAuth, leadController.getContactDetails_get)
router.put('/editLead', checkUser, requireAuth, leadController.editLead_put)
router.delete('/deleteLead', checkUser, requireAuth, leadController.deleteLead_delete)

module.exports = router
