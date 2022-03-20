const express= require('express');
const router = express.Router();
const fundsController= require('../controllers/fundsController')

router.post('/create',fundsController.create_new_fund);


module.exports=router