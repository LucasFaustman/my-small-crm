const { Router } = require('express')
const leadController = require('../controllers/leadController')
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');

const router = Router();

router.post('/addLead', checkUser, leadController.addLead_post)
router.get('/contacts', checkUser, leadController.getLeads_get)
router.get('/contact/:itemId', checkUser, leadController.getContactDetails_get)
router.put('/editLead', checkUser, leadController.editLead_put)
router.delete('/deleteLead', checkUser, leadController.deleteLead_delete)

module.exports = router
