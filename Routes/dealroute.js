const { Router } = require('express')
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');
const dealController = require('../controllers/dealController')

const router = Router();

router.post('/addDeal', checkUser,requireAuth, dealController.addDeal_post)
router.get('/deals', checkUser, requireAuth, dealController.getDeals_get)
router.put('/editDealStage', checkUser, requireAuth, dealController.editDealStage_put)



module.exports = router