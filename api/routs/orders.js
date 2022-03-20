const express= require('express');
const router = express.Router();
const ordersController= require('../controllers/ordersController')



router.get('/',ordersController.get_all_orders);
router.get('/:id',ordersController.get_order_by_id);
router.post('/',ordersController.reg_order);
router.patch('/:detId',ordersController.update_order);
router.delete('/:IdPorDeletar',ordersController.delete_order);


module.exports= router;