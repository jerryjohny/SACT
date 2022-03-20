const express= require('express');
const router = express.Router();
//const upload = multer({dest:'uploads/'}); //???
const check_auth = require('../midlewere/check_auth');
const prodController= require('../controllers/prodController')

router.get('/',prodController.get_all_prod);

router.get('/:detId',prodController.get_prod_by_Id);

router.post('/',check_auth,prodController.reg_prod);

router.patch('/:detId',check_auth,prodController.update_prod)

router.delete('/:id',check_auth,prodController.delete_prod);


module.exports= router