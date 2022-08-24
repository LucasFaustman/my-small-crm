const { Router } = require('express')
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');
const companyController = require('../controllers/companyController')


const router = Router();


router.post('/addCompany', checkUser,requireAuth,  companyController.addCompany_post)
router.get('/companies/:page/:sort', checkUser, requireAuth, companyController.getCompanies_get)
router.delete('/deleteCompany', checkUser, requireAuth, companyController.deleteCompany_delete)
router.put('/editCompany', checkUser,requireAuth,  companyController.editCompany_put)




module.exports = router