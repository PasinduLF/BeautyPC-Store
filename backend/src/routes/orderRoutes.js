const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  [
    body('customer_name').notEmpty(),
    body('phone').notEmpty(),
    body('address').notEmpty(),
    body('city').notEmpty(),
    body('payment_method').notEmpty(),
  ],
  orderController.createOrder
);

router.get('/', authMiddleware, orderController.listOrders);
router.get('/dashboard/summary', authMiddleware, orderController.getDashboardSummary);
router.get('/:id', authMiddleware, orderController.getOrder);
router.patch('/:id/status', authMiddleware, orderController.updateStatus);

module.exports = router;

