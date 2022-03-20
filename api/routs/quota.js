const express= require('express');
const router = express.Router()
const quotaController =  require('../controllers/quotaController')


router.post('/buy',quotaController.buy_quota)
router.get('/',quotaController.get_all_quotas)
router.get('/:id',quotaController.get_quota_by_id)
router.patch('/update/:id',quotaController.update_quota)
router.delete('/delete/:id',quotaController.delete_quota)


module.exports=router