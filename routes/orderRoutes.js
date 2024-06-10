const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getAllOrders);
router.get('/edit/:id', orderController.getOrderById);
router.post('/add-order', orderController.createOrder);
router.post('/update/:id', orderController.updateOrder);
router.post('/delete/:id', orderController.deleteOrder);

module.exports = router;
