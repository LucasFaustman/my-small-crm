const { Router } = require('express')
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');
const companyController = require('../controllers/companyController')


const router = Router();


router.post('/addCompany', checkUser, companyController.addCompany_post)
router.get('/companies', checkUser, companyController.getCompanies_get)
router.delete('/deleteCompany', checkUser, companyController.deleteCompany_delete)
router.put('/editCompany', checkUser, companyController.editCompany_put)




module.exports = router