const express= require('express');
const router = express.Router();
const accountsController= require('../controllers/accountController')

router.post('/create',accountsController.create_account)
router.get('/',accountsController.get_all_accounts)
router.get('/:id',accountsController.get_account_by_id)
router.patch('/balance/:id',accountsController.update_balance)
router.delete('/delete/:id',accountsController.delete_account)
module.exports=router

