const express= require('express');
const router = express.Router();//para os métodos REST
const userController= require('../controllers/userController')

router.post('/signup',userController.signup);
router.post('/login',userController.login)
router.get('/',userController.get_all_users);
router.delete('/:phone',userController.delete_user);


module.exports= router