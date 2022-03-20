const express= require('express');
const router = express.Router()
const estateController =  require('../controllers/estateController')

router.post('/reg',estateController.reg_estate)
router.get('/',estateController.get_all_estates)
router.patch('/update/:id',estateController.update_estate)
router.delete('/delete/:id',estateController.delete_estate)


module.exports = router